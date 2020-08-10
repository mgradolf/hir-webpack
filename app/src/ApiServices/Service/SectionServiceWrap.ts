import SeactionService, { config } from "@packages/api/lib/proxy/Service/SectionService"

export function findAffiliatedOrgsForSeatGroupWrap(SeatGroupID: number): Promise<[any, any]> {
  return SeactionService[config.Actions.findAffiliatedOrgsForSeatGroup]({
    SeatGroupID
  })
}

export function saveAffiliatedOrgWrap(SeatGroupID: number, AffiliateAccountIDs: number): Promise<[any, any]> {
  return SeactionService[config.Actions.saveAffiliatedOrg]({
    SeatGroupID,
    AffiliateAccountIDs
  })
}
