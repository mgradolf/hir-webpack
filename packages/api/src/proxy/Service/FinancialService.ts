import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "FinancialService",
  Module: "hir",
  Actions: {
    searchDiscountProgram: "searchDiscountProgram"
  }
}

export default ApiMethodFactory(config)
