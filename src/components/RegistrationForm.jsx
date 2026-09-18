import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from './icons.jsx'
import { Visa, Mastercard, PayPal, GooglePay, BankTransfer } from './PayLogos.jsx'
import PhoneNumberInput from './PhoneNumberInput.jsx'
import { countries } from '../data/countries.js'
import { submitLead } from '../lib/submitLead.js'
import { navigateTo } from '../lib/navigate.js'

// Validation rules, kept identical to the reference site
const nameRe = /^(?!.*(?:tg|telegram|traffic|bot))[^@\d]{2,20}$/i
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const fields = {
  first_name: { label: 'First Name', type: 'text', placeholder: 'Enter First Name', autocomplete: 'given-name', error: 'Please enter a valid first name.' },
  last_name: { label: 'Last Name', type: 'text', placeholder: 'Enter Last Name', autocomplete: 'family-name', error: 'Please enter a valid last name.' },
  email: { label: 'Email', type: 'email', placeholder: 'Enter your Email', autocomplete: 'email', error: 'Please enter a valid email address.' },
  phone: { label: 'Phone', type: 'tel', placeholder: 'Enter your Phone Number', autocomplete: 'tel', error: 'Please enter a valid phone number.' },
}

const payMethods = [
  { name: 'VISA', Icon: Visa },
  { name: 'Mastercard', Icon: Mastercard },
  { name: 'PayPal', Icon: PayPal },
  { name: 'Google Pay', Icon: GooglePay },
  { name: 'Bank Transfer', Icon: BankTransfer },
]

// Example phone number per country code, used as the phone field placeholder
// so the hint always matches the selected country's local number format.
const phoneExamples = {
  US: '555 123 4567', CA: '416 555 0123', GB: '7700 900123', AU: '0412 345 678',
  NZ: '021 234 5678', IN: '98765 43210', PK: '300 1234567', AE: '50 123 4567',
  DE: '1512 3456789', FR: '06 12 34 56 78', IT: '312 345 6789', ES: '612 345 678',
  NL: '06 12345678', SE: '70 123 45 67', CH: '79 123 45 67', ZA: '82 123 4567',
  SG: '8123 4567', MY: '12 345 6789', PH: '917 123 4567', ID: '812 3456 7890',
  TH: '81 234 5678', JP: '90 1234 5678', KR: '10 1234 5678', CN: '138 0013 8000',
  BR: '11 91234 5678', MX: '55 1234 5678', AR: '11 2345 6789', CO: '300 123 4567',
  EG: '100 123 4567', SA: '50 123 4567', TR: '532 123 4567', RU: '912 345 67 89',
  UA: '50 123 4567', PL: '512 345 678', IE: '85 123 4567', PT: '912 345 678',
  GR: '691 234 5678', AT: '664 123 4567', BE: '470 12 34 56', DK: '20 12 34 56',
  NO: '912 34 567', FI: '40 123 4567', HK: '5123 4567', TW: '912 345 678',
  VN: '91 234 5678', NG: '803 123 4567',
}

