import { client } from '../../lib/sanity'

const getCardsInfo = async (req, res) => {
  try {
    const query = `
    *[_type == "users" && _id != "${req.query.userID}" && walletAddress != "${req.query.activeAccount}" && likes[ _type == "reference" && _ref != "${req.query.userID}"] && dislikes[ _type == "reference" && _ref != "${req.query.userID}" ]] | order((walletAddress) asc) [0...10] {
      _id,
      name,
      walletAddress,
      votes,
      likes[ _type == "reference"],
      dislikes[ _type == "reference"],
      "imageUrl": poster.asset->url
  }
    `

    const sanityResponse = await client.fetch(query)

    res.status(200).send({ message: 'success', data: sanityResponse[0] })
  } catch (error) {
    res.status(500).send({ message: 'error', data: error.message })
  }
}

export default getCardsInfo
