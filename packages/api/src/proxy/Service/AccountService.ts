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
    pushAccount: "pushAccount",
    removeAccount: "removeAccount",
    pushAccountAffiliation: "pushAccountAffiliation",
    deleteAccountAffiliation: "deleteAccountAffiliation",
    getOrCreateAccountForPurchaser: "getOrCreateAccountForPurchaser"
  }
}

export default ApiMethodFactory(config)
