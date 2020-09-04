import { IApiResponse, IProcessedError } from "../Interfaces"

export default function (response: IApiResponse): IApiResponse {
  const processedError = [] as Array<IProcessedError>
  if (response.error && Array.isArray(response.error)) {
    response.error.forEach((err) => {
      if (err.Type && err.Type === "SYSTEM" && err.Description && typeof err.Description === "string") {
        processedError.push({ message: err.Description })
      } else if (err.Type && err.Type === "BIZ_RULE" && err.Description && err.Description === "required") {
        processedError.push({
          propertyName: err?.Context?.name,
          message: `${err?.Context?.name} is ${err.Description}`
        })
      }
    })
  }

  response.error = processedError.length ? processedError : response.error
  return response
}
