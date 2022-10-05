import { client } from '../../lib/sanity'

const saveDislike = async (req, res) => {
  try {

    await client
      .patch(req.body.dislikedCards._id)
      .setIfMissing({'dislikes': []})
      .insert('after', 'dislikes[-1]',[
        {
          _ref: req.body.currentUser,
          _type: "reference",
        },
      ])
      .commit({
        autoGenerateArrayKeys: true,
      })

    res.status(200).send({ message: 'success' })
  } catch (error) {
    res.status(500).send({ message: 'error', data: error.message })
  }

}

export default saveDislike
