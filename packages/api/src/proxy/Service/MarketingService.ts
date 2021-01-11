import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "marketingService",
  Module: "hir",
  Actions: {
    searchMarketingCodes: "searchMarketingCodes",
    searchMarketingCodeResponses: "searchMarketingCodeResponses",
    getMarketingCategory: "getMarketingCategory"
  }
}

export default ApiMethodFactory(config)
