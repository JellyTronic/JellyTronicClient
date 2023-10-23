// import { NextAuthProvider } from '@/providers/auth'
import './globals.css'
import { Poppins } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ToastProvider from '@/providers/toast'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

export const metadata = {
  title: 'ShopWave - O Seu Mar de Opções de Compra',
  description: 'ShopWave: O Seu Mar de Opções de Compra',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToastProvider>
          <div className="flex flex-col h-screen">
            <div className='h-[95px]'>
              <Header />
            </div>
            <div className="flex-1 mt-6">{children}</div>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  )
}
