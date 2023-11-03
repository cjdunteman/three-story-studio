"use client"

import { client } from "@/sanity/client-config";
import { PortableText } from "@portabletext/react";
import { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";

const builder = imageUrlBuilder(client);

export default function Post({ post }: { post: SanityDocument }) {
    return (
        <main className="container mx-auto prose prose-lg p-4">
            <h1>{post?.title}</h1>
            {post?.image ? (
                <Image
                    className="float-left m-0 w-1/3 mr-4 rounded-lg"
                    src={builder.image(post.image).width(300).height(300).url()}
                    width={300}
                    height={300}
                    alt={post?.image?.alt}
                />
            ) : null}
            {post?.body ? <PortableText value={post.body} /> : null}
        </main>
    );
}