import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "requestService",
  Module: "hir",
  Actions: {
    getLiteRequests: "getLiteRequests"
  }
}

export default ApiMethodFactory(config)
