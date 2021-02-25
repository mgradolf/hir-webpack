import HRUserService, { config } from "@packages/api/lib/proxy/Service/HRUserService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getAllUsers(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return HRUserService[config.Actions.getAllUsers](Params, Headers)
}

export function getLoggedInUser(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return HRUserService[config.Actions.getLoggedInUser](Params, Headers)
}

export function getUsersByID(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return HRUserService[config.Actions.getUserByUserID](Params, Headers)
}

export function getUsersByRole(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return HRUserService[config.Actions.getUsersByRole](Params, Headers)
}

export function getUserByUserLogin(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return HRUserService[config.Actions.getUserByUserLogin](Params, Headers)
}

export interface IApiPermissions {
  [key: string]: { [subKey: string]: boolean }
}

interface IApiPermission {
  Service: string
  Actions: string[]
}

let cachedPermission: any
function _loadCachedUserPermission(): Promise<IApiResponse> {
  return Promise.resolve({
    code: 200,
    data: cachedPermission,
    error: false,
    success: true
  })
}

function _loadFreshUserPermission(): Promise<IApiResponse> {
  return Promise.resolve({
    code: 200,
    data: [
      {
        Service: "OfferingService",
        Actions: [
          "createOffering",
          "updateOffering",
          // "searchOffering",
          "addOrRemoveOfferingToCatalog",
          "createOfferingFinancial",
          "updateOfferingFinancial",
          "searchOfferingFinancial",
          "getOfferngApprovalHist",
          "setApprovalStatus",
          "getOfferngApprovalStateList",
          "getOfferingApprovalSendToList",
          "getRequisiteOfferingGroup",
          "getGroupOfferings",
          "createRequisiteOfferingGroup",
          "updateRequisiteOfferingGroup",
          "getQualifiedInstructors",
          "updateInstructors",
          "createSection"
        ]
      }
    ],
    error: false,
    success: true
  })
}

export function loadUserPermission(disableCache?: true): Promise<IApiResponse> {
  const promise = !disableCache && cachedPermission ? _loadCachedUserPermission() : _loadFreshUserPermission()
  return promise.then((x) => {
    const dataObject: { [key: string]: any } = {}
    if (x.success && Array.isArray(x.data)) {
      x.data.forEach((service: IApiPermission) => {
        const __: { [key: string]: any } = {}
        service.Actions.forEach((action) => {
          __[action] = true
        })
        dataObject[service.Service] = __
      })
    }
    cachedPermission = dataObject
    return { ...x, data: dataObject }
  })
}
