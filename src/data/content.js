// =========================================================
// Central content file, edit all copy in one place
// =========================================================

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Reviews', href: '/memorifund-ai-platform-review-australia-scam' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export const hero = {
  eyebrow: 'Chosen by traders',
  title: 'Trade With Confidence,',
  titleMark: 'Even If You’re Just Starting',
  lead: 'Get clear market signals, simple explanations and full control over your money. Memorifund Ai Platform helps you trade with a plan, not a guess.',
  checks: [
    'Crypto, forex, stocks and gold in one account',
    'Every signal comes with a simple "why"',
    'Use it on your phone or computer',
    'Set your own risk limits',
  ],
  stats: [
    { value: '4M+', label: 'Verified users' },
    { value: '4.8★', label: 'Community score' },
    { value: '$500M+', label: 'Client deposits' },
  ],
}

export const steps = [
  {
    no: 'STEP 1',
    icon: 'user',
    title: 'Sign up',
    text: 'Enter your name, email and phone number.',
    cta: 'Get Started Now',
  },
  {
    no: 'STEP 2',
    icon: 'shield',
    title: 'Verify',
    text: 'Upload your ID so your account stays protected.',
    cta: 'Get Started Now',
  },
  {
    no: 'STEP 3',
    icon: 'wallet',
    title: 'Deposit',
    text: 'Add money using a payment method you like.',
    cta: 'Get Started Now',
    green: true,
  },
  {
    no: 'STEP 4',
    icon: 'chart',
    title: 'Start trading',
    text: 'Choose your markets, set your limits and check your first signals.',
    cta: 'Get Started Now',
  },
]

// The brief puts the security points in their own section, so the strip that
// used to sit under the onboarding steps is empty.
export const trustStrip = []

// Brief section 5, Markets.
export const markets = [
  { k: 'Crypto', v: 'Trade popular coins like Bitcoin and Ethereum.' },
  { k: 'Forex', v: 'Trade world currencies like USD, EUR and GBP.' },
  { k: 'Stocks', v: 'Follow big companies from around the world.' },
  { k: 'Commodities', v: 'Trade gold, silver and oil.' },
]

// Brief section 7, Who It's For.
export const whoItsFor = [
  { k: 'First-time traders', v: 'Start with easy steps and plain explanations.' },
  { k: 'Working people', v: 'Check the market in a few minutes a day.' },
  { k: 'Experienced traders', v: 'Get extra signals and cover more markets.' },
]

// Brief section 8, Security and Transparency.
export const security = [
  { k: 'Strong encryption', v: 'Your personal details are locked and protected.' },
  { k: 'Two-step login', v: 'Only you can get into your account.' },
  { k: 'Clear fees', v: 'Every cost is shown upfront. No surprises.' },
  { k: 'Full control', v: 'No trade happens without your approval.' },
]

export const securityNotice = 'Trading has risk. You may lose money. No one can promise profits.'

export const features = [
  {
    icon: 'bot', title: 'Easy to understand',
    text: 'No hard words. We explain every idea like a friend would.',
  },
  {
    icon: 'clock', title: 'Saves your time',
    text: 'We study the charts, so you don\'t have to spend hours.',
  },
  {
    icon: 'zap', title: 'Fast alerts', green: true,
    text: 'Know about big price moves the moment they happen.',
  },
  {
    icon: 'shield', title: 'Real help',
    text: 'Our support team answers your questions by chat and email.',
  },
]

export const precision = [
  {
    icon: 'gauge', title: 'Clear signals',
    text: 'Know what to watch and why it matters.',
  },
  {
    icon: 'lock', title: 'Stop-loss and take-profit',
    text: 'Set where to exit before you enter a trade.',
  },
  {
    icon: 'zap', title: 'Price alerts', green: true,
    text: 'Get a ping when a price hits your target.',
  },
  {
    icon: 'chart', title: 'Easy dashboard',
    text: 'See your balance, trades and results at a glance.',
  },
  {
    icon: 'user', title: 'Works everywhere',
    text: 'Trade from your phone, tablet or laptop.',
  },
]

// The brief says to keep this section hidden until there are three real
// reviews to show. Nothing invented ships in its place, so the list is empty
// and <Testimonials/> renders nothing until real reviews are added here.
export const testimonials = {
  eyebrow: 'Community',
  title: 'Reviews From ',
  titleMark: 'Our Community',
  lead: 'Real experiences, straight from verified users.',
  items: [],
  summary: [],
}

export const faqPage = [
  {
    q: 'What does Memorifund Ai Platform do?',
    a: 'We study the markets and send you clear trade signals. You decide what to do with them.',
  },
  {
    q: 'Do I need trading experience?',
    a: 'No. Every signal is explained in simple words.',
  },
  {
    q: 'Does Memorifund Ai Platform trade for me?',
    a: 'No. You stay in control of every trade.',
  },
  {
    q: 'What can I trade?',
    a: 'Crypto, forex, stocks and commodities.',
  },
  {
    q: 'Is there an app to download?',
    a: 'No download needed. It works in your browser.',
  },
  {
    q: 'What is the minimum deposit?',
    a: 'You can start with [Amount].',
  },
  {
    q: 'How long do withdrawals take?',
    a: '[Add your withdrawal time here.]',
  },
  {
    q: 'Can I lose money?',
    a: 'Yes. All trading carries risk. Only trade money you can afford to lose.',
  },
]

export const faq = [
  {
    q: 'What does Memorifund Ai Platform do?',
    a: 'We study the markets and send you clear trade signals. You decide what to do with them.',
  },
  {
    q: 'Do I need trading experience?',
    a: 'No. Every signal is explained in simple words.',
  },
  {
    q: 'Does Memorifund Ai Platform trade for me?',
    a: 'No. You stay in control of every trade.',
  },
  {
    q: 'What can I trade?',
    a: 'Crypto, forex, stocks and commodities.',
  },
  {
    q: 'Is there an app to download?',
    a: 'No download needed. It works in your browser.',
  },
  {
    q: 'What is the minimum deposit?',
    a: 'You can start with [Amount].',
  },
  {
    q: 'How long do withdrawals take?',
    a: '[Add your withdrawal time here.]',
  },
  {
    q: 'Can I lose money?',
    a: 'Yes. All trading carries risk. Only trade money you can afford to lose.',
  },
]

// Markets (doc section 5) and Who It's For (doc section 7), which both fit the
// key/value shape of this table.
export const footer = {
  blurb: 'Memorifund Ai Platform is an AI-driven automated trading platform, automated strategies, live market insight, and dependable security all in one place.',
  company: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { label: 'Term Of Use', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Risk Disclosure', href: '/disclosure' },
    { label: 'Sign Up', href: '/', scroll: '#register' },
  ],
  disclaimer:
    'HIGH RISK WARNING: Trading FX, CFDs, cryptocurrencies, and other financial instruments is highly speculative, carries significant risk, and may not suit all investors. You could lose some or all of your invested capital, so never speculate with money you cannot afford to lose. All profit examples shown on this website are illustrative only and do not guarantee similar results. Memorifund Ai Platform operates as a technology services company, does not provide financial, investment, or legal advice, and accepts no liability for loss or damage arising from reliance on the information contained on this website. Laws governing financial activities differ around the world, and it is your sole responsibility to make sure your use of this website complies with the laws and regulations of your jurisdiction of residence.',
}
