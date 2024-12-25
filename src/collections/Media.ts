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
      required: false,
    },
    {
      name: 'status',
      type: 'checkbox',
      label: 'Finished Piece',
      required: false,
      defaultValue: false,
    }
  ],
  upload: true,
}
