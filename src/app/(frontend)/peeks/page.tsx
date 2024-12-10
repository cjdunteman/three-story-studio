import configPromise from '@payload-config'
import { getPayload } from "payload"
import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
    const payload = await getPayload({ config: configPromise })

    const images = await payload.find({
        collection: 'media',
    })

    console.log(images.docs[0])

    return (
        <>
            <div className="container mx-auto columns-1 sm:columns-2 lg:columns-4 gap-8 max-w-6xl px-10 mb-12">
                {images.docs.map(({id, url, alt})=> (
                        <div key={id} className="mb-4 break-inside-avoid">
                            <Link href="#">
                                <Image src={url!} alt={alt} height={300} width={300} className="w-full object-cover" />
                            </Link>
                        </div>
                ))}
            </div>
        </>
    )
}