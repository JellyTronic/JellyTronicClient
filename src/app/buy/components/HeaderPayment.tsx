'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HeaderPayment = () => {
  const pathname = usePathname();
  const isPaymentPage = pathname.startsWith('/buy/payments/');

  return (
    <div className='container mx-auto p-2 pt-4 lg:pt-1 w-[100%]'>
      <div className='hidden lg:flex lg:justify-between lg:border-b lg:border-gray-500'>

        <Link href='/' className='py-4'>
          <div className='hidden lg:flex relative h-[40px] w-[500px]'>
            <Image src='/logoName.png' alt='JellyTronic' fill objectFit='container' />
          </div>
        </Link>


        {isPaymentPage ? (
          <div className="flex items-center justify-between mt-4 pr-10">

            <div className="flex-1 relative text-center mt-6">
              <div className="w-6 h-6 mx-auto rounded-full bg-primary flex items-center justify-center">
                <p className="text-lg text-white">1</p>
              </div>
              <p className="text-base mt-1">Address</p>
            </div>

            <div className='flex w-96'>
              <div className="w-64 relative flex mt-1 ml-[-2em]">
                <div className="w-64 h-2 relative">
                  <div className="w-64 h-2 bg-primary absolute right-[-0.2em] -translate-y-1/2" />
                </div>
              </div>

              <div className="w-32 mt-1">
                <div className="w-32 h-2 relative">
                  <div className="w-32 h-2 bg-primary absolute right-[-0.1em] -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div className="flex-1 relative text-center ml-[-3.6em] mt-6">
              <div className="w-6 h-6 mx-auto rounded-full bg-primary flex items-center justify-center">
                <p className="text-lg text-white">2</p>
              </div>
              <p className="text-base mt-1">Payment</p>
            </div>

          </div>
        ) : (

          <div className="flex items-center justify-between mt-4 pr-10">
            <div className="flex-1 relative text-center mt-4">
              <div className="w-6 h-6 mx-auto rounded-full bg-primary flex items-center justify-center">
                <p className="text-lg text-white">1</p>
              </div>
              <p className="text-base mt-1">Address</p>
            </div >

            <div className='flex w-96'>
              <div className="w-64 relative flex mt-1 ml-[-2em]">
                <div className="w-64 h-2 relative">
                  <div className="w-64 h-2 bg-primary absolute right-[-0.2em] -translate-y-1/2" />
                </div>
              </div>

              <div className="w-1 h-2 relative bg-primary mb-3 z-10">
                <div className="w-[0.55em] h-[0.55em] bg-primary transform rotate-45 right-[-0.2em]" />
              </div>

              <div className="w-32 mt-1">
                <div className="w-32 h-2 relative">
                  <div className="w-32 h-2 bg-gray-400 absolute right-[-0.1em] -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div className="flex-1 relative text-center ml-[-3.4em] mt-3">
              <div className="w-6 h-6 mx-auto rounded-full bg-gray-400 flex items-center justify-center">
                <p className="text-lg text-white">2</p>
              </div>
              <p className="text-base mt-1">Payment</p>
            </div>

          </div >
        )}

      </div >

      <div className='flex items-center justify-center lg:hidden'>
        <Link href='/' className='pl-1 md:pl-8'>
          <div className='relative h-[32px] w-[260px] md:w-[440px]  lg:hidden'>
            <Image src='/logoName.png' alt='JellyTronic' fill objectFit='container' />
          </div>
        </Link>
      </div>

    </div >

  );
}

export default HeaderPayment;
