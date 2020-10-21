import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "requestActivityService",
  Module: "hir",
  Actions: {
    bulkUpdate: "bulkUpdate",
    extendExpirationDate: "extendExpirationDate",
    makeExternalPayment: "makeExternalPayment",
    findPublishedAndActiveQuestionsWithOptions: "findPublishedAndActiveQuestionsWithOptions"
  }
}

export default ApiMethodFactory(config)
