import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { chains, client } from "../wagmi";

import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter/variable.css";
import { theme } from "../theme";
import Layout from "../components/Layout";
import { AragonProvider } from "use-aragon";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        <AragonProvider>
          <ChakraProvider theme={theme}>
            <NextHead>
              <title>My wagmi + RainbowKit App</title>
            </NextHead>

            {mounted && (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </ChakraProvider>
        </AragonProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
