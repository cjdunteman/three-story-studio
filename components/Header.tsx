import Image from "next/image"
import { Dancing_Script } from "next/font/google"

const dancing_script = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script'
})

export default function Header() {
  return (
    <>
      <Image
        src="/3SS_logo_transparent.png"
        width={300}
        height={300}
        alt="Three Story Studio Logo"
      />
      <div className="border-b border-black py-4 mx-2 mb-6">
        <h1 className={`${dancing_script.variable} font-sans text-xl md:text-4xl pb-4`}>
          Custom upholstery & soft goods for your home
        </h1>
      </div>
    </>
  )
}