import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "catalogService",
  Module: "hir",
  Actions: {
    searchCatalogs: "searchCatalogs",
    getCatalogContent: "getCatalogContent",
    addSectionToCatalog: "addSectionToCatalog",
    addOfferingToCatalog: "addOfferingToCatalog",
    addProgramToCatalog: "addProgramToCatalog",
    removeSectionFromCatalog: "removeSectionFromCatalog",
    removeOfferingFromCatalog: "removeOfferingFromCatalog",
    removeProgramFromCatalog: "removeProgramFromCatalog",
    swapOfferingsInCatalog: "swapOfferingsInCatalog",
    swapSectionsInCatalog: "swapSectionsInCatalog",
    swapProgramsInCatalog: "swapProgramsInCatalog"
  }
}

export default ApiMethodFactory(config)
