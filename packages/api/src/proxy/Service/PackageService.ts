import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "packageService",
  Module: "hir",
  Actions: {
    findPackages: "findPackages",
    savePackage: "savePackage",
    addPackageFinancial: "addPackageFinancial",
    removePackageFinancial: "removePackageFinancial",
    submitBulkOrder: "submitBulkOrder",
    addSection: "addSection",
    updateSection: "updateSection",
    removeSection: "removeSection"
  }
}

export default ApiMethodFactory(config)
