import Image from 'next/image'
import instagram from '../assets/icons/instagram.svg'
import facebook from '../assets/icons/facebook.svg'

export default function Footer() {
    return (
        <footer className="flex justify-between container mx-auto py-16">
            <div>
                <p className="text-3xl">CONTACT ME</p>
                <a className="text-2xl font-bold" href="mailto: kristin@threestorystudio.com">kristin@threestorystudio.com</a>
            </div>
            <div>
                <p className="text-3xl">FOLLOW ME</p>
                <div className="flex flex-end">
                    <a href="https://www.instagram.com/threestorystudio/">
                        <Image
                            src={instagram}
                            height={32}
                            width={32}
                            alt="instagram"
                        />
                    </a>
                    <a href="https://www.facebook.com/3storystudiollc">
                        <Image
                            src={facebook}
                            height={32}
                            width={32}
                            alt="facebook"
                        />
                    </a>
                </div>
            </div>
        </ footer>
    )
}