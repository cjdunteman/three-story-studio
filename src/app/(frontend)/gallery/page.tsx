import configPromise from '@payload-config'
import { getPayload } from "payload"
import Image from 'next/image'
import Link from 'next/link'
import { Project } from '@/payload-types'

export default async function Page() {
    const payload = await getPayload({ config: configPromise })

    const images = await payload.find({
        collection: 'media',
        where: {
          finishedPiece: {
            equals: 'true'
          }
        },
        depth: 1 // This will populate the project relationship
    })

    return (
        <>
            <div className="container mx-auto columns-1 sm:columns-2 lg:columns-4 gap-8 max-w-6xl px-10 mb-12">
                {images.docs.map(({id, url, alt, project})=> (
                        <div key={id} className="mb-4 break-inside-avoid">
                            {project && typeof project !== 'number' ? (
                                <Link href={`/projects/${project.id}`}>
                                    <Image src={url!} alt={alt} height={300} width={300} className="w-full object-cover" />
                                </Link>
                            ) : (
                                <Image src={url!} alt={alt} height={300} width={300} className="w-full object-cover" />
                            )}
                        </div>
                ))}
            </div>
        </>
    )
}