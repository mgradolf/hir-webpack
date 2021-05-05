import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.financial.server.bizapi.cashaccount.AccountIF",
  Module: "hir",
  Actions: {
    getDepositList: "getDepositList"
  }
}

export default ApiMethodFactory(config)
