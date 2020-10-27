import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "productService",
  Module: "hir",
  Actions: {
    searchProducts: "searchProducts"
  }
}

export default ApiMethodFactory(config)
