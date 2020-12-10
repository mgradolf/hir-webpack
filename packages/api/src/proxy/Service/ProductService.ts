import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "productService",
  Module: "hir",
  Actions: {
    searchProducts: "searchProducts",
    getProductFinancials: "getProductFinancials"
  }
}

export default ApiMethodFactory(config)
