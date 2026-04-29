import type { NextRequest } from "next/server";

const TARGET = "https://www.binance.com/join?ref=148898758";
const BOT_RE =
  /bot|crawler|spider|facebookexternalhit|twitterbot|slackbot|discordbot|linkedinbot|telegrambot|whatsapp|line|kakao|embedly|pinterest|skype/i;

const OG_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Binance Referral | kaiyn</title>
<meta name="description" content="Sign up for Binance through kaiyn's referral link.">
<meta name="robots" content="noindex,follow">
<meta property="og:type" content="website">
<meta property="og:title" content="Binance Referral | kaiyn">
<meta property="og:description" content="Sign up for Binance through kaiyn's referral link.">
<meta property="og:url" content="https://kaiyn.org/binance">
<meta property="og:image" content="https://kaiyn.org/og/binance.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Binance Referral | kaiyn">
<meta name="twitter:description" content="Sign up for Binance through kaiyn's referral link.">
<meta name="twitter:image" content="https://kaiyn.org/og/binance.png">
</head>
<body></body>
</html>`;

export function GET(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  if (BOT_RE.test(ua)) {
    return new Response(OG_HTML, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
  return Response.redirect(TARGET, 307);
}
