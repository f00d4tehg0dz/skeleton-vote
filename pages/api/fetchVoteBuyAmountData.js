import { client } from '../../lib/sanity'

const fetchVoteBuyAmount = async (req, res) => {
  try {
    const query = `
    *[_type == "users" && _id == "${req.query.userID}" ] | order((walletAddress) asc) [0...1] {
      votes
  }
    `
    const sanityResponse = await client.fetch(query)

    res.status(200).send({ message: 'success', data: sanityResponse })
  } catch (error) {
    res.status(500).send({ message: 'error', data: error.message })
  }
}

export default fetchVoteBuyAmount
