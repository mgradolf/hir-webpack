import SeatGroupService, { config } from "@packages/api/lib/proxy/Service/SeatGroupService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function addAccount(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.addAccount](Params, Headers)
}
export function removeAccount(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.removeAccount](Params, Headers)
}

export function addFinancial(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.addFinancial](Params, Headers)
}
export function removeFinancial(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.removeFinancial](Params, Headers)
}

export function attachProgram(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.attachProgram](Params, Headers)
}

export function detachProgram(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.detachProgram](Params, Headers)
}

export function findSeatGroups(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.findSeatGroups](Params, Headers)
}

export function getSeatGroupDetails(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.getSeatGroupDetails](Params, Headers)
}

export function getSeatGroups(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.getSeatGroups](Params, Headers)
}

export function createSeatGroup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.createSeatGroup](Params, Headers)
}

export function updateSeatGroup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.updateSeatGroup](Params, Headers)
}

export function removeSeatGroup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.removeSeatGroup](Params, Headers)
}

export function saveAffiliatedOrg(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.saveAffiliatedOrg](Params, Headers)
}

export function findAffiliatedOrgsForSeatGroup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.findAffiliatedOrgsForSeatGroup](Params, Headers)
}

export function findAvailableAffiliatedOrgs(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.findAvailableAffiliatedOrgs](Params, Headers)
}
