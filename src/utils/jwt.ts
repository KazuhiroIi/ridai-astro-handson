import { jwtVerify, createRemoteJWKSet } from "jose";

export interface AccessJWTPayload {
  email?: string;
  sub?: string;
  aud?: string | string[];
  iss?: string;
  exp?: number;
  iat?: number;
}

/**
 * Cloudflare Access JWT を検証します。
 * @param token   cf-access-jwt-assertion ヘッダーの値
 * @param jwkUrl  Cloudflare Access の JWKS エンドポイント URL
 *                例: https://<team>.cloudflareaccess.com/cdn-cgi/access/certs
 * @param audience Cloudflare Access アプリケーションの AUD (ポリシー AUD)
 * @returns 検証成功時はペイロード、失敗時は null
 */
export async function verifyCloudflareAccessJWT(
  token: string,
  jwkUrl: string,
  audience: string
): Promise<AccessJWTPayload | null> {
  try {
    const JWKS = createRemoteJWKSet(new URL(jwkUrl));
    const { payload } = await jwtVerify(token, JWKS, {
      audience,
    });
    return payload as AccessJWTPayload;
  } catch {
    return null;
  }
}
