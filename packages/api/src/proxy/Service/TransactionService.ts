import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "transactionService",
  Module: "hir",
  Actions: {
    getBaseTransactionTypes: "getBaseTransactionTypes",
    getTransactionTypes: "getTransactionTypes",
    searchTransactions: "searchTransactions"
  }
}

export default ApiMethodFactory(config)
