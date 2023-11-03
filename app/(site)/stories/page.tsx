import { SanityDocument } from '@sanity/client';
import PreviewProvider from '@/components/PreviewProvider';
import { sanityFetch, token } from '@/sanity/lib/sanity.fetch';
import { postsQuery } from '@/sanity/lib/queries';
import PreviewPosts from '@/components/PreviewPosts';
import { draftMode } from 'next/headers';
import Posts from '@/components/Posts';

export default async function Stories() {
  const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery });
  const isDraftMode = draftMode().isEnabled;

  if (isDraftMode && token) {
    return (
      <PreviewProvider token={token}>
        <PreviewPosts posts={posts} />
      </PreviewProvider>
    );
  }

  return <Posts posts={posts} />;
}