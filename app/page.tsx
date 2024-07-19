import Head from 'next/head';
import Link from 'next/link';
import Helloicon from './svgs/helloicon';
import Imgicon from './svgs/imgicon';


export default function Home() {
  return (
    <div>
      <Head>
        <title>Speech Translator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <div className='flex flex-row justify-evenly p-12'>
          <div className='flex flex-row'>
          <Helloicon/>
          <Imgicon/>

          </div>
        

<div className='flex flex-col gap-10'>
  <div className=' flex flex-col text-white text-4xl font-bold gap-6'>
  <p className='self-center'>AVA</p>
  <p className='self-center'>Makes your trips</p>
  <p className='self-center'>Easier</p>
  </div>
  <Link className='px-4 py-2 bg-blue-500 self-center rounded-md text-base font-semibold text-white' href="/translate">Start Conversation</Link>
  
    
</div>



        </div>
      </main>
    </div>
  );
}
