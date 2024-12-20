import Image from 'next/image'
import chair1 from '../../../assets/images/chair1.jpg'
import chair2 from '../../../assets/images/chair2.jpg'
import pillows from '../../../assets/images/pillows.jpg'
import { Dancing_Script } from 'next/font/google'

const dancing_script = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script'
})

export default function Home() {
  return (
    <div>
      <div className="w-11/12 mx-auto flex flex-col items-center mb-8">
          <h1 className={`${dancing_script.variable} font-sans text-xl mb-8 border-b-2 md:text-4xl`}>
          Custom upholstery & soft goods for your home  
          </h1> 
          <div className="flex-wrap gap-8 justify-center md:flex md:flex-row">
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
      <div className="bg-lightBeige px-8">
        <div className="max-w-4xl mx-auto py-8">
          <p className="text-2xl">WELCOME TO MY STUDIO</p>
          <p className={`${dancing_script.variable} font-sans text-2xl pb-8`}>Proudly located in Sussex, Wisconsin</p>
          <p className="text-xl md:text-2xl">Hi, my name is Kristin and I&apos;m glad you stopped by! I love to help people create beautiful homes through the renewal of cherished pieces and custom made accents such as footstools, bench cushions, and pillows.</p>
          <br>
          </br>
          <p className="text-md">Drop me a line and I&apos;ll be happy to chat with you about your specific project and how I may help you. Thank you!</p>
        </div>
      </div>
    </div>
  )
}