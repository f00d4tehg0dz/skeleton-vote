import { client } from '../../lib/sanity'

const getCardsInfo = async (req, res) => {
  try {
    console.log("Get Cards Info")
    // fetch users that have liked them
    //*[_type == "users" && walletAddress != "${req.query.activeAccount}"]] | order((walletAddress) asc) {
    const query = `
      *[_type == "cards" && likes[ _type == "reference" && _ref != "${req.query.userID}"] && dislikes[ _type == "reference" && _ref != "${req.query.userID}" ]] | order((_id) asc) [0...1] {
          _id,
          name,
          likes[ _type == "reference"],
          dislikes[ _type == "reference"],
          "imageUrl": poster.asset->url
      }
    `
  //   const query = `
  //   *[_type == "users" && walletAddress != "${req.query.activeAccount}"]{
  //       _id,
  //       name,
  //       walletAddress,
  //       likes[ _type == "reference"],
  //       dislikes[ _type == "reference" ],
  //       "imageUrl": poster.asset->url
  //     }
  // `
    const sanityResponse = await client.fetch(query)
    // console.log(sanityResponse)
    res.status(200).send({ message: 'success', data: sanityResponse })
  } catch (error) {
    res.status(500).send({ message: 'error', data: error.message })
  }
}

export default getCardsInfo
