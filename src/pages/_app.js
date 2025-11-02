import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main className="app-wrapper">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}