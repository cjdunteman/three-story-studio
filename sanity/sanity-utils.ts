import { createClient, groq } from 'next-sanity'
import clientConfig from './client-config'
import { Post } from '@/types/Post'

export async function getPosts(): Promise<Post[]> {
  const client = createClient({
    projectId: 'f8y83dz4',
    dataset: 'production',
    apiVersion: '2023-06-11',
    useCdn: false,
  });

  return client.fetch(
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
