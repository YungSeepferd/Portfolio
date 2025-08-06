declare global {
  interface Window {
    gtag?: (command: string, event: string, params: object) => void;
  }
}
