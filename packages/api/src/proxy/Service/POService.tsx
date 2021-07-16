import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "purchaseOrderService",
  Module: "hir",
  Actions: {
    createOrUpdatePurchaseOrder: "createOrUpdatePurchaseOrder",
    receivePurchaseOrder: "receivePurchaseOrder",
    removePurchaseOrder: "removePurchaseOrder",
    findPurchaseOrders: "findPurchaseOrders"
  }
}
export default ApiMethodFactory(config)
