import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "certificateService",
  Module: "hir",
  Actions: {
    createOrUpdateCertificate: "createOrUpdateCertificate",
    getStaticParams: "getStaticParams",
    previewCertificate: "previewCertificate"
  }
}

export default ApiMethodFactory(config)
