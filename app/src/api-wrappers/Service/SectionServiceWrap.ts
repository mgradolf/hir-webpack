import {
  findAffiliatedOrgsForSeatGroup,
  saveAffiliatedOrg
} from '@packages/api/lib/proxy/Service/SectionService'
/* -------------------------------------------------------------------------- */
/*                        affiliated orgs for seatgroup                       */
/* -------------------------------------------------------------------------- */

export function findAffiliatedOrgsForSeatGroupWrap(
  SeatGroupID: number
): Promise<[any, any]> {
  return findAffiliatedOrgsForSeatGroup({ SeatGroupID })
}

export function saveAffiliatedOrgWrap(
  SeatGroupID: number,
  AffiliateAccountIDs: number
): Promise<[any, any]> {
  return saveAffiliatedOrg({ SeatGroupID, AffiliateAccountIDs })
}
