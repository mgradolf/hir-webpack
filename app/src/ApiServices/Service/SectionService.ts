import SeactionService, { config } from "@packages/api/lib/proxy/Service/SectionService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function findAffiliatedOrgsForSeatGroup(SeatGroupID: number): Promise<IApiResponse> {
  return SeactionService[config.Actions.findAffiliatedOrgsForSeatGroup]({
    SeatGroupID
  })
}

export function saveAffiliatedOrg(SeatGroupID: number, AffiliateAccountIDs: number): Promise<IApiResponse> {
  return SeactionService[config.Actions.saveAffiliatedOrg]({
    SeatGroupID,
    AffiliateAccountIDs
  })
}

export function updateSection(Params: { [key: string]: any }) {
  return SeactionService[config.Actions.updateSection](Params)
}
