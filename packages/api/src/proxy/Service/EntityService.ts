import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "EntityService",
  Module: "hir",
  Actions: {
    getEntity: "getEntity"
  }
}

export default ApiMethodFactory(config)
