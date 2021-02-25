import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.person.AddressBookIF",
  Module: "hir",
  Actions: {
    findDefaultCountry: "findDefaultCountry"
  }
}

export default ApiMethodFactory(config)
