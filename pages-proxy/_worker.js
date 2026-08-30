const COZE_ENDPOINT = "https://api.coze.cn/v1/workflows/chat";

const ALLOWED_ORIGINS = new Set([
  "https://yhao-l.github.io",
  "http://localhost:3000",
]);

const ALLOWED_WORKFLOWS = new Map([
  ["7539120778186457124", "7537995711728828426"],
  ["7538014055757283374", "7537995711728828426"],
  ["7604822147281977385", "7604774068013105171"],
]);

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonResponse(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(origin && ALLOWED_ORIGINS.has(origin) ? corsHeaders(origin) : {}),
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const isAllowedOrigin = ALLOWED_ORIGINS.has(origin);

    if (request.method === "OPTIONS") {
      return isAllowedOrigin
        ? new Response(null, { status: 204, headers: corsHeaders(origin) })
        : jsonResponse({ error: "Origin not allowed" }, 403);
    }

    if (request.method === "GET" && url.pathname === "/health") {
      return jsonResponse({ ok: true }, 200, origin);
    }

    if (request.method !== "POST" || url.pathname !== "/v1/workflows/chat") {
      return env.ASSETS
        ? env.ASSETS.fetch(request)
        : jsonResponse({ error: "Not found" }, 404, origin);
    }

    if (!isAllowedOrigin) {
      return jsonResponse({ error: "Origin not allowed" }, 403);
    }

    if (!env.COZE_API_TOKEN) {
      return jsonResponse({ error: "Server is not configured" }, 500, origin);
    }

    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (contentLength > 100_000) {
      return jsonResponse({ error: "Request is too large" }, 413, origin);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON" }, 400, origin);
    }

    const expectedAppId = ALLOWED_WORKFLOWS.get(String(payload.workflow_id));
    if (!expectedAppId || String(payload.app_id) !== expectedAppId) {
      return jsonResponse({ error: "Workflow not allowed" }, 403, origin);
    }

    const cozeResponse = await fetch(COZE_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.COZE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseHeaders = new Headers(cozeResponse.headers);
    for (const [key, value] of Object.entries(corsHeaders(origin))) {
      responseHeaders.set(key, value);
    }
    responseHeaders.delete("Set-Cookie");

    return new Response(cozeResponse.body, {
      status: cozeResponse.status,
      headers: responseHeaders,
    });
  },
};
