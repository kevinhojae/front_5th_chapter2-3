const networkErrorCode = ["network_error"] as const
const apiErrorCode = ["internal_server_error"] as const
const clientErrorCode = ["bad_request", "not_found"] as const
type ErrorCode = (typeof networkErrorCode)[number] | (typeof apiErrorCode)[number] | (typeof clientErrorCode)[number]

const errorCodeToHttpStatus = {
  network_error: 503,
  internal_server_error: 500,
  bad_request: 400,
  not_found: 404,
}

const httpStatusToErrorCode = Object.fromEntries(
  Object.entries(errorCodeToHttpStatus).map(([code, status]) => [status, code]),
) as Record<number, ErrorCode>

export class CustomError extends Error {
  public readonly code: ErrorCode
  public readonly body?: unknown

  constructor({ message, body, status }: { message: string; status: number; body?: unknown }) {
    super(message)
    this.code = httpStatusToErrorCode[status]
    this.body = body
  }
}

export class ApiError extends CustomError {
  constructor({ message, body, status }: { message: string; status: number; body?: unknown }) {
    super({ message: message || "서버 오류가 발생했습니다", body, status })
  }
}

export class NetworkError extends CustomError {
  constructor({ message, body, status }: { message: string; body?: unknown; status: number }) {
    super({ message: message || "네트워크 오류가 발생했습니다", body, status })
  }
}

export class ClientError extends CustomError {
  constructor({ message, body, status }: { message: string; body?: unknown; status: number }) {
    super({ message: message || "요청 처리 중 문제가 발생했습니다.", body, status })
  }
}

export const handleErrorResponse = (response: Response) => {
  const { status, statusText, body } = response

  if (status in networkErrorCode) {
    return new NetworkError({ message: statusText, status, body })
  }

  if (status in apiErrorCode) {
    return new ApiError({ message: statusText, status, body })
  }

  if (status in clientErrorCode) {
    return new ClientError({ message: statusText, status, body })
  }

  return new CustomError({ message: statusText, status, body })
}
