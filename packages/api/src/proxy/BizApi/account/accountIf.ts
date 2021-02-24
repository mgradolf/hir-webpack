import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.account.AccountIF",
  Module: "hir",
  Actions: {
    findAccountForLookUp: "findAccountForLookUp",
    findAccountAffiliation: "findAccountAffiliation",
    findAccount: "findAccount",
    getQuestionAnswers: "getQuestionAnswers",
    getAffiliationRoleTypes: "getAffiliationRoleTypes",
    getTaggedQuestionsByAffiliationRoleType: "getTaggedQuestionsByAffiliationRoleType",
    createorUpdateMultipleAccountEmail: "createorUpdateMultipleAccountEmail"
  }
}

export default ApiMethodFactory(config)
