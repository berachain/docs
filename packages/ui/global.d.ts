// Imports
// ========================================================
import { BrowserProvider, Eip1193Provider } from 'ethers';

// Types
// ========================================================
declare global {
  interface Window {
    ethereum: Eip1193Provider & BrowserProvider;
  }
}

declare module '@rive-app/canvas';
