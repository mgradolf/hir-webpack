import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.query.CustomQueryIF",
  Module: "hir",
  Actions: {
    findQueryList: "findQueryList",
    getParamList: "getParamList",
    getResultList: "getResultList",
    findQueryResult: "findQueryResult"
  }
}

export default ApiMethodFactory(config)
