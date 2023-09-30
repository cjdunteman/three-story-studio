const gallery = {
    name: "gallery",
    title: "Gallery",
    type: "document",
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: "gallery",
            title: "Gallery",
            type: "array",
            of: [
                {
                    name: 'image',
                    title: 'Image',
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                    fields: [
                        {
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                        },
                    ],
                }
            ]
        }
    ]
}

export default gallery;