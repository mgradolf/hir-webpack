import getActions from "../../utils/CallServiceApi"

export const config = {
  Service: "OfferingService",
  Module: "hir",
  Actions: {
    createOffering: "createOffering",
    updateOffering: "updateOffering",
    searchOffering: "searchOffering",
    addOrRemoveOfferingToCatalog: "addOrRemoveOfferingToCatalog",
    createOfferingFinancial: "createOfferingFinancial",
    updateOfferingFinancial: "updateOfferingFinancial",
    searchOfferingFinancial: "searchOfferingFinancial"
  }
}

export default getActions(config)
