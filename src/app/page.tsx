import PreferencesTab from '@/components/PreferencesTab';
import React from 'react';

function Home() {
  return (
    <main className='relative flex h-screen flex-col items-center justify-center p-4 md:px-24 py-32 gap-4'>
      <PreferencesTab />

      {/* Jigsaw-like pattern */}
      <div
        className='absolute top-0 z-[-2] h-screen w-screen grid grid-cols-8 grid-rows-6 gap-2 p-4 bg-[#f0f0f0] dark:bg-[#1a1a1a]'
        aria-hidden='true'
      >
        {[...Array(48)].map((_, i) => (
          <div
            key={i}
            className='bg-[#ffffff] dark:bg-[#2d2d2d] h-full w-full rounded-md transform rotate-[5deg] clip-jigsaw'
          />
        ))}
      </div>
    </main>
  );
}

export default Home;
