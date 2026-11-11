// Shared HTTP helper. Every resource file in src/api/ goes through here,
// so switching from json-server to the real API (weeks 6–7) only means
// changing VITE_API_URL.

export const BASE_URL: string = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type Query = Record<string, string | number | boolean | undefined>

function buildUrl(path: string, query?: Query): string {
  const url = new URL(path, BASE_URL)
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== '') url.searchParams.set(key, String(value))
    }
  }
  return url.toString()
}

export async function http<T>(
  path: string,
  options: RequestInit & { query?: Query } = {},
): Promise<T> {
  const { query, headers, ...init } = options
  let response: Response

  try {
    response = await fetch(buildUrl(path, query), {
      ...init,
      headers: { 'Content-Type': 'application/json', ...headers },
    })
  } catch {
    // fetch only rejects on network failure (server down, CORS, offline)
    throw new ApiError('Cannot reach the server. Is `npm run api` running?', 0)
  }

  if (!response.ok) {
    const message =
      response.status === 404 ? 'The requested record was not found.' : `Request failed (${response.status}).`
    throw new ApiError(message, response.status)
  }

  // 204 No Content / empty DELETE bodies
  const text = await response.text()
  return (text ? JSON.parse(text) : undefined) as T
}

export const api = {
  get: <T>(path: string, query?: Query) => http<T>(path, { method: 'GET', query }),
  post: <T>(path: string, body: unknown) => http<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => http<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) => http<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T = void>(path: string) => http<T>(path, { method: 'DELETE' }),
}

/** Turns any thrown value into a message a page can show. */
export function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return 'Something went wrong. Please try again.'
}

