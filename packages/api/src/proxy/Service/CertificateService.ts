import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "certificateService",
  Module: "hir",
  Actions: {
    createOrUpdateCertificate: "createOrUpdateCertificate",
    getStaticParams: "getStaticParams"
  }
}

export default ApiMethodFactory(config)
