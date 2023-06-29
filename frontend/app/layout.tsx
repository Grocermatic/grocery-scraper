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
  variable: '--primary-font'
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className={lora.className}>
          {children}
        </main>
      </body>
    </html>
  )
}
