export const DEFAULT_OFFERING_TYPE_ID = 1000
export const DEFAULT_SECTION_TYPE_ID = 13
export const DATE_FORMAT = "MM/DD/YYYY"
export const TIME_FORMAT = "hh:mm A"
export const DATE_TIME_FORMAT = "MM/DD/YYYY hh:mm A"
export const REQUEST_DATE_TIME_FORMAT = "YYYY-MM-DD hh:mm A"
export const DATE_TIME = ""

export const WAITLIST_ENTRIES_LOOKUP_TYPES = {
  ACCOUNT: "Account",
  PURCHASER: "Purchaser",
  STUDENT: "Student",
  PURCHASER_STUDENT: "Purchaser/Student"
}

export const REQUEST_LOOKUP_TYPES = {
  ACCOUNT: "Account",
  PURCHASER: "Purchaser",
  RECIPIENT: "Recipient",
  ANY: "Any"
}

export const REQUEST_RESOLUTION_NAMES = {
  EDIT: "Edit",
  ANSWER_QUESTIONS: "AnswerQuestions",
  SPECIFY_RECIPIENT: "SpecifyRecipient",
  MAKE_PAYMENT: "MakePayment",
  POST_PAYMNET: "PostPayment",
  SWITCH_RECIPIENT: "SwitchRecipient",
  ERROR_DETAILS: "ErrorDetails",
  RETRY: "Retry"
}

export const REQUEST_PROCESS_ACTION_NAME = {
  ANSWER_QUESTIONS: "answerQuestions",
  EDIT: "changeBlockerState",
  POST_PAYMNET: "directPostExternalPayment",
  SPECIFY_RECIPIENT: "setTaskRecipient"
}

export const REQUEST_TASK_TYPE_NAME = {
  ORDER: "Order",
  REGISTRATION: "Registration",
  PURCHASE_ORDER: "PurchaseOrder",
  EXTERNAL_GATEWAY_PAYMENT: "ExternalGatewayPayment"
}

export const ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES = {
  BUYER: {
    name: "Buyer",
    key: "PersonID"
  },
  STUDENT: {
    name: "Student",
    key: "StudentName"
  },
  BILLED_TO: {
    name: "Billed To",
    key: "BilledPersonName"
  }
}

export const COMMENT_TYPES = {
  GENERAL: "General",
  INSTRUCTOR: "Instructor",
  ENROLLMENT: "Enrollment"
}

export const FINANCIAL_BASIS_PER_ENROLLMENT_TYPE_ID = 1

export const DISCOUNT_APPLY_TO_ALL_TYPE_ID = 1
export const DISCOUNT_MANUALLY_APPLIED_TO_ENROLLMENT_TYPE_ID = 2
export const DISCOUNT_AGE_RANGE_TYPE_ID = 3
export const DISCOUNT_DATE_RANGE_TYPE_ID = 4
export const DISCOUNT_VOLUME_TYPE_ID = 5
export const DISCOUNT_PROMOTIONAL_CODE_TYPE_ID = 1000

export const DISCOUNT_DOLLAR_AMOUNT_TYPE_ID = 1
export const DISCOUNT_PERCENTAGE_AMOUNT_TYPE_ID = 2

export const DISCOUNT_DOLLATE_AMOUNT_TYPE_LABEL = "Dollars"
export const DISCOUNT_PERCENTAGE_AMOUNT_TYPE_LABEL = "Percentage"

export const BUDGET_FINANCIAL_TYPE_OFFERING = "Offering"
export const BUDGET_FINANCIAL_TYPE_RESOURCE = "Resource"
export const BUDGET_FINANCIAL_TYPE_INSTRUCTOR = "Instructor"
export const BUDGET_FINANCIAL_TYPE_FACULTY = "Faculty"
export const BUDGET_FINANCIAL_TYPE_MARKETING_PROGRAM = "Marketing Program"

export const PROCESSED_REQUEST_STATE_ID = 4
export const ACTION_REQUIRED_REQUEST_STATE_ID = 2
export const ERROR_REQUEST_STATE_ID = 5

export const ADMIN_SOURCE_NAME = "Admin"

export const DEFAULT_HIR_ADMIN_SOURCE_ID = 3

export const PARAM_TYPE_REQUEST = "Request"
export const PARAM_TYPE_REQUESTS = "Requests"

export const PARAM_TYPE_REGISTRATION = "Registration"
export const PARAM_TYPE_REGISTRATIONS = "Registrations"

export const ACCOUNT_AFFILIATION_STATUS_ID_ACTIVE = 1
