import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "accountService",
  Module: "hir",
  Actions: {
    getAccountAffiliation: "getAccountAffiliation",
    getAccountByPurchaserID: "getAccountByPurchaserID",
    saveAccountAffiliation: "saveAccountAffiliation"
  }
}

export default ApiMethodFactory(config)
