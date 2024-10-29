import crypto from "crypto";

export const generateVisitorId = (ipAddress: string, userAgent: string) => {
  const visitorId = crypto
    .createHash("sha256")
    .update(`${ipAddress}-${userAgent}`)
    .digest("hex");

  return visitorId;
};
