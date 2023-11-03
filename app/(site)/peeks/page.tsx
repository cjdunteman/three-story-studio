import Image from "next/image"
import { Dancing_Script } from 'next/font/google'
import { SanityDocument } from "@sanity/client";
import { sanityFetch } from "@/sanity/lib/sanity.fetch";
import { galleryQuery } from "@/sanity/lib/queries";
import Gallery from "@/components/Gallery";

const dancing_script = Dancing_Script({
    subsets: ['latin'],
    variable: '--font-dancing-script'
})

export default async function Peeks() {
    const gallery = await sanityFetch<SanityDocument[]>({ query: galleryQuery })
    console.log(await gallery)

    return (
        <div className="container mx-auto max-w-6xl flex-col">
            <div className="flex flex-col items-center">
                <div className="grid-cols-3"></div>
                <Gallery gallery={gallery} />
            </div>
        </div>
    )
}