export const cardsSchema = {
  name: 'cards',
  type: 'document',
  title: 'cards',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'name',
    },
    {
      name: 'kind',
      type: 'string',
      title: 'kind',
    },
    {
      name: 'type',
      type: 'string',
      title: 'type',
    },
    {
      name: 'website',
      type: 'string',
      title: 'website',
    },
    {
      name: 'poster',
      type: 'image',
      title: 'image',
    },
    {
      name: 'image',
      type: 'string',
      title: 'imageSrc',
    },
    {
      name: 'id',
      type: 'string',
      title: 'id',
    },
    {
      name: 'blockchain',
      type: 'string',
      title: 'blockchain',
    },
    {
      name: 'likes',
      type: 'array',
      title: 'Likes',
      of: [{ type: 'reference', to: { type: 'users' } }],
    },
    {
      name: 'dislikes',
      type: 'array',
      title: 'dislikes',
      of: [{ type: 'reference', to: { type: 'users' } }],
    },
  ],
}
