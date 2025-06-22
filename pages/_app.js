import 'antd/dist/reset.css';      // Ant Design v5
import '@/styles/globals.css';    // your own global resets or styles

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}