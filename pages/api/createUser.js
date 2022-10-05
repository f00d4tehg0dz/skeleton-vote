import { client } from '../../lib/sanity'
const crypto = require('crypto');

const createUserOnSanity = async (req, res) => {
  try {
    const userDoc = {
      _type: 'users',
      _id: req.body._id,
      name: req.body.name,
      walletAddress: req.body.userWalletAddress,
      votes: req.body.votes,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
    }

    await client.createIfNotExists(userDoc)

    res.status(200).send({ message: 'success' })
  } catch (error) {
    res.status(500).send({ message: 'error', data: error.message })
  }
}

export default createUserOnSanity
