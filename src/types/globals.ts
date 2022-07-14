// Modifying window type to add runtime env https://github.com/kHRISl33t/runtime-env-cra

export {};

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      API_URL: string;
      NODE_ENV: string;
    };
  }
}