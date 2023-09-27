import { getPosts } from '@/sanity/sanity-utils'
import Header from '@/components/Header'
import Nav from '@/components/Nav'

export default async function Stories() {

    const posts = await getPosts();

    return (
      <>
        <div className="flex flex-col items-center">
          </div>
        <div>
            {posts.map((post) => (
                    <div key={post._id}>
                        {post.title}
                    </div>
                    ))}
        </div>
      </>
    )
}