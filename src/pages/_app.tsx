import "@styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import Layout from "src/layout";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { polygon,polygonMumbai } from "@wagmi/chains";
export default function App({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(
    [polygonMumbai],
    [
      jsonRpcProvider({
        rpc: (chain: any) => ({
          http: `https://polygon-mumbai.g.alchemy.com/v2/mlB80DYguB4KcD4G6Cd349v9S7TGxxMk`,
          webSocket: `wss://polygon-mumbai.g.alchemy.com/v2/mlB80DYguB4KcD4G6Cd349v9S7TGxxMk`,
        }),
      }),
    ]
  );
  const { connectors } = getDefaultWallets({
    appName: process.env.NEXT_APP_NAME as string,
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
