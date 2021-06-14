import { ExternalProvider } from '@ethersproject/providers/src.ts/web3-provider';

export {};

declare global {
   interface Window {
      ethereum: ExternalProvider;
   }
}
