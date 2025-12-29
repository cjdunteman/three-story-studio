import configPromise from '@payload-config'
import { getPayload } from "payload"
import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
    const payload = await getPayload({ config: configPromise })

    const images = await payload.find({
        collection: 'media',
        where: {
          finishedPiece: {
            equals: 'true'
          }
        },
        depth: 1, // This will populate the project relationship
        limit: 0,
    })

    return (
        <>
            <div className="container mx-auto columns-1 sm:columns-2 lg:columns-4 gap-8 max-w-6xl px-10 mb-12">
                {images.docs.map(({id, url, alt, project, width: originalWidth, height: originalHeight})=> (
                    <div 
                        key={id} 
                        className="mb-4 break-inside-avoid group relative"
                        style={{ 
                            aspectRatio: originalWidth && originalHeight ? `${originalWidth}/${originalHeight}` : 'auto' 
                        }} // Preserve aspect ratio to prevent shifts
                    >
                        {project && typeof project !== 'number' ? (
                            <Link href={`/projects/${project.id}`} className="block relative h-full">
                                <Image 
                                    src={url!} 
                                    alt={alt} 
                                    fill={true}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover" 
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black px-4 py-2 rounded-md font-medium">
                                        View More
                                    </button>
                                </div>
                            </Link>
                        ) : (
                            <Image 
                                src={url!} 
                                alt={alt} 
                                fill={true}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover" 
                            />
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}