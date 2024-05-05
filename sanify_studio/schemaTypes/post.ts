export const post = {
  title: 'Post',
  name: 'post',
  type: 'document',
  fields: [
    {
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      name: 'photo',
      type: 'image',
    },
    {
      name: 'likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
      validation: (Rule: any) => Rule.unique(),
    },
    {
      name: 'comments',
      type: 'array',
      of: [
        {
          name: 'comment',
          type: 'document',
          fields: [
            {
              name: 'author',
              type: 'reference',
              to: [{type: 'user'}],
            },
            {
              name: 'comment',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'comments.0.comment',
      authorName: 'author.name',
      authorUsername: 'author.username',
      media: 'photo',
    },
    prepare(selection: any) {
      const {title, authorName, authorUsername, media} = selection
      return {
        title,
        subtitle: `by ${authorName} (${authorUsername})`,
        media,
      }
    },
  },
}
