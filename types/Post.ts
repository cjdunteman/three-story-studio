import { Image, PortableTextBlock } from "sanity";

export type Post = {
    _id: string;
    title: string;
    slug: string;
    _publishedAt: Date;
    mainImage: Image;
    content: PortableTextBlock[];
}