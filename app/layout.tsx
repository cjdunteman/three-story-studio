import './globals.css'

import localFont from 'next/font/local'

const print_clearly = localFont({
  src: '../public/fonts/PrintClearly-GGP.ttf',
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
        <div >{children}</div>
      </body>
    </html>
  )
}
