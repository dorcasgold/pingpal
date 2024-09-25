import React from 'react';
import AuthButtons from './AuthButtons';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

const page = async () => {
const { isAuthenticated } = getKindeServerSession();
  if (await isAuthenticated()) return redirect("/");
  

  return (
    <main className='flex h-screen w-full'>
  <div className='w-2/4 hidden md:block'>
    <img
      src="/Emojis.jpg"
      alt="background logo"
      className='w-full h-full object-cover pointer-events-none select-none'
    />
    
  </div>

  {/* Content Section */}
  <div className='md:w-2/4 flex flex-col items-center justify-center text-center gap-8 bg-gradient-to-r from-emerald-100 via-emerald-200 to-emerald-300'>
    <img
      src="/logo.png"
      alt="logo"
      className='w-20 pointer-events-none select-none'
    />
    <p className='text-3xl font-semibold '>
      👋 Welcome to <span className='bg-gradient-to-r from-rose-500 via-orange-500 to-red-700 bg-clip-text text-transparent'>PingPal!</span>
    </p>
    <p className='lg:text-lg text-sm font-semibold'> 💬 Your go-to app for fast, seamless, and secure messaging anytime, anywhere. 🚀</p>
  <AuthButtons />
      </div>
</main>

  );
}

export default page;
