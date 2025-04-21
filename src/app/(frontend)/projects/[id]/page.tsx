import configPromise from '@payload-config'
import { getPayload } from "payload"
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function ProjectPage({ params }: Props) {
    const { id } = await params
    const payload = await getPayload({ config: configPromise })

    const project = await payload.findByID({
        collection: 'projects',
        id,
        depth: 1, // This will populate the media relationship
    })

    if (!project) {
        notFound()
    }

    return (
        <div className="container mx-auto max-w-6xl px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">{project.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {project.media && Array.isArray(project.media) && project.media.map((mediaItem) => {
                    // Handle both number and Media object types
                    const media = typeof mediaItem === 'number' ? null : mediaItem
                    if (!media) return null

                    return (
                        <div key={media.id} className="break-inside-avoid">
                            <Image 
                                src={media.url!} 
                                alt={media.alt} 
                                height={300} 
                                width={300} 
                                className="w-full object-cover"
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
} 