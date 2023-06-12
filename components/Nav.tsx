import Link from "next/link";

export default function Navbar() {
    return (
        <div>
            <nav>
                <Link href="/">
                    Home
                </Link>
                <Link href="/peeks">
                    Peeks
                </Link>
                <Link href="/about">
                    About
                </Link>
                <Link href="/whatIDo">
                    What I Do
                </Link>
                <Link href="/stories">
                    Stories
                </Link>
                <Link href="/letsTalk">
                    Let&apos;s Talk
                </Link>
            </nav>
        </div>
    )
}