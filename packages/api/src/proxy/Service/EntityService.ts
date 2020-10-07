import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "EntityService",
  Module: "hir",
  Actions: {
    getEntity: "getEntity",
    removeEntity: "removeEntity"
  }
}

export default ApiMethodFactory(config)
