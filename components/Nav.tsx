import Link from "next/link";

export default function Navbar() {
    return (
        <div className="hidden md:block mb-10 mt-4">
            <nav className="text-3xl flex items-center">
                <Link className="pr-4 border-r mr-4 border-black" href="/">
                    Home
                </Link>
                <Link className="pr-4 border-r mr-4 border-black" href="/peeks">
                    Peeks
                </Link>
                <Link className="" href="/stories">
                    Stories
                </Link>
            </nav>
        </div>
    )
}