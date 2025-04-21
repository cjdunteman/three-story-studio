import Image from 'next/image'
import Link from 'next/link'
import instagram from '../../assets/icons/instagram.svg'
import facebook from '../../assets/icons/facebook.svg'
import linkedin from '../../assets/icons/linkedin.svg'

export default function Footer() {
    return (
        <footer className="bg-[#CFCABD] px-8 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo Column */}
                <div>
                    <Image
                        src="/3SS_logo_transparent.png"
                        alt="Three Story Studio Logo"
                        width={200}
                        height={60}
                        className="mb-4"
                    />
                </div>

                {/* Quick Links Column */}
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-3">
                        <li>
                            <Link href="/" className="text-xl md:text-2xl hover:text-gray-700">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/gallery" className="text-xl md:text-2xl hover:text-gray-700">
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className="text-xl md:text-2xl hover:text-gray-700">
                                About
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Column */}
                <div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Contact</h3>
                    <div className="space-y-4">
                        <a 
                            href="mailto:kristin@threestorystudio.com"
                            className="inline-block bg-[#B2C0BE] text-black px-4 py-3 rounded transition-colors text-xl md:text-2xl"
                        >
                            Send an Email
                        </a>
                        <div className="flex space-x-4 mt-4">
                            <a href="https://www.linkedin.com/in/kristin-dunteman-1197aa72/" target="_blank" rel="noopener noreferrer">
                                <Image
                                    src={linkedin}
                                    height={32}
                                    width={32}
                                    alt="LinkedIn"
                                />
                            </a>
                            <a href="https://www.instagram.com/threestorystudio/" target="_blank" rel="noopener noreferrer">
                                <Image
                                    src={instagram}
                                    height={32}
                                    width={32}
                                    alt="instagram"
                                />
                            </a>
                            <a href="https://www.facebook.com/3storystudiollc" target="_blank" rel="noopener noreferrer">
                                <Image
                                    src={facebook}
                                    height={32}
                                    width={32}
                                    alt="facebook"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}