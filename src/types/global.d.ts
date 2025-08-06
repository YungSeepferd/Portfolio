interface Window {
  gtag?: (command: string, eventName: string, eventParams: Record<string, any>) => void;
  localStorage: Storage;
}

declare var window: Window;
