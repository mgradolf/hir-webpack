export interface ApiConfig {
  url?: string
  method?: string
  headers?: any
  params?: any
  data?: any
}

export enum ErrorType {
  'GLOBAL',
  'CUSTOM'
}

export interface ErrorSchema {
  status: number | undefined
  type?: ErrorType
  error: any
  data: any
}
