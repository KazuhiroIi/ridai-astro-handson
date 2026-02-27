import { defineMiddleware } from "astro:middleware";
import { verifyCloudflareAccessJWT } from "./utils/jwt";

export const onRequest = defineMiddleware(async (context, next) => {
  const env = context.locals.runtime?.env;

  // シークレットが未設定の場合はローカル開発とみなしてスキップ
  if (!env?.CF_ACCESS_AUD || !env?.CF_ACCESS_JWK_URL) {
    return next();
  }

  const token = context.request.headers.get("cf-access-jwt-assertion");

  if (!token) {
    return new Response("Unauthorized: Cloudflare Access JWT が見つかりません", {
      status: 403,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const payload = await verifyCloudflareAccessJWT(
    token,
    env.CF_ACCESS_JWK_URL,
    env.CF_ACCESS_AUD
  );

  if (!payload) {
    return new Response("Unauthorized: JWT の検証に失敗しました", {
      status: 403,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  // 後続の処理でメールアドレスを使いたい場合は locals 経由で渡す
  context.locals.userEmail = payload.email;

  return next();
});
