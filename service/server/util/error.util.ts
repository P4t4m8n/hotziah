import { loggerService } from "./logger.util";

export const handleError = (error: unknown, errorStr: string) => {
  loggerService.error(errorStr, error as Error);
  return new Error(
    `${errorStr}: ${error instanceof Error ? error.message : String(error)}`
  );
};

export const handleRouteError = (
  errorStr: string,
  errorCode: number,
  error?: unknown
): Record<"error" | "status", string | number> => {
  loggerService.error(errorStr, error as Error);
  return {
    error: `${errorStr}: ${error instanceof Error ? error : String(error)}`,
    status: errorCode,
  };
};
