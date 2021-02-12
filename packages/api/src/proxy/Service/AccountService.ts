import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "accountService",
  Module: "hir",
  Actions: {
    getAccountAffiliation: "getAccountAffiliation",
    getAccountByPurchaserID: "getAccountByPurchaserID",
    saveAccountAffiliation: "saveAccountAffiliation",
    saveAccountRelation: "saveAccountRelation",
    pushAccountAffiliation: "pushAccountAffiliation",
    deleteAccountAffiliation: "deleteAccountAffiliation"
  }
}

export default ApiMethodFactory(config)
