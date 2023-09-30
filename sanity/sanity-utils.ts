import { createClient, groq } from 'next-sanity'
import { client } from './client-config'
import { Post } from '@/types/Post'
import { Project } from '@/types/Project'

// Get all post slugs
export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`;
