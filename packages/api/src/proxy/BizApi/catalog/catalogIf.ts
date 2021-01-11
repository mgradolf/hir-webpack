import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.catalog.CatalogIF",
  Module: "hir",
  Actions: {
    findCatalogs: "findCatalogs",
    updateBulkContent: "updateBulkContent",
    searchCatalog: "searchCatalog",
    getWebCatalogOfferings: "getWebCatalogOfferings",
    getWebCatalogSections: "getWebCatalogSections",
    getWebCatalogPrograms: "getWebCatalogPrograms"
  }
}

export default ApiMethodFactory(config)
