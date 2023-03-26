import React from "react";
import ReactDOM from "react-dom/client";


import {
  ChakraProvider,
} from '@chakra-ui/react'


import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import router from "./routes/routes";


import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';




const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>

    <ChakraProvider cssVarsRoot='#app'>
    <RouterProvider router={router}></RouterProvider>
    </ChakraProvider>

    </RainbowKitProvider>
    </WagmiConfig>

  </React.StrictMode>
);
