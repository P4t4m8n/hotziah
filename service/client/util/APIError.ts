export class APIError extends Error {
  status: number;
  response: unknown;

  constructor(message: string, status: number, response: unknown) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.response = response;
  }
}
