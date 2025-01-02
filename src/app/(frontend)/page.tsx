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
        status: {
          equals: 'true'
        }
      }
  })

  console.log(images.docs[0])

  return (
    <div>
      <div className="w-11/12 mx-auto flex flex-col items-center mb-8">
          <h1 className={`${dancing_script.variable} font-sans text-3xl mb-8 border-b-2 text-center md:text-4xl`}>
          Custom upholstery & soft goods for your home  
          </h1> 
          <div className="overflow-x-auto whitespace-nowrap max-w-7xl scrollbar-hide md:p-10 gap-8 md:flex md:flex-row">
            {images.docs.map(({id, url, alt})=> (
              <div key={id} className="flex-shrink-0 mb-4 break-inside-avoid">
                  <Link href="#">
                      <Image src={url!} alt={alt} height={300} width={300} className="w-full object-cover" />
                  </Link>
              </div>
            ))}
          </div>
      </div>
      <div className="bg-lightBeige px-8">
        <div className="max-w-4xl mx-auto py-8">
          <p className="text-2xl">WELCOME TO MY STUDIO</p>
          <p className={`${dancing_script.variable} font-sans text-2xl pb-8`}>Proudly located in Sussex, Wisconsin</p>
          <p className="text-xl md:text-2xl">Hi, my name is Kristin and I&apos;m glad you stopped by! I love to help people create beautiful homes through the renewal of cherished pieces and custom made accents such as footstools, bench cushions, and pillows.</p>
          <br>
          </br>
          <p className="text-lg">Drop me a line and I&apos;ll be happy to chat with you about your specific project and how I may help you. Thank you!</p>
        </div>
      </div>
    </div>
  )
}