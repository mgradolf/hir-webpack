import {
  findAffiliatedOrgsForSeatGroup,
  saveAffiliatedOrg
} from '@packages/api/lib/proxy/Service/SectionService'
import callApi from '~/api-wrappers/callApi'
/* -------------------------------------------------------------------------- */
/*                        affiliated orgs for seatgroup                       */
/* -------------------------------------------------------------------------- */

export function findAffiliatedOrgsForSeatGroupWrap(
  SeatGroupID: number
): Promise<[any, any]> {
  return callApi(findAffiliatedOrgsForSeatGroup, { SeatGroupID })
}

export function saveAffiliatedOrgWrap(
  SeatGroupID: number,
  AffiliateAccountIDs: number
): Promise<[any, any]> {
  return callApi(saveAffiliatedOrg, { SeatGroupID, AffiliateAccountIDs })
}
