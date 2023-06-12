import Image from 'next/image'
import Footer from '@/components/Footer'
import { Dancing_Script } from 'next/font/google'
import chair1 from '../assets/images/chair1.jpg'
import chair2 from '../assets/images/chair2.jpg'
import pillows from '../assets/images/pillows.jpg'
import selfie from '../assets/images/selfie.jpg'

const dancing_script = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script'
})

export default function Home() {
  return (
    <div className="container mx-auto max-w-6xl flex-col">
      <div className="flex flex-col items-center">
        <Image
          src="/3SS_logo_transparent.png"
          width={300}
          height={300}
          alt="Three Story Studio Logo"
        />
        <h1 className={`${dancing_script.variable} font-sans text-4xl pb-4`}>
          Custom upholstery & soft goods for your home
        </h1>
        <div className="my-6 pr-2 flex space-x-12">
          <Image
            src={pillows}
            alt="Chair"
            height={625}
            width={350}
          />
          <Image
            src={chair2}
            alt="Chair"
            height={625}
            width={350}
          />
          <Image
            src={chair1}
            alt="Chair"
            height={625}
            width={350}
          />
        </div>
        <div className="flex my-6">
          <Image className="pr-4"
            src={selfie}
            alt="Kristin"
            height={360}
            width={300}
          />
          <div>
            <p className="text-4xl">WELCOME TO MY STUDIO</p>
            <p className={`${dancing_script.variable} font-sans text-2xl pb-2`}>Proudly located in Sussex, Wisconsin</p>
            <p className="text-xl">Hi, my name is Kristin and I&apos;m glad you stopped by! I love to help people create beautiful homes through the renewal of cherished pieces and custom made accents such as footstools, bench cushions, and pillows.</p>
            <br>
            </br>
            <p className="text-xl">Drop me a line and I&apos;ll be happy to chat with you about your specific project and how I may help you. Thank you!</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
