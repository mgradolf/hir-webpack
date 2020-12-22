import ApiMethodFactory, { Iconfig } from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.financial.FinancialsIF",
  Module: "hir",
  Actions: {
    getSectionFinancialMaps: "getSectionFinancialMaps",
    getSectionFinancialDefaultMaps: "getSectionFinancialDefaultMaps",
    getFinancialsByTarget: "getFinancialsByTarget"
  }
}

export default ApiMethodFactory(config)
