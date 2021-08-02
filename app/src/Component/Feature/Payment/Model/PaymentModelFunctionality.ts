import {
  IItemRequest,
  IPayer,
  IPayer_Func,
  IPaymentAmountType,
  IPaymentTypes,
  IPersonProfile,
  TypePaymentAmountType,
  TypePaymentTypeID
} from "~/Component/Feature/Payment/Model/Interfaces"

const PaymentTypes: IPaymentTypes = {
  AdjustFromCashAccount: 13,
  Gift: 11,
  Cash: 4,
  Savings: 1,
  Checks: 0,
  ExternalPayment: 7
}

const PaymentAmountType: IPaymentAmountType = {
  full_amount: { label: "Full Payment", value: "full_amount" },
  partial_amount: { label: "Partial Payment", value: "partial_amount" },
  custom_amount: { label: "Custom Payment", value: "custom_amount" }
}
export class PaymentModelFunctionality implements IPayer_Func {
  payer: IPayer = {}
  itemsToBePaid: IItemRequest[] = []
  allocatedItems: any[] = []
  totalBalance = 0
  totalPayment = 0
  PaymentAmountType: TypePaymentAmountType = PaymentAmountType.full_amount.value
  selectedPaymentType: TypePaymentTypeID = PaymentTypes.AdjustFromCashAccount

  assignPayer(Person?: IPersonProfile) {
    console.log(Person)
  }
}
