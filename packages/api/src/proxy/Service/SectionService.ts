import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "SectionService",
  Module: "hir",
  Actions: {
    findAffiliatedOrgsForSeatGroup: "findAffiliatedOrgsForSeatGroup",
    getPaymentGatewayAccount: "getPaymentGatewayAccount",
    getSeatGroupsBySection: "getSeatGroupsBySection",
    getCoordinator: "getCoordinator",
    updateSection: "updateSection",
    saveAffiliatedOrg: "saveAffiliatedOrg",
    updateSectionNotification: "updateSectionNotification",
    SectionNoticeID: "SectionNoticeID",
    findSectionNoticeRecipients: "findSectionNoticeRecipients",
    updateSectionFinancialMaps: "updateSectionFinancialMaps",
    copySection: "copySection",
    getMeetings: "getMeetings",
    createMeetings: "createMeetings",
    saveMeetings: "saveMeetings"
  }
}

export default ApiMethodFactory(config)