export default function RegistrationForm() {
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState({ kind: '', text: '' })
  const [processing, setProcessing] = useState(false)
  const [country, setCountry] = useState('AU')
  const [phone, setPhone] = useState('')
  const dial = countries.find((c) => c[0] === country)?.[2] ?? 61
  const phonePlaceholder = phoneExamples[country] || '512 345 678'
  const formRef = useRef(null)

  // Auto-detect the visitor's country from their IP and preselect the
  // matching dial code (e.g. a Pakistan IP selects +92). Tries a primary
  // source then a fallback; defaults to Australia if both fail.
  useEffect(() => {
    let cancelled = false
    const apply = (code) => {
      if (cancelled) return
      const c = String(code || '').toUpperCase()
      if (countries.some((x) => x[0] === c)) setCountry(c)
    }
    const trySource = (url, read) =>
      fetch(url)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (!d) throw new Error('empty')
          const code = read(d)
          if (code) apply(code)
          else throw new Error('no country')
        })

    trySource('https://ipapi.co/json/', (d) => d.country_code || d.country).catch(() =>
      trySource('https://ipinfo.io/json', (d) => d.country).catch(() => {}),
    )

    return () => { cancelled = true }
  }, [])

  const isValid = (field, value) => {
    const v = value.trim()
    if (!v) return false
    if (field.type === 'email') return emailRe.test(v)
    if (field.type === 'tel') return v.replace(/[^0-9+]/g, '').length >= 8
    return nameRe.test(v)
  }

  const clearError = (name) => {
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const handleBlur = (e) => {
    const field = fields[e.target.name]
    if (field && e.target.value.trim() && !isValid(field, e.target.value)) {
      setErrors((prev) => ({ ...prev, [e.target.name]: true }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const nextErrors = {}
    for (const [name, field] of Object.entries(fields)) {
      if (!isValid(field, data.get(name) ?? '')) nextErrors[name] = true
    }
    setErrors(nextErrors)
    setMessage({ kind: '', text: '' })
    if (Object.keys(nextErrors).length) return
    setProcessing(true)
    try {
      // Send the full international number (E.164), e.g. +61 + 0412 345 678 -> 61412345678.
      // Drop the local trunk prefix "0" first, otherwise 61 gets prepended to
      // "0412…" producing an invalid "610412345678".
      let digits = phone.replace(/[^\d]/g, '')
      if (digits.startsWith('0')) digits = digits.slice(1)
      const fullPhone = digits.startsWith(String(dial)) ? digits : `${dial}${digits}`
      const res = await submitLead({
        firstName: String(data.get('first_name') ?? '').trim(),
        lastName: String(data.get('last_name') ?? '').trim(),
        email: String(data.get('email') ?? '').trim(),
        phone: fullPhone,
      })
      if (res?.status === 'success') {
        navigateTo('/thank-you')
      } else {
        setMessage({ kind: 'err', text: res?.message || 'Something went wrong. Please try again.' })
      }
    } catch {
      setMessage({ kind: 'err', text: 'Something went wrong. Please try again.' })
    } finally {
      setProcessing(false)
    }
  }

  const renderField = (name) => {
    const f = fields[name]
    return (
      <div key={name} className={`field ${errors[name] ? 'error' : ''}`}>
        <label htmlFor={name}>{f.label}</label>
        <input
          className={`input ${errors[name] ? 'invalid' : ''}`}
          type={f.type}
          id={name}
          name={name}
          placeholder={f.placeholder}
          autoComplete={f.autocomplete}
          onInput={(e) => clearError(e.target.name)}
          onBlur={handleBlur}
          required
        />
        <p className="error-msg">{f.error}</p>
      </div>
    )
  }

  return (
    <form id="regForm" ref={formRef} onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="id" value="m1" />
      <input type="hidden" name="country" value={country} />
      <input type="hidden" name="phone_code" value={dial} />
      <input type="hidden" name="subid" value="" />
      <input type="hidden" name="language" value="en" />

      <div className="field-row">
        {renderField('first_name')}
        {renderField('last_name')}
      </div>

      {renderField('email')}

      <div className={`field ${errors.phone ? 'error' : ''}`}>
        <label htmlFor="phone">Phone</label>
        <PhoneNumberInput
          country={country}
          onCountryChange={setCountry}
          value={phone}
          onValueChange={(v) => {
            setPhone(v)
            clearError('phone')
          }}
          onBlur={handleBlur}
          invalid={errors.phone}
          placeholder={phonePlaceholder}
          id="phone"
          name="phone"
          autoComplete="tel"
        />
        <p className="error-msg">{fields.phone.error}</p>
      </div>

      <button className="btn btn-primary btn-block" type="submit" disabled={processing}>
        {processing ? 'Processing…' : 'Sign Up Now'}
        {!processing && <ArrowRight />}
      </button>
      {message.kind && <div className={`form-message ${message.kind}`}>{message.text}</div>}

      <p className="legal">
        By entering your personal information and clicking the button, you accept the{' '}
        <a href="/privacy">Privacy Policy</a> and{' '}
        <a href="/terms">Terms of Use</a> of the website.
      </p>

      <div className="pay-row" aria-label="Accepted payment methods">
        {payMethods.map(({ name, Icon }) => (
          <span className="pay" key={name} title={name}>
            <Icon />
          </span>
        ))}
      </div>
    </form>
  )
}
