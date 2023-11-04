'use client'

// import { NextAuthProvider } from '@/providers/auth'
import './globals.css'
import { Poppins } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ToastProvider from '@/providers/toast'
import { usePathname } from 'next/navigation';
import HeaderPayment from './buy/components/HeaderPayment'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

export const metadata = {
  title: 'JellyTronic - O Seu Mar de Opções para Comprar',
  description: 'JellyTronic: O Seu Mar de Opções para Comprar',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const isPaymentPage = pathname.startsWith('/buy/payments/') || pathname.startsWith('/buy/address/');

  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToastProvider>
          <div className="flex flex-col h-screen">
            <div className='h-[95px]'>
            {isPaymentPage ? <HeaderPayment /> : <Header />}
              {/* <Header /> */}
            </div>
            <div className="flex-1 mt-6">{children}</div>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  )
}
