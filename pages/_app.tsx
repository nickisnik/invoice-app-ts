import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='app'>
      <Navbar />
      <div className='component_wrapper'>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
