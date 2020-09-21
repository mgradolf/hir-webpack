import ApiMethodFactory, { Iconfig } from "../../utils/ApiMethodFactory"

export const config: Iconfig = {
  EndPoint: "api/hirServlet",
  Service: "SeatGroupService",
  Module: "hir",
  Actions: {
    getSeatGroups: "getSeatGroups",
    createSeatGroup: "createSeatGroup",
    updateSeatGroup: "updateSeatGroup",
    removeSeatGroup: "removeSeatGroup",
    saveAffiliatedOrg: "saveAffiliatedOrg",
    findAffiliatedOrgsForSeatGroup: "findAffiliatedOrgsForSeatGroup",
    findAvailableAffiliatedOrgs: "findAvailableAffiliatedOrgs"
  }
}

export default ApiMethodFactory(config)
