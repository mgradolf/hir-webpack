import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "catalogService",
  Module: "hir",
  Actions: {
    searchCatalogs: "searchCatalogs"
  }
}

export default ApiMethodFactory(config)
