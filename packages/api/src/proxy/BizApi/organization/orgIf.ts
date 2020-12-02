import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.org.OrgIF",
  Module: "hir",
  Actions: {
    getOrganizationByType: "getOrganizationByType"
  }
}

export default ApiMethodFactory(config)
