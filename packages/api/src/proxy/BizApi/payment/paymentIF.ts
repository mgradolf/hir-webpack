import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.financial.server.bizapi.payment.PaymentIF",
  Module: "hir",
  Actions: {
    searchPayment: "searchPayment",
    searchCreditMemo: "searchCreditMemo",
    getPaymentTypes: "getPaymentTypes",
    canReversePayment: "canReversePayment",
    getPaymentReceipt: "getPaymentReceipt",
    generatePaymentAllocation: "generatePaymentAllocation"
  }
}

export default ApiMethodFactory(config)
