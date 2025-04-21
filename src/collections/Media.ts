import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: false,
      required: false,
    },
    {
      name: 'homePage',
      type: 'checkbox',
      label: 'Home Page Slideshow',
      required: false,
      defaultValue: false,
    },
    {
      name: 'finishedPiece',
      type: 'checkbox',
      label: 'Finished Piece',
      required: false,
      defaultValue: false,
    }
  ],
  upload: true,
}
