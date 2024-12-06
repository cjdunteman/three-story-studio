import Image from "next/image"
import { Dancing_Script } from "next/font/google"
import Link from "next/link"

const dancing_script = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script'
})

export default function Header() {
  return (
    <div className="grid grid-cols-3 place-items-center items-center">
      <div>
        <Image
          src="/3SS_logo_transparent.png"
          width={300}
          height={300}
          alt="Three Story Studio Logo"
        />
      </div>
      <div className="text-3xl">
        <Link className="pr-4 border-r mr-4 border-black" href="/">
              Home
          </Link>
          <Link className="pr-4 border-r mr-4 border-black" href="/peeks">
              Peeks
          </Link>
          <Link className="" href="/stories">
              Stories
        </Link>
      </div>
        <div>      
          <a href="mailto:kristin@threestorystudio.com">
            <button className="border-2 py-2 px-4 rounded text-3xl border-lightBeige">Inquire</button>
          </a>
        </div>
    </div>
  )
}