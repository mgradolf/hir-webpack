import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "FinancialService",
  Module: "hir",
  Actions: {
    createFinancial: "createFinancial",
    updateFinancial: "updateFinancial",
    deleteFinancial: "deleteFinancial",
    searchFinancials: "searchFinancials",
    searchResourceItem: "searchResourceItem",
    searchMarketingProgram: "searchMarketingProgram",
    searchDiscountProgram: "searchDiscountProgram"
  }
}

export default ApiMethodFactory(config)
