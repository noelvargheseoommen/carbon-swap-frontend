import React, {useEffect, useState, useRef} from 'react';
import ReactDOM from "react-dom/client";
import { BalancerSDK,  Network } from '@balancer-labs/sdk';


import {
  ChakraProvider, extendTheme,
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
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';



const config = {
  network: Network.GOERLI,
  rpcUrl: `https://goerli.infura.io/v3/5ad6baed6e324423b49bc2c9c1b5e5e6`,
};

const balancer = new BalancerSDK(config);

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, goerli],
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



const theme = extendTheme({
  colors: {
    brand: {
      100: "#c9e265",
      200: '#c9e265e1',
      300: '#c9e26588',
      400: '#c9e26540'
    },

    lblack: {
      100: "#000000db"
    },

    lwhite: {
      100: "#ffffffa2"
    },

    
  },
})




ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>

    <ChakraProvider cssVarsRoot='#app' theme={theme} >
    <RouterProvider router={router}></RouterProvider>
    </ChakraProvider>

    </RainbowKitProvider>
    </WagmiConfig>

  </React.StrictMode>
);
