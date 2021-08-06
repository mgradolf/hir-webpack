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
export function applyPromoCodes(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CartService[config.Actions.applyPromoCodes](Params, Headers)
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

export function createProgramEnrollmentRequest(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CartService[config.Actions.createProgramEnrollmentRequest](Params, Headers)
}

export function createProductRequest(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CartService[config.Actions.createProductRequest](Params, Headers)
}

export function validateProductRequest(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CartService[config.Actions.validateProductRequest](Params, Headers)
}

export function createMembershipRequest(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CartService[config.Actions.createMembershipRequest](Params, Headers)
}

export function getCheckoutInfo(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CartService[config.Actions.getCheckoutInfo](Params, Headers)
}
