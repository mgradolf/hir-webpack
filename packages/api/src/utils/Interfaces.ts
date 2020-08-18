export interface ApiConfig {
  baseURL?: undefined | string
  url?: string
  method?: string
  headers?: any
  params?: any
  data?: any
}

export enum ErrorType {
  GLOBAL,
  CUSTOM
}

export interface IApiResponse {
  code: number | undefined
  data: any
  error: any
  success: boolean
  type?: ErrorType
  errorMessage?: string
}
