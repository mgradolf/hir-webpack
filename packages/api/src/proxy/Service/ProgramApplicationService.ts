import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "programApplicationService",
  Module: "hir",
  Actions: {
    attachDocument: "attachDocument",
    changeApplicationStatusWithEvent: "changeApplicationStatusWithEvent"
  }
}

export default ApiMethodFactory(config)
