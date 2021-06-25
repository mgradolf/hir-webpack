export const DEFAULT_OFFERING_TYPE_ID = 1000
export const DEFAULT_SECTION_TYPE_ID = 13
export const DATE_FORMAT = "MM/DD/YYYY"
export const TIME_FORMAT = "hh:mm A"
export const DATE_TIME_FORMAT = "MM/DD/YYYY hh:mm A"
export const REQUEST_DATE_TIME_FORMAT = "YYYY-MM-DD hh:mm A"
export const DATE_TIME = ""

export const OFFERING_TRMINATION_TIME = {
  DATE: "Date",
  TERM: "Term",
  DURATION: "Duration"
}

export const SECTION_TRMINATION_TIME = {
  DATE: "Date",
  TERM: "Term",
  DURATION: "Duration"
}

export const SECTION_STATUS_CODE = {
  PRELIMINARY: 0,
  COMPLETED: 4,
  CANCELLED: 1000
}

export const OFFERING_STATUS_CODE = {
  PRELIMINARY: 0
}

export const PERSON_ROLE = {
  STUDENT: 1,
  INSTRUCTOR: 2,
  PURCHASER: 3
}

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

export const REQUEST_TYPE_NAME = {
  ORDER_ONLY: "Order Only"
}

export const REQUEST_TASK_TYPE_NAME = {
  ORDER: "Order",
  REGISTRATION: "Registration",
  PURCHASE_ORDER: "PurchaseOrder",
  EXTERNAL_GATEWAY_PAYMENT: "ExternalGatewayPayment",
  MISCELLANEOUS_PAYMENT: "MiscellaneousPayment"
}

export const REGISTRATION_VERIFICATION = {
  PREREQUISITE_CHECK: "Request.PrerequisiteCheck_passed",
  SCHEDULE_CONFLICT_CHECK: "Request.ScheduleConflict_passed",
  REGISTRATION_QUESTION_CHECK: "Request.RegistrationQuestionCheck_passed",
  STUDENT_ON_HOLE_CHECK: "Request.StudentOnHoldCheck_passed",
  DUPLICATE_REQUEST_CHECK: "Request.DuplicateRequestCheck_passed",
  SECTION_VALIDITY_CHECK: "SectionValidityCheck_passed",
  REGISTRATION_CHECK: "RegistrationCheck_passed"
}

export const REGISTRATION_VERIFICATION_DETAILS = {
  check_prerequisiteconflict_conflicts: "check_prerequisiteconflict_conflicts",
  check_sectionvalidity_issues: "check_sectionvalidity_issues"
}

export const PAYMENT_POLICY_TYPE: { [key: number]: string } = {
  1: "Class Start Date",
  2: "Class End Date",
  3: "Order Date",
  4: "Fixed Date"
}

export const REGISTRATION_VERIFICATION_NAME = {
  PREREQUISITE_CHECK: "Test prerequisites",
  SCHEDULE_CONFLICT_CHECK: "Test schedule conflicts",
  REGISTRATION_QUESTION_CHECK: "Registration questions",
  STUDENT_ON_HOLE_CHECK: "Test student on hold",
  DUPLICATE_REQUEST_CHECK: "Test duplicate request",
  SECTION_VALIDITY_CHECK: "Test if section open for registration",
  REGISTRATION_CHECK: "Test if already registered"
}

export const REGISTRATION_VERIFICATION_REQUEST_NAME = {
  PREREQUISITE_CHECK: "SectionPrerequisiteCheck",
  SCHEDULE_CONFLICT_CHECK: "ScheduleConflictCheck",
  REGISTRATION_QUESTION_CHECK: "AnswerQuestion",
  STUDENT_ON_HOLE_CHECK: "StudentOnHoldCheck",
  STUDENT_ON_HOLE_CHECK_WITH_MESSAGE: "StudentOnHoldCheckWithMessage"
}

