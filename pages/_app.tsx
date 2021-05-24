import '../components/Modal/modal.scss';
import { AppProps } from 'next/app';
import Modal from '../components/Modal'
// function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default App

const CustomApp: React.FC<AppProps> = ({Component, pageProps}) => {
  return (
    <>
      <Component />
    </>
  )
}



export default CustomApp;
 