import { Inter, Lora } from 'next/font/google'
import './global.css'

export const metadata = {
  title: 'Grocermatic',
  description: 'Grocermatic is a grocery suggestion app that helps you find the best deals on groceries.',
}

export const inter = Inter({
  subsets: ['latin'],
  variable: '--primary-font'
})

export const lora = Lora(
  {subsets: ['latin'],
  variable: '--secondary-font'
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${lora.variable}`}>
        {children}
        </body>
    </html>
  )
}
