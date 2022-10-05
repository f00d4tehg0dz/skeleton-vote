import { client } from '../../lib/sanity'

const saveVote = async (req, res) => {
  try {
    await client
      .patch(req.body._id).set({votes:req.body.votes}).commit()
    res.status(200).send({ message: 'success' })
  } catch (error) {
    res.status(500).send({ message: 'error', data: error.message })
  }
}

export default saveVote
