/// <reference types="astro/client" />

interface CloudflareEnv {
  /** Cloudflare Access アプリケーションの AUD (ポリシー AUD トークン) */
  CF_ACCESS_AUD: string;
  /** Cloudflare Access JWKS エンドポイント URL
   *  例: https://<team>.cloudflareaccess.com/cdn-cgi/access/certs */
  CF_ACCESS_JWK_URL: string;
}

type Runtime = import("@astrojs/cloudflare").Runtime<CloudflareEnv>;

declare namespace App {
  interface Locals extends Runtime {
    /** Cloudflare Access JWT から取得した認証ユーザーのメールアドレス */
    userEmail?: string;
  }
}
