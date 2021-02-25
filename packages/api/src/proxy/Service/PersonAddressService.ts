import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const addressConfig = {
  EndPoint: "api/hirServlet",
  Service: "personAddressService",
  Module: "hir",
  Actions: {
    pushPersonAddress: "pushPersonAddress",
    deletePersonAddress: "deletePersonAddress",
    findCountry: "findCountry"
  }
}

export default ApiMethodFactory(addressConfig)
