/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_AUTH_HEADER: string;
  readonly VITE_WC_API_URL: string;
  readonly VITE_WC_AUTH_HEADER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}