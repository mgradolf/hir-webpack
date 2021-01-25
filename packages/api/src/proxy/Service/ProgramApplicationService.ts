import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "programApplicationService",
  Module: "hir",
  Actions: {
    changeApplicationStatusWithEvent: "changeApplicationStatusWithEvent"
  }
}

export default ApiMethodFactory(config)
