import Image from 'next/image'
import styles from './page.module.css'
import Nav from '@/components/Nav'

export default function Home() {
  return (
    <main className={styles.main}>
        <Image 
          src="/3SS_logo_transparent.png"
          width={300}
          height={300}
          alt="Three Story Studio Logo"
        />
        <h2>
          Custom upholstery & soft goods for your home
        </h2>
        <Nav />
      <div className={styles.description}>
      </div>
    </main>
  )
}
