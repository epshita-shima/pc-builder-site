import "antd/dist/reset.css"; // Ant Design v5
import "@/styles/globals.css"; // your own global resets or styles
import { Provider } from "react-redux";
import store from "./../src/component/redux/store";
import { SessionProvider } from "next-auth/react";
export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </Provider>
  );
}
