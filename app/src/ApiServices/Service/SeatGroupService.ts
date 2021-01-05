import SeatGroupService, { config } from "@packages/api/lib/proxy/Service/SeatGroupService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function addAccount(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.addAccount](Params)
}
export function removeAccount(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.removeAccount](Params)
}

export function attachProgram(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.attachProgram](Params)
}

export function detachProgram(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.detachProgram](Params)
}

export function findSeatGroups(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.findSeatGroups](Params)
}

export function getSeatGroupDetails(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.getSeatGroupDetails](Params)
}

export function getSeatGroups(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.getSeatGroups](Params)
}

export function createSeatGroup(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.createSeatGroup](Params)
}

export function updateSeatGroup(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.updateSeatGroup](Params)
}

export function removeSeatGroup(SeatGroupID: number): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.removeSeatGroup]({
    SeatGroupID
  })
}

export function saveAffiliatedOrg(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.saveAffiliatedOrg](Params)
}

export function findAffiliatedOrgsForSeatGroup(SeatGroupID: number): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.findAffiliatedOrgsForSeatGroup]({
    SeatGroupID
  })
}

export function findAvailableAffiliatedOrgs(Params: { [key: string]: any }): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.findAvailableAffiliatedOrgs](Params)
}
