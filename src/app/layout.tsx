import './globals.css'
import { Poppins } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ToastProvider from '@/providers/toast'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'] })

export const metadata = {
  title: 'JellyTronic - O Seu Mar de Opções para Comprar',
  description: 'JellyTronic: O Seu Mar de Opções para Comprar',
}


export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={poppins.className}>
        <ToastProvider>
          <div className="flex flex-col h-screen">
            <div className='h-20 lg:h-[95px]'>
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
