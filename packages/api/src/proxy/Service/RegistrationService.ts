import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "registrationService",
  Module: "hir",
  Actions: {
    findRegistrations: "findRegistrations",
    findRegistrationsWebAdmin: "findRegistrationsWebAdmin",
    findRegistrationDetail: "findRegistrationDetail",
    getCreditMemoData: "getCreditMemoData",
    findGradeScoreDefinition: "findGradeScoreDefinition",
    dropWithdrawRegistration: "dropWithdrawRegistration",
    dropOrWithdrawRegistration: "dropOrWithdrawRegistration",
    deleteRegistration: "deleteRegistration",
    editRegistration: "editRegistration",
    getGradeDefinitionDetails: "getGradeDefinitionDetails",
    saveFinalGrade: "saveFinalGrade",
    searchNoShowProcessings: "searchNoShowProcessings",
    bulkDropRegistration: "bulkDropRegistration",
    bulkDeleteRegistration: "bulkDeleteRegistration",
    validateRegistration: "validateRegistration",
    checkCertificate: "checkCertificate",
    issueCertificate: "issueCertificate",
    searchCertificate: "searchCertificate",
    previewCertificate: "previewCertificate"
  }
}
export default ApiMethodFactory(config)
