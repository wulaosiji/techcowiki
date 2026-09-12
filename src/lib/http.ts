export function textResponse(body: string, type: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": `${type}; charset=utf-8`,
      "Access-Control-Allow-Origin": "*",
      Link: '</llms.txt>; rel="describedby"',
      "Cache-Control": "public, max-age=300",
    },
  });
}

export function jsonResponse(data: unknown): Response {
  return textResponse(`${JSON.stringify(data, null, 2)}\n`, "application/json");
}
