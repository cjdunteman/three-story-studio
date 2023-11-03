import { createClient, groq } from 'next-sanity'
// import client  from './client-config'
import { client } from './client-config';
import { Post } from '@/types/Post'
import { Gallery } from '@/types/Gallery';

export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    groq`*[_type == "post"]{
      _id,
      name,
      title,
      "slug": slug.current,
    }`
  )
}

export async function getPost(slug: string): Promise<Post> {
  return client.fetch(
    groq`*[_type == "post"]{
      _id,
      name,
      title,
      "slug": slug.current,
    }`
  )

}

export async function getGallery(): Promise<Gallery> {
  return client.fetch(
    groq`*[_type == "gallery"][0]["gallery"]`
  )
}
