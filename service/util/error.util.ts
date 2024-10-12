import { loggerService } from "./logger.util";

export const handleError = (error: unknown, errorStr: string) => {
  loggerService.error(errorStr, error as Error);
  return new Error(
    `${errorStr}: ${error instanceof Error ? error.message : String(error)}`
  );
};
