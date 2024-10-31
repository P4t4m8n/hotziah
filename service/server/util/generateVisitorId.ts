export async function generateVisitorId(
  ipAddress: string,
  userAgent: string
): Promise<string> {
  const seedData = `${ipAddress}-${userAgent}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(seedData);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const visitorId = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return visitorId;
}
