import {
  IBuyer_Func,
  IIProductRequest_Func,
  IMembershipRequest_Func,
  IPackageRequest_Func,
  IProgramApplicationRequest_Func,
  IProgramEnrollmentRequest_Func,
  IRegistrationRequest_Func,
  IRequest_Func,
  ISeatGroup
} from "~/Component/Feature/Order/Model/Interface/IFunc"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import {
  applyPromoCodes,
  createMembershipRequest,
  createOptionalItemRequest,
  createProductRequest,
  createProgramApplicationRequest,
  createProgramEnrollmentRequest,
  createRegistrationRequest,
  getCheckoutInfo,
  validateProductRequest,
  validateProgramRequest,
  validateRegistrationRequest
} from "~/ApiServices/Service/CartService"
import {
  IBuyer,
  IItemRequest,
  IMembershipRequest,
  IPackageRequest,
  IPersonProfile,
  IProductRequest,
  IProgramApplicationRequest,
  IProgramEnrollmentRequest,
  IRegistrationPromo,
  IRegistrationRequest
} from "~/Component/Feature/Order/Model/Interface/IModel"
import { eventBus } from "~/utils/EventBus"
import { fakeCartData } from "~/Component/Feature/Order/Model/fakeCartData"
import { getPromotionalForSeatGroup } from "~/ApiServices/BizApi/query/queryIf"
import { launchRequest } from "~/ApiServices/Service/RequestService"

