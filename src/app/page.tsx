import ChatLayout from '@/components/chat/ChatLayout';
import PreferencesTab from '@/components/PreferencesTab';
import { cookies } from "next/headers";

function Home() {
  const layout = cookies().get("react-resizable-panels:layout"); // Retrieve layout from cookies
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined; // Parse layout if available

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

       {/* Container for ChatLayout */}
            <div className='z-10 border rounded-lg max-w-5xl w-full min-h-[85vh] text-sm lg:flex text-white'>
                <ChatLayout defaultLayout={defaultLayout} />
            </div>
    </main>
  );
}

export default Home;