export const ORDER_MANAGEMENT_PERSON_LOOKUP_TYPES = {
  BUYER: {
    name: "Purchaser",
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

export const DISCOUNT_AMOUNT = {
  DISCOUNT_DOLLAR_AMOUNT_TYPE_ID: "$",
  DISCOUNT_PERCENTAGE_AMOUNT_TYPE_ID: "%"
}

// ProgramEnrollStatusCode
export const PROGRAM_ENROLLMENT_ENROLLED = 1
export const PROGRAM_ENROLLMENT_COMPLETED = 2
export const PROGRAM_ENROLLMENT_WITHRAWN = 3
export const PROGRAM_ENROLLMENT_INCOMPLETE = 1000

// ProgramAppStatusCode
export const PROGRAM_APPLICATION_UNSUBMITTED = 1
export const PROGRAM_APPLICATION_INCOMPLETE = 2
export const PROGRAM_APPLICATION_SUBMITTED = 3
export const PROGRAM_APPLICATION_APPROVED = 4
export const PROGRAM_APPLICATION_ENROLLED = 5
export const PROGRAM_APPLICATION_DECLINED = 6
export const PROGRAM_APPLICATION_REJECTED = 1000

// ProgramAppReqStatusCode
export const PROGRAM_APP_REQ_UNSUBMITTED = 1
export const PROGRAM_APP_REQ_SUBMITTED = 2
export const PROGRAM_APP_REQ_RESUBMIT = 3
export const PROGRAM_APP_REQ_ACCPETED = 4
export const PROGRAM_APP_REQ_REJECTED = 1000

export const FINANCIAL_HOLT_TYPE_ID = 1
export const FINANCIAL_BASIS_PER_ENROLLMENT_TYPE_ID = 1

export const FINANCIAL_OFFERING_TYPE_ID = 1
export const FINANCIAL_FACULTY_TYPE_ID = 2
export const FINANCIAL_MARKETING_PROGRAM_TYPE_ID = 3
export const FINANCIAL_RESOURCE_TYPE_ID = 4

export const FINANCIAL_TYPE_OFFERING = "Offering"
export const FINANCIAL_TYPE_RESOURCE = "Resource"
export const FINANCIAL_TYPE_INSTRUCTOR = "Instructor"
export const FINANCIAL_TYPE_FACULTY = "Faculty"
export const FINANCIAL_TYPE_MARKETING_PROGRAM = "Marketing Program"

export const FINANCIAL_BASIS_TYPE_PER_UNIT_ID = 1000

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
export const DEFAULT_HIR_ADMIN_SOURCE_ID = 3

export const ADMIN_SOURCE_NAME = "Admin"

export const GRADE_CLASSIFICATION_TYPE_WITHDRAW = 2

export const QUESTION_EVENT_TYPE_REGISTRATION = 1
export const QUESTION_EVENT_TYPE_PROFILE = 2

export const CREDIT_HOURS = "CreditHours"
export const CEU_HOURS = "CEUHours"

export const REGISTRATION_EMAIL_CONFIRMATION_SUCCESS = "Successfully send email!"
export const REGISTRATION_QUESTION_NOT_FOUND = "Registration questions not found!"
export const ISSUE_CERTIFICATE_SAVE_SUCCESS = "Certificate issue successfully!"

export const INVITE_TO_SETUP_WEB_LOGIN = "An invitation to setup a web login has been sent."
export const INVITE_TO_RESET_PASSWORD = "An invitation to reset password has been sent."
export const UNLOCK_WEB_LOGIN = "Unlock person login done!"

export const MERGE_SUCCESSFULLY = "Successfully merged!"
export const SAVE_SUCCESSFULLY = "Successfully saved!"
export const UPDATE_SUCCESSFULLY = "Successfully updated!"
export const DELETE_SUCCESSFULLY = "Successfully deleted!"
export const REQUEST_SUCCESSFULLY = "Successfully requested!"
export const CREATE_SUCCESSFULLY = "Successfully created!"
export const COPPIED_SUCCESSFULLY = "Successfully coppied!"
export const UPLOAD_SUCCESSFULLY = "Successfully uploaded!"
export const ADDED_SUCCESSFULLY = "Successfully added!"
export const DEPOSIT_SUCCESSFULLY = "Deposit Successfully!"
export const REFUND_SUCCESSFULLY = "Refund Successfully!"
export const TRANSFER_SUCCESSFULLY = "Transfer Successfully!"
export const FORGET_ME_REQUEST_SUCCESSFULLY = "Forget Me Requested Successfully!"
export const CANCEL_FORGET_ME_REQUEST_SUCCESSFULLY = "Cancel Forget Me Requested Successfully!"

export const UPDATE_FAILED = "Update Failed!"

export const ORGANIZATION_TYPE_ID_FOR_PROGRAM_APPLICATION = 1000

export const MAX_PAGE_SIZE = 1000
export const MIN_START_POSITION_SIZE = 0

export const ACC_INDIVIDUAL = 1000
export const ACC_AFFILIATED = 1
export const AFF_ROLE_PURCHASER = 8

//Account affiliation status
export const ACCOUNT_AFFILIATION_STATUS_ACTIVE = 1
export const ACCOUNT_AFFILIATION_STATUS_INACTIVE = 2
export const ACCOUNT_AFFILIATION_STATUS_PENDING = 3
export const ACCOUNT_AFFILIATION_STATUS_REJECTED = 4

export const CURRENT_ORG_ID = 1

export const PT_FULLTIME_STATUS = 0
export const PT_PARTTIME_STATUS = 1000

export const REASON_HOLD_APPLY = 1
export const REASON_HOLD_RELEASE = 2
export const REASON_MEMBERSHIP = 3

export const PERSON_CONTACT_PEFERRED_POSITION = 1

export const PAY_LATER_ALLOWED = 1
export const PAY_LATER_WITH_PO = 2
export const PAY_LATER_NOT_ALLOWED = -1

export const PAYMENT_GATEWAY_ACCOUNT_ID_STUB = 9
export const ALL_REQUIRED_POLICY_TYPE = 1

export const DEPOSIT_TRANSACTION_TYPE_ID = 1
export const REFUND_TRANSACTION_TYPE_ID = 2
export const TRANSFER_TRANSACTION_TYPE_ID = 3

export const REGISTRATION_ENROLLMENT_STATUS_COMPLETED = "Completed"

export const CERTIFICATE_CATEGORY_DEFAULT = 1000
