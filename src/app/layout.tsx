import { Suspense } from 'react'
import './globals.css'
import Loading from './Loading'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading />}>
          {children}  
        </Suspense>
      </body>
    </html>
  )
}
