import SeactionService, { config } from "@packages/api/lib/proxy/Service/SectionService"

export function findAffiliatedOrgsForSeatGroup(SeatGroupID: number): Promise<[any, any]> {
  return SeactionService[config.Actions.findAffiliatedOrgsForSeatGroup]({
    SeatGroupID
  })
}

export function saveAffiliatedOrg(SeatGroupID: number, AffiliateAccountIDs: number): Promise<[any, any]> {
  return SeactionService[config.Actions.saveAffiliatedOrg]({
    SeatGroupID,
    AffiliateAccountIDs
  })
}
