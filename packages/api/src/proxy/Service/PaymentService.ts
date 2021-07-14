import ApiMethodFactory from "../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "paymentService",
  Module: "hir",
  Actions: {
    savePaymentDueDatePolicy: "savePaymentDueDatePolicy",
    getPaymentDueDatePolicy: "getPaymentDueDatePolicy",
    addOrderItemsToPay: "addOrderItemsToPay",
    setCustomPaymentAmount: "setCustomPaymentAmount",
    isPaymentReversible: "isPaymentReversible",
    reversePayment: "reversePayment"
  }
}

export default ApiMethodFactory(config)
