export function setTokens(token: string): void {
  localStorage.setItem("access_token", token)
}

export function getToken(): string | null {
  return localStorage.getItem("access_token")
}

export function removeTokens(): void {
  localStorage.removeItem("access_token")
}
