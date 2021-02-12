import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "budgetAnalysisService",
  Module: "hir",
  Actions: {
    analyzeSections: "analyzeSections"
  }
}

export default ApiMethodFactory(config)
