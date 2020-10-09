import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "requestService",
  Module: "hir",
  Actions: {
    getLiteRequests: "getLiteRequests",
    readRequestForStaff: "readRequestForStaff"
  }
}

export default ApiMethodFactory(config)
