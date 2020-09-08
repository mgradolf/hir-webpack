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
}

interface IApiError {
  Context?: IContext
  Type?: ApiErrorType
  Description: string
}

export interface ISimplifiedApiErrorMessage {
  propertyName?: string
  message: string
}

export interface IProcessedApiError {
  data: Array<IApiError> | IApiError
  getErrorMessages: () => Array<ISimplifiedApiErrorMessage>
}

export default class ProcessedApiError implements IProcessedApiError {
  data: Array<IApiError> | IApiError
  constructor(param: Array<IApiError> | IApiError) {
    this.data = param
    console.log("error: ", param)
  }

  getErrorMessages(): Array<ISimplifiedApiErrorMessage> {
    const errorMessages: Array<ISimplifiedApiErrorMessage> = []
    if (Array.isArray(this.data)) {
      this.data.forEach((error) => {
        const processedError = this._processError(error)
        if (processedError) errorMessages.push(processedError)
      })
    } else {
      const processedError = this._processError(this.data)
      if (processedError) errorMessages.push(processedError)
    }
    return errorMessages
  }

  _processError(error: IApiError): ISimplifiedApiErrorMessage | undefined {
    switch (error.Type) {
      case "INFO":
        return this._processInfo(error)
      case "SECURITY":
        return this._processSecurity(error)
      case "AVAILABILITY":
        return this._processAvailability(error)
      case "CONNECTIVITY":
        return this._processConnectivity(error)
      case "PERSISTENCE":
        return this._processPersistence(error)
      case "SYSTEM":
        return this._processSystem(error)
      case "BIZ_RULE":
        return this._processBizrule(error)
      default:
        return { message: error.Description }
    }
  }

  _processInfo(error: IApiError): ISimplifiedApiErrorMessage | undefined {
    throw new Error("Not Implemented")
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
    return error.Description ? { message: error.Description } : undefined
  }
  _processBizrule(error: IApiError): ISimplifiedApiErrorMessage | undefined {
    if (error.Context && error.Context.name && error.Description) {
      return { propertyName: error.Context.name, message: error.Description }
    }
    return undefined
  }
}
