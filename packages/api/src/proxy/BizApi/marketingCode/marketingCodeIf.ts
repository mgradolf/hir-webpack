import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.marketingcode.MarketingCodeIF",
  Module: "hir",
  Actions: {
    getMarketingCodeRelatedTagTypes: "getMarketingCodeRelatedTagTypes"
  }
}

export default ApiMethodFactory(config)
