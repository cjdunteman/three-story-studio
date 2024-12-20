import '../../styles/globals.css'
import Header from '@/components/Header'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

import localFont from 'next/font/local'

const print_clearly = localFont({
  src: '../../../public/fonts/PrintClearly-GGP.ttf',
  variable: '--font-print-clearly'
})

export const metadata = {
  title: 'Three Story Studio',
  description: 'Custom upholstery and soft goods for your home.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={print_clearly.className}>
        <Header />
        <div>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}