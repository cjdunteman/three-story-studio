import { createClient, groq } from 'next-sanity'
import clientConfig from './client-config'
import { Post } from '@/types/Post'
import { Project } from '@/types/Project'

export async function getPosts(): Promise<Post[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "post"]{
            _id,
            _createdAt,
            title,
            "slug": slug.current,
            "image": image.asset->url.image,
            url,
            content
        }`
  )
}

export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project"]{
            _id,
            _createdAt,
            title,
            "slug": slug.current,
            "image": image.asset->url.image,
            url,
            content
        }`
  )
}
