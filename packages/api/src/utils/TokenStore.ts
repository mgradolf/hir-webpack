// interface Tokens {
//   access_token: string
//   refresh_token: string
// }

export function setTokens(token: string): void {
  localStorage.setItem("access_token", token)
  // localStorage.setItem("refresh_token", tokens.refresh_token)
}

export function getToken(): string | null {
  return localStorage.getItem("access_token")
}

// export function getRefreshToken(): string | null {
//   return localStorage.getItem("refresh_token")
// }

export function removeTokens(): void {
  localStorage.removeItem("access_token")
  // localStorage.removeItem("refresh_token")
}
