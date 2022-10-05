import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: process.env.SANITY_API_PROJECT_ID,
  dataset: 'production',
  apiVersion: 'v1',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})
