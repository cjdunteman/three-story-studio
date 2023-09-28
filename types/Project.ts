import { Image } from "sanity";

export type Project = {
    _id: string;
    title: string;
    images: Image;
}