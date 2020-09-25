import ApiMethodFactory, { Iconfig } from "../../utils/ApiMethodFactory"

export const config: Iconfig = {
  EndPoint: "api/hirServlet",
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
    updateSectionFinancialMaps: "updateSectionFinancialMaps",
    getMeetings: "getMeetings",
    createMeetings: "createMeetings",
    saveMeetings: "saveMeetings"
  }
}

export default ApiMethodFactory(config)
