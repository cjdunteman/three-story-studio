import Image from 'next/image'
import Link from 'next/link'
import instagram from '../../assets/icons/instagram.svg'
import facebook from '../../assets/icons/facebook.svg'
import linkedin from '../../assets/icons/linkedin.svg'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gradient-to-b from-taupe-light to-taupe px-8 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
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
                    <p className="text-xl md:text-2xl mb-4">Reach out directly to discuss your upholstery project with me!</p>
                    <div>
                        <div className="mt-6">                        
                            <a 
                                href="mailto:kristin@threestorystudio.com"
                                className="bg-sage hover:bg-sage-dark text-gray-800 px-4 py-3 rounded transition-colors text-xl md:text-2xl"
                            >
                                Send an Email
                            </a>
                        </div>
                        <div className="flex space-x-4 mt-8">
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
            <hr className="my-8 border-gray-300" />
            <div className="text-center mt-8 text-gray-600">
                <p className="text-lg md:text-xl">&copy; {currentYear} Three Story Studio. All rights reserved.</p>
                {/* <p className="text-sm md:text-base">Website by <a href="https://www.cjdunteman.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">C.J. Dunteman</a></p> */}
            </div>
        </footer>
    )
}