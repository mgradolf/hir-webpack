import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "RefLookupService",
  Module: "hir",
  Actions: {
    getList: "getList"
  }
}
export default ApiMethodFactory(config)
