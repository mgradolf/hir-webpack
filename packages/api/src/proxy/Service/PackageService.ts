import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "packageService",
  Module: "hir",
  Actions: {
    findPackages: "findPackages"
  }
}

export default ApiMethodFactory(config)
