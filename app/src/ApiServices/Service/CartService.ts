import CartService, { config } from "@packages/api/lib/proxy/Service/CartService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function validateRegistrationRequest(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CartService[config.Actions.validateRegistrationRequest](Params, Headers)
}

export function launchRegistrationRequest(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CartService[config.Actions.launchRegistrationRequest](Params, Headers)
}

export function createRegistrationRequest(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CartService[config.Actions.createRegistrationRequest](Params, Headers)
}

export function createOptionalItemRequest(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CartService[config.Actions.createOptionalItemRequest](Params, Headers)
}
export function createProgramApplicationRequest(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CartService[config.Actions.createProgramApplicationRequest](Params, Headers)
}
export function validateProgramRequest(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CartService[config.Actions.validateProgramRequest](Params, Headers)
}