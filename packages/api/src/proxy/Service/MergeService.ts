import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "MergeService",
  Module: "hir",
  Actions: {
    analyze: "analyze",
    merge: "merge"
  }
}

export default ApiMethodFactory(config)
