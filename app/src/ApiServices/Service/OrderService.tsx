import OrderService, { config } from "@packages/api/lib/proxy/Service/OrderService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { getPersonDetails } from "~/ApiServices/Service/PersonService"

export function searchOrders(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return OrderService[config.Actions.searchOrders](Params, Headers)
}

export async function getOrderDetails(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  let result: IApiResponse
  return Promise.all([searchOrders(Params, Headers), OrderService[config.Actions.getOrderDetails](Params, Headers)])
    .then((results) => {
      result = results[1]
      if (result && results[0].success) {
        result.data = { ...result?.data[0], ...results[0].data[0] }
      }
      console.log(result.data)
      return getPersonDetails({ PersonID: result.data.PersonID })
    })
    .then((personResult) => {
      if (personResult.success) {
        result.data = {
          ...result.data,
          Emails: personResult.data[0]?.Emails?.map((x: any) => x.EmailAddress),
          Telephones: personResult.data?.Telephones?.map((x: any) => x.TelephoneNumber)
        }
      }
      console.log(result)
      return result
    })
}

export function getOrderItems(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return OrderService[config.Actions.getOrderItems](Params, Headers)
}

export function getOrderLines(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return OrderService[config.Actions.getOrderLines](Params, Headers)
}

export function getOrderItemsLit(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OrderService[config.Actions.getOrderItemsLit](Params, Headers)
}

export function getPayment(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return OrderService[config.Actions.getPayments](Params, Headers)
}

export function getCredit(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return OrderService[config.Actions.getCredits](Params, Headers)
}

export function getReturnItems(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OrderService[config.Actions.getReturnItems](Params, Headers)
}

export function getPurchaseOrder(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OrderService[config.Actions.getPurchaseOrder](Params, Headers)
}

export function getCreditMemoDataByOrderItemID(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OrderService[config.Actions.getCreditMemoDataByOrderItemID](Params, Headers)
}

export function applyReturnItem(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OrderService[config.Actions.applyReturnItem](Params, Headers)
}

export function applyIssueCredit(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OrderService[config.Actions.applyIssueCredit](Params, Headers)
}

export function getAvailableDiscountByOrderItemID(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OrderService[config.Actions.getAvailableDiscountByOrderItemID](Params, Headers)
}

export function grantDiscountProgram(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OrderService[config.Actions.grantDiscountProgram](Params, Headers)
}

export function getPurchaseOrders(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return OrderService[config.Actions.getPurchaseOrders](Params, Headers)
}
