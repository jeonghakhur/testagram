import styled from 'styled-components'

const Media = styled.span<{background: string}>`
  display: block;
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url(${props.background})`};
  background-size: cover;
  background-position: center;
`

export const user = {
  name: 'user',
  type: 'document',
  fields: [
    {
      name: 'username',
      type: 'string',
    },
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'email',
      type: 'string',
    },
    {
      name: 'image',
      type: 'string',
    },
    {
      name: 'following',
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
      name: 'followers',
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
      name: 'bookmarks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'post'}],
        },
      ],
      validation: (Rule: any) => Rule.unique(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'username',
      media: 'image',
    },
    prepare({title, subtitle, media}: any) {
      console.log(media)
      return {
        title: title,
        subtitle: subtitle,
        media: <Media background={media}></Media>,
      }
    },
  },
}
