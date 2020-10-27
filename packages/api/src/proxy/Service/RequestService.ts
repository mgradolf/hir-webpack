import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "requestService",
  Module: "hir",
  Actions: {
    getLiteRequests: "getLiteRequests",
    readRequestForStaff: "readRequestForStaff",
    getEnumValues: "getEnumValues"
  }
}

export default ApiMethodFactory(config)
