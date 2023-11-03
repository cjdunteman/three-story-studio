import Image from 'next/image'
import chair1 from '../../assets/images/chair1.jpg'
import chair2 from '../../assets/images/chair2.jpg'
import pillows from '../../assets/images/pillows.jpg'
import selfie from '../../assets/images/selfie.jpg'
import { Dancing_Script } from 'next/font/google'

const dancing_script = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script'
})

export default function Home() {
  return (
    <>
      <div className="container mx-auto flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center md:my-6 md:p-12 max-w-6xl md:flex-row md:justify-between w-full">
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
              width={312}
            />
          </div>
        </div>
      </div>
      <div className="md:py-12 bg-lightBeige">
        <div className="flex flex-row justify-center">
          <Image className="md:pr-10"
            src={selfie}
            alt="Kristin"
            height={360}
            width={300}
          />
          <div className="md:max-w-3xl">
            <p className="text-2xl md:text-4xl">WELCOME TO MY STUDIO</p>
            <p className={`${dancing_script.variable} font-sans text-2xl pb-8`}>Proudly located in Sussex, Wisconsin</p>
            <p className="text-xl md:text-2xl">Hi, my name is Kristin and I&apos;m glad you stopped by! I love to help people create beautiful homes through the renewal of cherished pieces and custom made accents such as footstools, bench cushions, and pillows.</p>
            <br>
            </br>
            <p className="text-md md:text-2xl">Drop me a line and I&apos;ll be happy to chat with you about your specific project and how I may help you. Thank you!</p>
          </div>
        </div>
      </div>
    </>
  )
}
