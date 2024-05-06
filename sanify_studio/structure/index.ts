import type {StructureResolver} from 'sanity/structure'
import {UsersIcon, DocumentIcon} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('user').title('User').icon(UsersIcon),
      S.documentTypeListItem('post').title('Post').icon(DocumentIcon),
    ])
