export function convertToFormData(data: Record<string, unknown>): string {
  return JSON.stringify(data)
}
