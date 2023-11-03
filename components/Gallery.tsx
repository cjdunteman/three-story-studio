import { SanityDocument } from "@sanity/client";
import Image from "next/image"

export default function Gallery({ gallery = [] }: { gallery: SanityDocument[] }) {

    return (
        <div>
            {gallery.map((galImage) => (
                <Image
                    src={galImage.url}
                    alt=""
                />
            ))}
        </div>
    )
}