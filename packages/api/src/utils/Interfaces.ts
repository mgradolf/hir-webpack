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
  code: number
  data: any
  error: any
  success: boolean
}
