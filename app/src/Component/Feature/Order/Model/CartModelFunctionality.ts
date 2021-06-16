import {
  IBuyer_Func,
  IIProductRequest_Func,
  IMembershipRequest_Func,
  IPackageRequest_Func,
  IProgramApplicationRequest_Func,
  IProgramEnrollmentRequest_Func,
  IRegistrationRequest_Func,
  ISeatGroup
} from "~/Component/Feature/Order/Model/Interface/IFunc"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import {
  createMembershipRequest,
  createOptionalItemRequest,
  createProductRequest,
  createProgramApplicationRequest,
  createProgramEnrollmentRequest,
  createRegistrationRequest,
  launchRegistrationRequest,
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
  IRegistrationRequest
} from "~/Component/Feature/Order/Model/Interface/IModel"
import { eventBus } from "~/utils/EventBus"
import { UPDATE_BUYER, UPDATE_CART } from "~/Pages/Manage/Financials/CreateOrderPage"
import { fakeCartData } from "~/Component/Feature/Order/Model/fakeCartData"

export class CartModelFunctionality
  implements
    IBuyer_Func,
    IRegistrationRequest_Func,
    IProgramApplicationRequest_Func,
    IProgramEnrollmentRequest_Func,
    IIProductRequest_Func,
    IPackageRequest_Func,
    IMembershipRequest_Func {
  buyer: IBuyer = {}
  // itemList: IItemRequest[] = []
  itemList: IItemRequest[] = fakeCartData

  assignPerson(Person?: IPersonProfile): void {
    this.buyer.PersonID = Person ? Person.PersonID : undefined
    this.buyer.AccountID = Person ? Person.AccountID : undefined
    this.buyer.PersonProfile = Person ? Person : undefined

    eventBus.publish(UPDATE_BUYER, this.buyer)
  }
  launchRegistrationRequest(): Promise<IApiResponse> {
    console.log("create order", this.itemList.length, this.buyer)
    if (this.itemList.length && this.buyer && this.buyer.PersonProfile) {
      let Override: { [key: string]: any } = {}

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

      const orderPayload = {
        ItemList: this.itemList,
        Override
      }
      return launchRegistrationRequest(orderPayload)
    } else return Promise.resolve({ code: 200, success: false, data: "", error: "" })
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
        tempRegistrationRequest.OverrideData = {
          SectionPrerequisiteCheck: false,
          StudentOnHoldCheckWithMessage: false,
          StudentOnHoldCheck: false,
          ScheduleConflictCheck: false,
          AnswerQuestion: false
        }
        this.itemList = [...this.itemList, tempRegistrationRequest]
        eventBus.publish(UPDATE_CART, this.itemList)
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
          }
          tempRegistrationRequest.varificationInProgress = false
          tempRegistrationRequest.SeatGroups = SeatGroups
          const __itemList = this.itemList.map((x) => {
            if (x.RequestID === tempRegistrationRequest.RequestID) x = tempRegistrationRequest
            return x
          })
          eventBus.publish(UPDATE_CART, __itemList)
        })
      }
      return x
    })
  }

  removeRegistrationRequest(RequestID: number): Promise<IApiResponse> {
    this.itemList = this.itemList.filter((x) => x.RequestID !== RequestID)
    eventBus.publish(UPDATE_CART, this.itemList)
    return Promise.resolve({ code: 200, data: "", error: false, success: true })
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
          eventBus.publish(UPDATE_CART, this.itemList)
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
    eventBus.publish(UPDATE_CART, this.itemList)
  }

  createProgramApplicationRequest(ProgramID: number, RecipientPersonID?: number) {
    return createProgramApplicationRequest({ ProgramID, RecipientPersonID }).then((response) => {
      if (response.success) {
        const tempRegistrationRequest: IProgramApplicationRequest = response.data
        tempRegistrationRequest.varificationInProgress = true
        this.itemList = [...this.itemList, tempRegistrationRequest]
        eventBus.publish(UPDATE_CART, this.itemList)
        validateProgramRequest({
          ProgramID,
          RecipientPersonID,
          ProgramRequestType: "ProgramApplicationRequest"
        }).then((validationResponse) => {
          tempRegistrationRequest.varificationInProgress = false
          if (validationResponse.success)
            tempRegistrationRequest.issues = {
              program_validity_issues: validationResponse.data.program_validity_issues || [],
              DuplicateRequestCheck_passed: !!validationResponse.data["Request.DuplicateRequestCheck_passed"],
              check_application_passed: !!validationResponse.data.check_application_passed,
              program_validity_passed: !!validationResponse.data.program_validity_passed
            }
          this.itemList = this.itemList.map((x) => {
            if (x.RequestID === tempRegistrationRequest.RequestID) {
              x = tempRegistrationRequest
            }
            return x
          })
          eventBus.publish(UPDATE_CART, this.itemList)
        })
      }
      return response
    })
  }

  createProgramEnrollmentRequest(ProgramID: number, RecipientPersonID?: number) {
    return createProgramEnrollmentRequest({ ProgramID, RecipientPersonID }).then((response) => {
      if (response.success) {
        const tempRegistrationRequest: IProgramEnrollmentRequest = response.data
        tempRegistrationRequest.varificationInProgress = true
        this.itemList = [...this.itemList, tempRegistrationRequest]
        eventBus.publish(UPDATE_CART, this.itemList)
        validateProgramRequest({
          ProgramID,
          RecipientPersonID,
          ProgramRequestType: "ProgramEnrollmentRequest"
        }).then((validationResponse) => {
          if (validationResponse.success)
            tempRegistrationRequest.issues = {
              program_validity_passed: !!validationResponse.data.program_validity_passed,
              check_enrollment_passed: !!validationResponse.data.check_enrollment_passed,
              check_application_approval_passed: !!validationResponse.data.check_application_approval_passed,
              DuplicateRequestCheck_passed: !!validationResponse.data.DuplicateRequestCheck_passed
            }
          tempRegistrationRequest.varificationInProgress = false
          this.itemList = this.itemList.map((x) => {
            if (x.RequestID === tempRegistrationRequest.RequestID) {
              x = tempRegistrationRequest
            }
            return x
          })
          eventBus.publish(UPDATE_CART, this.itemList)
        })
      }
      return response
    })
  }

  createProductRequest(ProductID: number, RecipientPersonID: number, Quantity: number) {
    return createProductRequest({ ProductID, RecipientPersonID, Quantity }).then((response) => {
      const tempProductRequest: IProductRequest = response.data
      tempProductRequest.varificationInProgress = true
      this.itemList = [...this.itemList, tempProductRequest]
      eventBus.publish(UPDATE_CART, this.itemList)
      validateProductRequest({ ProductID: ProductID, RecipientPersonID: this.buyer.PersonID, Quantity }).then(
        (validateProductResponse) => {
          tempProductRequest.varificationInProgress = false
          this.itemList = this.itemList.map((x) => {
            if (x.RequestID === tempProductRequest.RequestID) {
              x = tempProductRequest
            }
            return x
          })
          eventBus.publish(UPDATE_CART, this.itemList)
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
      const tempProductRequest: IPackageRequest = response.data
      tempProductRequest.varificationInProgress = true
      this.itemList = [...this.itemList, tempProductRequest]
      eventBus.publish(UPDATE_CART, this.itemList)
      validateProductRequest({
        ProductID: ProductID,
        PackageID,
        RecipientPersonID: this.buyer.PersonID,
        Quantity
      }).then((validateProductResponse) => {
        tempProductRequest.varificationInProgress = false
        this.itemList = this.itemList.map((x) => {
          if (x.RequestID === tempProductRequest.RequestID) {
            x = tempProductRequest
          }
          return x
        })
        eventBus.publish(UPDATE_CART, this.itemList)
      })
      return response
    })
  }

  createMembershipRequest(MembershipDefinitionID: number, RecipientPersonID: number) {
    return createMembershipRequest({ MembershipDefinitionID, RecipientPersonID }).then((response) => {
      if (response.success) {
        const tempMembershipRequest: IMembershipRequest = response.data
        tempMembershipRequest.varificationInProgress = true
        this.itemList = [...this.itemList, tempMembershipRequest]
        eventBus.publish(UPDATE_CART, this.itemList)
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
          eventBus.publish(UPDATE_CART, this.itemList)
        })
      }
      return response
    })
  }
}
