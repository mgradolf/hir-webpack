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
    saveMeetings: "saveMeetings",
    saveFinancial: "saveFinancial",
    saveFinancials: "saveFinancials",
    getSectionFinancials: "getSectionFinancials",
    saveSectionNotification: "saveSectionNotification",
    getSectionNotifications: "getSectionNotifications",
    saveSectionDiscount: "saveSectionDiscount",
    removeSectionDiscounts: "removeSectionDiscounts",
    getSectionDiscounts: "getSectionDiscounts",
    getAvailableDiscountPrograms: "getAvailableDiscountPrograms",
    getAvailableOfferingFinancials: "getAvailableOfferingFinancials",
    getAvailableFacultyWithFinancials: "getAvailableFacultyWithFinancials",
    getAvailableResourcesWithFinancials: "getAvailableResourcesWithFinancials",
    getAvailableMarketingProgramsWithFinancials: "getAvailableMarketingProgramsWithFinancials",
    removeFinancials: "removeFinancials",
    findRoom: "findRoom",
    saveGeneralComment: "saveGeneralComment",
    saveFacultyComment: "saveFacultyComment",
    saveEnrollmentComment: "saveEnrollmentComment",
    findGeneralCommentHistory: "findGeneralCommentHistory",
    findFacultyComments: "findFacultyComments",
    findEnrollmentCommentHistory: "findEnrollmentCommentHistory"
  }
}

export default ApiMethodFactory(config)
