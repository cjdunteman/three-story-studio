import { Image, PortableTextBlock } from "sanity";

export type Post = {
    _id: string;
    title: string;
    name: string;
    slug: string;
    _publishedAt: Date;
    image: string;
    content: PortableTextBlock[];
}