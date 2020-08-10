import ApiMethodFactory, { Iconfig } from "../../../utils/ApiMethodFactory"

export const config: Iconfig = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.catalog.CatalogIF",
  Module: "hir",
  Actions: {
    findCatalogs: "findCatalogs"
  }
}

export default ApiMethodFactory(config)
