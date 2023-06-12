import Image from 'next/image'
import instagram from '../assets/icons/instagram.png'
import facebook from '../assets/icons/facebook.png'

export default function Footer() {
    return (
        <footer className="flex justify-between">
            <div>
                <p>CONTACT ME</p>
                <a href="mailto: kristin@threestorystudio.com">kristin@threestorystudio.com</a>
            </div>
            <div>
                <p>FOLLOW ME</p>
                <div className="flex flex-end">
                    <a href="https://www.instagram.com/threestorystudio/">
                        <Image
                            src={instagram}
                            height={24}
                            width={24}
                            alt="instagram"
                        />
                    </a>
                    <a href="https://www.facebook.com/3storystudiollc">
                        <Image
                            src={facebook}
                            height={24}
                            width={24}
                            alt="facebook"
                        />
                    </a>
                </div>
            </div>
        </ footer>
    )
}