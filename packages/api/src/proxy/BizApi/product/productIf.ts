import ApiMethodFactory, { Iconfig } from "../../../utils/ApiMethodFactory"

export const config: Iconfig = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.vendable.server.bizapi.product.ProductIF",
  Module: "hir",
  Actions: {
    addSectionProduct: "addSectionProduct",
    findSectionProducts: "findSectionProducts",
    deleteSectionProduct: "deleteSectionProduct",
    findProductFinancials: "findProductFinancials",
    findSellerFulfillers: "findSellerFulfillers"
  }
}

export default ApiMethodFactory(config)
