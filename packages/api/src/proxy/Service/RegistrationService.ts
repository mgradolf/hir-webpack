import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "registrationService",
  Module: "hir",
  Actions: {
    findRegistrations: "findRegistrations",
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
    issueCertificate: "issueCertificate"
  }
}
export default ApiMethodFactory(config)