export class CartModelFunctionality
  implements
    IBuyer_Func,
    IRequest_Func,
    IRegistrationRequest_Func,
    IProgramApplicationRequest_Func,
    IProgramEnrollmentRequest_Func,
    IIProductRequest_Func,
    IPackageRequest_Func,
    IMembershipRequest_Func {
  buyer: IBuyer = {}
  // itemList: IItemRequest[] = []
  itemList: IItemRequest[] = fakeCartData
  registrationPromos: IRegistrationPromo[] = []

  EVENT_UPDATE_CART: string
  EVENT_UPDATE_BUYER: string
  EVENT_UPDATE_PROMO: string

  constructor(EVENT_UPDATE_CART: string, EVENT_UPDATE_BUYER: string, EVENT_UPDATE_PROMO: string) {
    this.EVENT_UPDATE_CART = EVENT_UPDATE_CART
    this.EVENT_UPDATE_BUYER = EVENT_UPDATE_BUYER
    this.EVENT_UPDATE_PROMO = EVENT_UPDATE_PROMO
  }

  findIssue(_item: IItemRequest): boolean {
    switch (_item.ItemType) {
      case "RegistrationRequest":
        const registrationItem: IRegistrationRequest = _item as IRegistrationRequest
        return (
          !!registrationItem.issues &&
          registrationItem.issues?.RegistrationCheck_passed &&
          registrationItem.issues?.DuplicateRequestCheck_passed &&
          registrationItem.issues?.SectionValidityCheck_passed &&
          (registrationItem.issues?.RegistrationQuestionCheck_passed || registrationItem.OverrideData.AnswerQuestion) &&
          (registrationItem.issues?.ScheduleConflict_passed || registrationItem.OverrideData.ScheduleConflictCheck) &&
          (registrationItem.issues?.StudentOnHoldCheck_passed ||
            (registrationItem.OverrideData.StudentOnHoldCheck &&
              registrationItem.OverrideData.StudentOnHoldCheckWithMessage)) &&
          (registrationItem.issues?.PrerequisiteCheck_passed || registrationItem.OverrideData.SectionPrerequisiteCheck)
        )
      case "ProgramApplicationRequest":
        const programApplicationItem: IProgramApplicationRequest = _item as IProgramApplicationRequest
        return (
          !!programApplicationItem.issues &&
          programApplicationItem.issues.DuplicateRequestCheck_passed &&
          programApplicationItem.issues?.check_application_passed &&
          programApplicationItem.issues?.program_validity_passed
        )
      case "ProgramEnrollmentRequest":
        const programEnrollmeItem: IProgramEnrollmentRequest = _item as IProgramEnrollmentRequest
        return (
          !!programEnrollmeItem.issues &&
          !programEnrollmeItem.issues.program_validity_passed &&
          !programEnrollmeItem.issues.check_enrollment_passed &&
          !programEnrollmeItem.issues.check_application_approval_passed &&
          !programEnrollmeItem.issues.DuplicateRequestCheck_passed
        )
      case "ProductRequest":
        break
      case "MembershipRequest":
        const membershipRequest: IMembershipRequest = _item as IMembershipRequest
        return (
          !!membershipRequest.issues &&
          !membershipRequest.issues.FixedTermMembershipAlreadyBought_passed &&
          !membershipRequest.issues.FixterTermMembershipExpired_passed &&
          !membershipRequest.issues.DuplicateRequestCheck_passed &&
          !membershipRequest.issues.MembershipCannotBeRenewed_passed &&
          !membershipRequest.issues.MembershipAlreadyBoughtAndRenewed_passed
        )
    }

    return true
  }

  assignPerson(Person?: IPersonProfile): void {
    this.buyer.PersonID = Person ? Person.PersonID : undefined
    this.buyer.AccountID = Person ? Person.AccountID : undefined
    this.buyer.PersonProfile = Person ? Person : undefined

    eventBus.publish(this.EVENT_UPDATE_BUYER, this.buyer)
  }
  getOverrides(): { [key: string]: any } {
    let Override: { [key: string]: any } = {}
    if (this.itemList.length && this.buyer && this.buyer.PersonProfile) {
      const list: IRegistrationRequest[] = (this.itemList as IRegistrationRequest[]).filter(
        (x) => x.ItemType === "RegistrationRequest"
      )
      list.forEach((x) => {
        Override = {
          ...Override,
          [`Registration_SectionID_${x.SectionID}_${this.buyer.PersonID}`]: {
            ...(x.OverrideData.SectionPrerequisiteCheck && { SectionPrerequisiteCheck: 1 }),
            ...(x.OverrideData.StudentOnHoldCheckWithMessage && { StudentOnHoldCheckWithMessage: 1 }),
            ...(x.OverrideData.StudentOnHoldCheck && { StudentOnHoldCheck: 1 }),
            ...(x.OverrideData.ScheduleConflictCheck && { ScheduleConflictCheck: 1 }),
            ...(x.OverrideData.AnswerQuestion && { AnswerQuestion: 1 })
          }
        }
      })
    }
    return Override
  }

  addRegistrationRequest(
    SeatGroups: ISeatGroup[],
    SeatGroupID: number,
    RecipientPersonID?: number,
    StatusDate?: string
  ): Promise<IApiResponse> {
    let tempRegistrationRequest: IRegistrationRequest
    return createRegistrationRequest({
      SeatGroupID,
      RecipientPersonID,
      AccountID: this.buyer.AccountID,
      StatusDate
    }).then((x) => {
      if (x.success) {
        tempRegistrationRequest = x.data
        console.log(tempRegistrationRequest)
        tempRegistrationRequest.varificationInProgress = true

        tempRegistrationRequest.GrossPrice = tempRegistrationRequest.UnitPrice * tempRegistrationRequest.ItemQuantity
        tempRegistrationRequest.Discount = tempRegistrationRequest.Discount ? tempRegistrationRequest.Discount : 0
        tempRegistrationRequest.NetPrice = tempRegistrationRequest.GrossPrice - tempRegistrationRequest.Discount

        this.itemList = [...this.itemList, tempRegistrationRequest]
        tempRegistrationRequest.OverrideData = {
          SectionPrerequisiteCheck: true,
          StudentOnHoldCheckWithMessage: true,
          StudentOnHoldCheck: true,
          ScheduleConflictCheck: true,
          AnswerQuestion: true
        }
        eventBus.publish(this.EVENT_UPDATE_CART, this.itemList)
        validateRegistrationRequest({
          SeatGroupID: tempRegistrationRequest.SeatGroupID,
          RecipientPersonID: tempRegistrationRequest.RecipientPersonID,
          StatusDate: tempRegistrationRequest.StatusDate,
          AnswerMap: tempRegistrationRequest.AnswerMap
        }).then((response) => {
          tempRegistrationRequest.varificationInProgress = true
          if (response.success) {
            tempRegistrationRequest.issues = {
              RegistrationCheck_passed:
                !!response.data.RegistrationCheck_passed || response.data.RegistrationCheck_passed === undefined,
              DuplicateRequestCheck_passed:
                !!response.data["Request.DuplicateRequestCheck_passed"] ||
                response.data["Request.DuplicateRequestCheck_passed"] === undefined,
              PrerequisiteCheck_passed:
                !!response.data["Request.PrerequisiteCheck_passed"] ||
                response.data["Request.PrerequisiteCheck_passed"] === undefined,
              RegistrationQuestionCheck_passed:
                !!response.data["Request.RegistrationQuestionCheck_passed"] ||
                response.data["Request.RegistrationQuestionCheck_passed"] === undefined,
              ScheduleConflict_passed:
                !!response.data["Request.ScheduleConflict_passed"] ||
                response.data["Request.ScheduleConflict_passed"] === undefined,
              StudentOnHoldCheck_passed:
                !!response.data["Request.StudentOnHoldCheck_passed"] ||
                response.data["Request.StudentOnHoldCheck_passed"] === undefined,
              SectionValidityCheck_passed:
                !!response.data.SectionValidityCheck_passed || response.data.SectionValidityCheck_passed === undefined,
              check_sectionvalidity_issues: response.data.check_sectionvalidity_issues,
              check_prerequisiteconflict_conflicts: response.data.check_prerequisiteconflict_conflicts || [],
              check_scheduleconflict_conflicts: response.data.check_scheduleconflict_conflicts || []
            }
            tempRegistrationRequest.OverrideData = {
              SectionPrerequisiteCheck: tempRegistrationRequest.issues.PrerequisiteCheck_passed,
              StudentOnHoldCheckWithMessage: tempRegistrationRequest.issues.StudentOnHoldCheck_passed,
              StudentOnHoldCheck: tempRegistrationRequest.issues.StudentOnHoldCheck_passed,
              ScheduleConflictCheck: tempRegistrationRequest.issues.ScheduleConflict_passed,
              AnswerQuestion: tempRegistrationRequest.issues.RegistrationQuestionCheck_passed
            }
          }
          tempRegistrationRequest.varificationInProgress = false
          tempRegistrationRequest.SeatGroups = SeatGroups
          const __itemList = this.itemList.map((x) => {
            if (x.RequestID === tempRegistrationRequest.RequestID) x = tempRegistrationRequest
            return x
          })
          eventBus.publish(this.EVENT_UPDATE_CART, __itemList)
        })

        this.getPromotionalForSeatGroups()
      }
      return x
    })
  }

  getPromotionalForSeatGroups() {
    return getPromotionalForSeatGroup({
      SeatGroupID: this.itemList
        .filter((x) => x.ItemType === "RegistrationRequest")
        .map((x) => (x as IRegistrationRequest).SeatGroupID)
    }).then((response) => {
      if (response.success && Array.isArray(response.data) && response.data.length) {
        response.data = response.data.map((promo: IRegistrationPromo) => {
          if (this.registrationPromos.find((x) => x.SectionDiscountID === promo.SectionDiscountID)) {
            promo.IsSelected = true
          }
          return promo
        })
        this.registrationPromos = response.data
      } else this.registrationPromos = []
      eventBus.publish(this.EVENT_UPDATE_PROMO, this.registrationPromos)
      return response
    })
  }

  applyPromoCodes(ItemList: IRegistrationRequest[], PromotionalCodes: string[]) {
    return applyPromoCodes({ ItemList, PromotionalCodes }).then((response) => {
      if (response.success) {
        this.itemList = this.itemList.map((x) => {
          if (x.ItemType === "RegistrationRequest") {
            const discountCalculated: IRegistrationRequest = response.data.ItemList.find(
              (y: { [key: string]: any }) =>
                y.SeatGroupID === (x as IRegistrationRequest).SeatGroupID &&
                y.RecipientPersonID === (x as IRegistrationRequest).RecipientPersonID
            )
            if (discountCalculated) {
              x.GrossPrice = discountCalculated.GrossPrice
              x.NetPrice = discountCalculated.NetPrice
              x.Discount = discountCalculated.Discount
            }
          }
          return x
        })
        eventBus.publish(this.EVENT_UPDATE_CART, this.itemList)
      }
      return response
    })
  }

  addPromo(SectionDiscountIDsToBeAdded: number[]) {
    this.registrationPromos = this.registrationPromos.map((x) => {
      if (SectionDiscountIDsToBeAdded.find((SectionDiscountID) => SectionDiscountID === x.SectionDiscountID)) {
        x.IsSelected = false
      }
      return x
    })
    eventBus.publish(this.EVENT_UPDATE_PROMO, this.registrationPromos)
    return this.applyPromoCodes(
      this.itemList as IRegistrationRequest[],
      this.registrationPromos.map((x) => x.DiscountServiceParams)
    )
  }

  addOptionalItem(RequestID: number, SeatGroupID: number, SectionFinancialIDs: number[], ProductIDs: number[]) {
    if (RequestID && SeatGroupID) {
      return createOptionalItemRequest({
        SeatGroupID: SeatGroupID,
        ...(SectionFinancialIDs.length && { SectionFinancialIDs: SectionFinancialIDs }),
        ...(ProductIDs.length && { ProductIDs: ProductIDs })
      }).then((response) => {
        if (response.success && Array.isArray(response.data)) {
          this.itemList = (this.itemList as IRegistrationRequest[]).map((x) => {
            if (x.RequestID === RequestID && Array.isArray(response.data)) {
              x.ItemList = [...response.data]
            }
            return x
          })
          eventBus.publish(this.EVENT_UPDATE_CART, this.itemList)
        }
        return response
      })
    }
    return Promise.resolve({ code: 200, success: false, data: [], error: true })
  }

  addAnswerMap(RequestID: number, answerMap: { [key: string]: any }) {
    this.itemList = (this.itemList as IRegistrationRequest[]).map((x) => {
      if (x.RequestID === RequestID) x.AnswerMap = answerMap
      return x
    })
    eventBus.publish(this.EVENT_UPDATE_CART, this.itemList)
  }

  createProgramApplicationRequest(ProgramID: number, RecipientPersonID?: number) {
    return createProgramApplicationRequest({ ProgramID, RecipientPersonID }).then((response) => {
      if (response.success) {
        const tempApplicationRequest: IProgramApplicationRequest = response.data
        tempApplicationRequest.varificationInProgress = true
        tempApplicationRequest.GrossPrice = tempApplicationRequest.UnitPrice * tempApplicationRequest.ItemQuantity
        tempApplicationRequest.Discount = tempApplicationRequest.Discount ? tempApplicationRequest.Discount : 0
        tempApplicationRequest.NetPrice = tempApplicationRequest.GrossPrice - tempApplicationRequest.Discount
        this.itemList = [...this.itemList, tempApplicationRequest]
        eventBus.publish(this.EVENT_UPDATE_CART, this.itemList)
        validateProgramRequest({
          ProgramID,
          RecipientPersonID,
          ProgramRequestType: "ProgramApplicationRequest"
        }).then((validationResponse) => {
          tempApplicationRequest.varificationInProgress = false
          if (validationResponse.success)
            tempApplicationRequest.issues = {
              program_validity_issues: validationResponse.data.program_validity_issues || [],
              DuplicateRequestCheck_passed: !!validationResponse.data["Request.DuplicateRequestCheck_passed"],
              check_application_passed: !!validationResponse.data.check_application_passed,
              program_validity_passed: !!validationResponse.data.program_validity_passed
            }
          this.itemList = this.itemList.map((x) => {
            if (x.RequestID === tempApplicationRequest.RequestID) {
              x = tempApplicationRequest
            }
            return x
          })
          eventBus.publish(this.EVENT_UPDATE_CART, this.itemList)
        })
      }
      return response
    })
  }

  createProgramEnrollmentRequest(ProgramID: number, RecipientPersonID?: number) {
    return createProgramEnrollmentRequest({ ProgramID, RecipientPersonID }).then((response) => {
      if (response.success) {
        const tempProgramEnrollmentRequest: IProgramEnrollmentRequest = response.data
        tempProgramEnrollmentRequest.varificationInProgress = true

        tempProgramEnrollmentRequest.GrossPrice =
          tempProgramEnrollmentRequest.UnitPrice * tempProgramEnrollmentRequest.ItemQuantity
        tempProgramEnrollmentRequest.Discount = tempProgramEnrollmentRequest.Discount
          ? tempProgramEnrollmentRequest.Discount
          : 0
        tempProgramEnrollmentRequest.NetPrice =
          tempProgramEnrollmentRequest.GrossPrice - tempProgramEnrollmentRequest.Discount

        this.itemList = [...this.itemList, tempProgramEnrollmentRequest]
        eventBus.publish(this.EVENT_UPDATE_CART, this.itemList)
        validateProgramRequest({
          ProgramID,
          RecipientPersonID,
          ProgramRequestType: "ProgramEnrollmentRequest"
        }).then((validationResponse) => {
          if (validationResponse.success)
            tempProgramEnrollmentRequest.issues = {
              program_validity_passed: !!validationResponse.data.program_validity_passed,
              check_enrollment_passed: !!validationResponse.data.check_enrollment_passed,
              check_application_approval_passed: !!validationResponse.data.check_application_approval_passed,
              DuplicateRequestCheck_passed: !!validationResponse.data.DuplicateRequestCheck_passed
            }
          tempProgramEnrollmentRequest.varificationInProgress = false
          this.itemList = this.itemList.map((x) => {
            if (x.RequestID === tempProgramEnrollmentRequest.RequestID) {
              x = tempProgramEnrollmentRequest
            }
            return x
          })
          eventBus.publish(this.EVENT_UPDATE_CART, this.itemList)
        })
      }
      return response
    })
  }

  createProductRequest(ProductID: number, RecipientPersonID: number, Quantity: number) {
    return createProductRequest({ ProductID, RecipientPersonID, Quantity }).then((response) => {
      const tempProductRequest: IProductRequest = response.data
      tempProductRequest.varificationInProgress = true

      tempProductRequest.GrossPrice = tempProductRequest.UnitPrice * tempProductRequest.ItemQuantity
      tempProductRequest.Discount = tempProductRequest.Discount ? tempProductRequest.Discount : 0
      tempProductRequest.NetPrice = tempProductRequest.GrossPrice - tempProductRequest.Discount
      this.itemList = [...this.itemList, tempProductRequest]
      eventBus.publish(this.EVENT_UPDATE_CART, this.itemList)
      validateProductRequest({ ProductID: ProductID, RecipientPersonID: this.buyer.PersonID, Quantity }).then(
        (validateProductResponse) => {
          tempProductRequest.varificationInProgress = false
          this.itemList = this.itemList.map((x) => {
            if (x.RequestID === tempProductRequest.RequestID) {
              x = tempProductRequest
            }
            return x
          })
          eventBus.publish(this.EVENT_UPDATE_CART, this.itemList)
        }
      )
      return response
    })
  }

  createPackageRequest(ProductID: number, PackageID: number, RecipientPersonID: number, Quantity: number) {
    return createProductRequest({
      ProductID,
      PackageID,
      RecipientPersonID,
      Quantity
    }).then((response) => {
      const tempPackageRequest: IPackageRequest = response.data
      tempPackageRequest.varificationInProgress = true
      tempPackageRequest.GrossPrice = tempPackageRequest.UnitPrice * tempPackageRequest.ItemQuantity
      tempPackageRequest.Discount = tempPackageRequest.Discount ? tempPackageRequest.Discount : 0
      tempPackageRequest.NetPrice = tempPackageRequest.GrossPrice - tempPackageRequest.Discount
      this.itemList = [...this.itemList, tempPackageRequest]
      eventBus.publish(this.EVENT_UPDATE_CART, this.itemList)
      validateProductRequest({
        ProductID: ProductID,
        PackageID,
        RecipientPersonID: this.buyer.PersonID,
        Quantity
      }).then((validateProductResponse) => {
        tempPackageRequest.varificationInProgress = false
        this.itemList = this.itemList.map((x) => {
          if (x.RequestID === tempPackageRequest.RequestID) {
            x = tempPackageRequest
          }
          return x
        })
        eventBus.publish(this.EVENT_UPDATE_CART, this.itemList)
      })
      return response
    })
  }

  createMembershipRequest(MembershipDefinitionID: number, RecipientPersonID: number) {
    return createMembershipRequest({ MembershipDefinitionID, RecipientPersonID }).then((response) => {
      if (response.success) {
        const tempMembershipRequest: IMembershipRequest = response.data
        tempMembershipRequest.varificationInProgress = true
        tempMembershipRequest.GrossPrice = tempMembershipRequest.UnitPrice * tempMembershipRequest.ItemQuantity
        tempMembershipRequest.Discount = tempMembershipRequest.Discount ? tempMembershipRequest.Discount : 0
        tempMembershipRequest.NetPrice = tempMembershipRequest.GrossPrice - tempMembershipRequest.Discount
        this.itemList = [...this.itemList, tempMembershipRequest]
        eventBus.publish(this.EVENT_UPDATE_CART, this.itemList)
        validateProductRequest({
          MembershipDefinitionID,
          RecipientPersonID
        }).then((validateMembershipResponse) => {
          tempMembershipRequest.varificationInProgress = false
          if (validateMembershipResponse.success)
            tempMembershipRequest.issues = {
              FixedTermMembershipAlreadyBought_passed:
                validateMembershipResponse.data.FixedTermMembershipAlreadyBought_passed,
              FixterTermMembershipExpired_passed: validateMembershipResponse.data.FixterTermMembershipExpired_passed,
              DuplicateRequestCheck_passed: validateMembershipResponse.data["Request.DuplicateRequestCheck_passed"],
              MembershipCannotBeRenewed_passed: validateMembershipResponse.data.MembershipCannotBeRenewed_passed,
              MembershipAlreadyBoughtAndRenewed_passed:
                validateMembershipResponse.data.MembershipAlreadyBoughtAndRenewed_passed
            }
          this.itemList = this.itemList.map((x) => {
            if (x.RequestID === tempMembershipRequest.RequestID) {
              x = tempMembershipRequest
            }
            return x
          })
          eventBus.publish(this.EVENT_UPDATE_CART, this.itemList)
        })
      }
      return response
    })
  }

  removeCartItemRequest(RequestID?: number): Promise<IApiResponse> {
    this.itemList = RequestID ? this.itemList.filter((x) => x.RequestID !== RequestID) : []
    this.getPromotionalForSeatGroups()
    eventBus.publish(this.EVENT_UPDATE_CART, this.itemList)
    return Promise.resolve({ code: 200, data: "", error: false, success: true })
  }

  launchRequest(): Promise<IApiResponse> {
    return getCheckoutInfo({
      PurchaserPersonID: this.buyer.PersonID,
      ItemList: this.itemList,
      PromotionalCodes: this.registrationPromos.map((x) => x.ShortName)
    }).then((allocationResponse) => {
      if (allocationResponse.success) {
        const orderSubmitPayload = {
          ParentRequestID: null,
          RequestData: {
            ...this.buyer.PersonProfile,
            ...allocationResponse.data,
            ItemList: this.itemList,
            ShowMembershipLink: true,
            ShowRenewLink: false,
            PurchaseOrderAmount: allocationResponse.data.TotalPaymentAmount,
            PaymentType: "MiscellaneousPayment",
            // MarketingCode: 7,
            EmailInvoice: false,
            EmailReceipt: true
          },
          RequestContext: {
            SourceID: 3,
            RequesterStaffUserName: "joeAdmin123"
          },
          RequestComponentName: "OrderOnly",
          RelationshipStatus: 1,
          OverrideData: this.getOverrides()
        }

        return launchRequest(orderSubmitPayload)
      }
      return allocationResponse
    })
  }
}
