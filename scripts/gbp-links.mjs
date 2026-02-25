const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.drislamelhelou.com'
const campaign = process.env.NEXT_PUBLIC_GBP_UTM_CAMPAIGN || 'gbp'

function withUtm(path, content) {
  const url = new URL(path, baseUrl)
  url.searchParams.set('utm_source', 'google')
  url.searchParams.set('utm_medium', 'organic')
  url.searchParams.set('utm_campaign', campaign)
  if (content) url.searchParams.set('utm_content', content)
  return url.toString()
}

const website = withUtm('/en', 'website')
const appointment = withUtm('/en/contact', 'appointment')

console.log('Google Business Profile links:')
console.log(`Website: ${website}`)
console.log(`Appointment: ${appointment}`)
