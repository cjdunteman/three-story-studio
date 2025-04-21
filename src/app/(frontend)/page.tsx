import Image from 'next/image'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from "payload"

import { Dancing_Script } from 'next/font/google'

const dancing_script = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script'
})

export default async function Home() {
  const payload = await getPayload({ config: configPromise })

  const images = await payload.find({
    collection: 'media',
    where: {
      homePage: {
        equals: 'true'
      }
    }
  })

  return (
    <div>
      <div className="w-11/12 mx-auto flex flex-col items-center mb-8">
        <h1 className={`${dancing_script.variable} font-sans text-3xl mb-8 border-b-2 text-center md:text-4xl`}>
          Custom upholstery & soft goods for your home
        </h1>
        <div className="flex overflow-x-auto max-w-7xl scrollbar-hide px-4 md:px-10 gap-4 snap-x snap-mandatory items-center w-full">
          {images.docs.map(({ id, url, alt }) => (
            <div key={id} className="flex-shrink-0 mb-4 break-inside-avoid snap-center w-[300px] md:w-[400px]">
              <Link href="#">
                <Image
                  src={url!}
                  alt={alt}
                  width={400}
                  height={0}
                  className="w-full rounded-lg"
                  style={{ height: 'auto' }}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#BEB19B] px-8">
        <div className="max-w-4xl mx-auto py-8">
          <p className="text-2xl">WELCOME TO MY STUDIO</p>
          <p className={`${dancing_script.variable} font-sans text-2xl pb-8`}>Proudly located in Sussex, Wisconsin</p>
          <p className="text-xl md:text-2xl">Hello and welcome!</p><br />
          <p className="text-xl md:text-2xl">My name is Kristin and I'm glad you stopped by. A well-loved home reflects your own personal style and history. It is your story to tell. I enjoy collaborating with people to help make that happen.</p><br />
          <p className="text-xl md:text-2xl">Bespoke furniture upholstery and various types of custom-made soft goods are my specialty. High quality craftsmanship, attention to detail and individual style are the basis of my trade.</p><br />
          <p className="text-xl md:text-2xl">Drop me a line and I'd be happy to speak with you about your specific project needs/ideas. Hope to meet you soon!</p>
          <br>
          </br>
        </div>
      </div>
    </div>
  )
}