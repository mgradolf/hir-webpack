import getActions from "../../utils/CallServiceApi"

export const config = {
  Service: "SectionService",
  Module: "hir",
  Actions: {
    findAffiliatedOrgsForSeatGroup: "findAffiliatedOrgsForSeatGroup",
    getPaymentGatewayAccount: "getPaymentGatewayAccount",
    getSeatGroupsBySection: "getSeatGroupsBySection",
    getCoordinator: "getCoordinator",
    updateSectionDetails: "updateSectionDetails",
    saveAffiliatedOrg: "saveAffiliatedOrg",
    updateSectionNotification: "updateSectionNotification",
    SectionNoticeID: "SectionNoticeID",
    findSectionNoticeRecipients: "findSectionNoticeRecipients",
    updateSectionFinancialMaps: "updateSectionFinancialMaps"
  }
}

export default getActions(config)
