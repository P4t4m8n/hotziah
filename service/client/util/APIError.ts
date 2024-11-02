export class APIError extends Error {
  status: number;
  response: Record<string, unknown>;

  constructor(
    message: string,
    status: number = 500,
    response: Record<string, unknown> = {}
  ) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.response = { message, ...response };
  }

  toResponse() {
    return {
      status: this.status,
      json: this.response,
    };
  }
}
