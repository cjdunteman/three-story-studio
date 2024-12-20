import Image from 'next/image'
import instagram from '../../assets/icons/instagram.svg'
import facebook from '../../assets/icons/facebook.svg'

export default function Footer() {
    return (
        <footer className="bg-lightGray px-8 py-8">
            <div className="max-w-7xl mx-auto flex justify-between">
                <div>
                    <p className="text-2xl">CONTACT ME</p>
                    <a className="text-xl font-bold" href="mailto: kristin@threestorystudio.com">kristin@threestorystudio.com</a>
                </div>
                <div>
                    <p className="text-2xl">FOLLOW ME</p>
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
            </div>
        </ footer>
    )
}