type ApiErrorType =
  | "INFO"
  | "SECURITY"
  | "AVAILABILITY"
  | "CONNECTIVITY"
  | "PERSISTENCE"
  | "SYSTEM"
  | "BIZ_RULE"
  | undefined

interface IContext {
  name?: string
  Service?: string
  type?: string
  Module?: string
  MessageKeys?: string[]
}

interface IApiError {
  Context?: IContext
  Type?: ApiErrorType
  Description: string
}

export interface ISimplifiedApiErrorMessage {
  code?: number
  isGloabal?: boolean
  propertyName?: string
  message: string
}

export interface IProcessedApiError {
  error: Array<IApiError> | IApiError
  httpStatusCode: number
  getErrorMessages: () => Array<ISimplifiedApiErrorMessage>
}

export default class ProcessedApiError implements IProcessedApiError {
  error: Array<IApiError> | IApiError
  httpStatusCode: number

  constructor(error: Array<IApiError> | IApiError, httpStatusCode: number) {
    this.error = error
    this.httpStatusCode = httpStatusCode
  }

  getErrorMessages(): Array<ISimplifiedApiErrorMessage> {
    const errorMessages: Array<ISimplifiedApiErrorMessage> = []

    if (Array.isArray(this.error)) {
      this.error.forEach((err) => {
        const processedError = this._processErrorByType(err, this.httpStatusCode)
        if (processedError) errorMessages.push(processedError)
      })
    } else {
      const processedError = this._processErrorByType(this.error, this.httpStatusCode)
      if (processedError) errorMessages.push(processedError)
    }
    return errorMessages
  }

  _processErrorByType(error: IApiError, httpStatusCode: number): ISimplifiedApiErrorMessage | undefined {
    let simplifiedError: ISimplifiedApiErrorMessage | undefined

    if (error && error.Type) {
      switch (error.Type) {
        case "INFO":
          simplifiedError = this._processInfo(error)
          break
        case "SECURITY":
          simplifiedError = this._processSecurity(error)
          break
        case "AVAILABILITY":
          simplifiedError = this._processAvailability(error)
          break
        case "CONNECTIVITY":
          simplifiedError = this._processConnectivity(error)
          break
        case "PERSISTENCE":
          simplifiedError = this._processPersistence(error)
          break
        case "SYSTEM":
          console.log("SYSTEM ", error)
          simplifiedError = this._processSystem(error)
          console.log("simplifiedError ", simplifiedError)
          break
        case "BIZ_RULE":
          simplifiedError = this._processBizrule(error)
          break
        default:
          simplifiedError = { message: error.Description }
          break
      }
    }
    if (!error || !error.Type || !simplifiedError || !simplifiedError.message) {
      simplifiedError = this._processErrorByCode(error, httpStatusCode)
    }
    return simplifiedError
  }

  retireveErrorText(error: IApiError, defaultMessage: string): string {
    if (error && error.Description) {
      return error.Description
    } else if (error && typeof error === "string") {
      return error
    }
    return defaultMessage
  }

  _processErrorByCode(error: IApiError, httpStatusCode: number): ISimplifiedApiErrorMessage | undefined {
    switch (httpStatusCode) {
      case 401:
        return { message: this.retireveErrorText(error, "UnAuthorized"), isGloabal: true, code: 401 }
      case 403:
        return { message: this.retireveErrorText(error, "Forbidden"), isGloabal: true }
      case 404:
        return { message: this.retireveErrorText(error, "Resource not found"), isGloabal: true }
      case 500:
        return { message: this.retireveErrorText(error, "Internal Server Error"), isGloabal: true }
      case 502:
        return { message: this.retireveErrorText(error, "Bad Gateway"), isGloabal: true }
      case 503:
        return { message: this.retireveErrorText(error, "Service Unavailable"), isGloabal: true }
      case 504:
        return { message: this.retireveErrorText(error, "Gateway Timeout"), isGloabal: true }
      default:
        return undefined
    }
  }

  _processInfo(error: IApiError): ISimplifiedApiErrorMessage | undefined {
    return error.Description ? { message: error.Description } : undefined
  }
  _processSecurity(error: IApiError): ISimplifiedApiErrorMessage | undefined {
    throw new Error("Not Implemented")
  }
  _processAvailability(error: IApiError): ISimplifiedApiErrorMessage | undefined {
    throw new Error("Not Implemented")
  }
  _processConnectivity(error: IApiError): ISimplifiedApiErrorMessage | undefined {
    throw new Error("Not Implemented")
  }
  _processPersistence(error: IApiError): ISimplifiedApiErrorMessage | undefined {
    throw new Error("Not Implemented")
  }
  _processSystem(error: IApiError): ISimplifiedApiErrorMessage | undefined {
    if (error.Context && Array.isArray(error.Context.MessageKeys)) {
      return { message: error.Context.MessageKeys.map((x) => `- ${x} \n`).toString() }
    } else if (error.Description) {
      let msg = error.Description
      if (msg.includes("net.jenzabar.util.ReasonException: ")) {
        msg = msg.replace("net.jenzabar.util.ReasonException: ", "")
      }
      return { message: msg }
    }
    return undefined
  }
  _processBizrule(error: IApiError): ISimplifiedApiErrorMessage | undefined {
    if (error.Context && error.Context.name && error.Description) {
      return { propertyName: error.Context.name, message: `${error.Context.name} is ${error.Description}` }
    }
    return undefined
  }
}
