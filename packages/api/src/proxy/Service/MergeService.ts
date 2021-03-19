import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "MergeService",
  Module: "hir",
  Actions: {
    analyze: "analyze",
    analyzeAccount: "analyzeAccount",
    merge: "merge",
    mergeAccount: "mergeAccount"
  }
}

export default ApiMethodFactory(config)
