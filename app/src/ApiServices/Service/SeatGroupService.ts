import SeatGroupService, { config } from "@packages/api/lib/proxy/Service/SeatGroupService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getSeatGroups(SectionID: number): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.getSeatGroups]({
    SectionID
  })
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

export function findAvailableAffiliatedOrgs(SeatGroupID: number): Promise<IApiResponse> {
  return SeatGroupService[config.Actions.findAvailableAffiliatedOrgs]({
    SeatGroupID
  })
}
