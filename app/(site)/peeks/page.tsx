import Image from "next/image"
import { Dancing_Script } from 'next/font/google'

const dancing_script = Dancing_Script({
    subsets: ['latin'],
    variable: '--font-dancing-script'
})

export default function Peeks() {
    return (
        <div className="container mx-auto max-w-6xl flex-col">
            <div className="flex flex-col items-center">
                <div className="grid-cols-3"></div>
            </div>
        </div>
    )
}