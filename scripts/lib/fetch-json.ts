/** A failed refresh must not be mistaken for a missing encyclopedia record. */
export async function fetchJson(url: string, options: {
  headers?: Record<string, string>;
  attempts?: number;
  timeoutMs?: number;
  retryDelayMs?: number;
} = {}): Promise<unknown> {
  const { headers, attempts = 6, timeoutMs = 15000, retryDelayMs = 400 } = options;
  if (!Number.isInteger(attempts) || attempts < 1) throw new Error("attempts must be a positive integer");
  let failure: unknown;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    let response: Response | undefined;
    try {
      response = await fetch(url, { headers, signal: AbortSignal.timeout(timeoutMs) });
      if (response.status === 404) {
        await response.body?.cancel();
        return null;
      }
      if (response.ok) return await response.json();
      await response.body?.cancel();
      failure = new Error(`Source request failed: HTTP ${response.status} ${url}`);
    } catch (error) {
      failure = error;
    }
    // Permanent errors should fail promptly; network errors, 429 and 5xx retry.
    if (response && response.status >= 400 && response.status < 500 && response.status !== 429) throw failure;
    if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, retryDelayMs * attempt * attempt));
  }
  throw new Error(`Source refresh aborted after ${attempts} attempts: ${url}`, { cause: failure });
}
