const post = {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' },
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            hotspot: 'true',
        },
        {
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        }
    ]
}