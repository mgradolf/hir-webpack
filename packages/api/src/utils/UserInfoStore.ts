export function setUsername(username: string): void {
  localStorage.setItem("username", username)
}

export function getUsername(): string | null {
  return localStorage.getItem("username")
}

export function removeUsername(): void {
  localStorage.removeItem("username")
}
