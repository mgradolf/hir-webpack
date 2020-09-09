import ApiMethodFactory, { Iconfig } from "../../../utils/ApiMethodFactory"

export const config: Iconfig = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.course.RequisiteIF",
  Module: "hir",
  Actions: {
    deleteGroup: "deleteGroup",
    deleteOfferingFromGroup: "deleteOfferingFromGroup",
    addOfferingToGroup: "addOfferingToGroup"
  }
}

export default ApiMethodFactory(config)
