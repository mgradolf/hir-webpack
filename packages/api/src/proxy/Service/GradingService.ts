import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "gradingService",
  Module: "hir",
  Actions: {
    saveCreditType: "saveCreditType",
    findAvailableCreditType: "findAvailableCreditType"
  }
}

export default ApiMethodFactory(config)
