import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "BatchImportService",
  Module: "hir",
  Actions: {
    getBatchTypes: "getBatchTypes",
    getStateTypes: "getStateTypes"
  }
}

export default ApiMethodFactory(config)
