export const userSchema = {
  name: 'users',
  type: 'document',
  title: 'users',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'walletAddress',
      type: 'string',
      title: 'Wallet Address',
    },
    {
      name: 'votes',
      type: 'number',
      title: 'Votes',
    },
    {
      name: 'poster',
      type: 'image',
      title: 'image',
    },
    {
      name: 'likes',
      type: 'array',
      title: 'Likes',
      of: [{ type: 'reference', to: { type: 'cards' } }],
    },
    {
      name: 'dislikes',
      type: 'array',
      title: 'Dislikes',
      of: [{ type: 'reference', to: { type: 'cards' } }],
    },
  ],
}
