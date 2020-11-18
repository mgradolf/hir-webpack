import {
  REGISTRATION_VERIFICATION,
  REGISTRATION_VERIFICATION_DETAILS,
  REGISTRATION_VERIFICATION_NAME,
  REGISTRATION_VERIFICATION_REQUEST_NAME
} from "./Constants"

export default (registrationCheckKey: string, responseData: any): { [key: string]: any } => {
  if (registrationCheckKey === REGISTRATION_VERIFICATION.PREREQUISITE_CHECK) {
    return {
      Name: REGISTRATION_VERIFICATION_NAME.PREREQUISITE_CHECK,
      RequestName: [REGISTRATION_VERIFICATION_REQUEST_NAME.PREREQUISITE_CHECK],
      Details: responseData[REGISTRATION_VERIFICATION_DETAILS.check_prerequisiteconflict_conflicts],
      IsWaive: true
    }
  }
  if (registrationCheckKey === REGISTRATION_VERIFICATION.SCHEDULE_CONFLICT_CHECK) {
    return {
      Name: REGISTRATION_VERIFICATION_NAME.SCHEDULE_CONFLICT_CHECK,
      RequestName: [REGISTRATION_VERIFICATION_REQUEST_NAME.SCHEDULE_CONFLICT_CHECK],
      Details: null,
      IsWaive: true
    }
  }
  if (registrationCheckKey === REGISTRATION_VERIFICATION.REGISTRATION_QUESTION_CHECK) {
    return {
      Name: REGISTRATION_VERIFICATION_NAME.REGISTRATION_QUESTION_CHECK,
      RequestName: [REGISTRATION_VERIFICATION_REQUEST_NAME.REGISTRATION_QUESTION_CHECK],
      Details: null,
      IsWaive: true
    }
  }
  if (registrationCheckKey === REGISTRATION_VERIFICATION.STUDENT_ON_HOLE_CHECK) {
    return {
      Name: REGISTRATION_VERIFICATION_NAME.STUDENT_ON_HOLE_CHECK,
      RequestName: [
        REGISTRATION_VERIFICATION_REQUEST_NAME.STUDENT_ON_HOLE_CHECK,
        REGISTRATION_VERIFICATION_REQUEST_NAME.STUDENT_ON_HOLE_CHECK_WITH_MESSAGE
      ],
      Details: null,
      IsWaive: false
    }
  }
  if (registrationCheckKey === REGISTRATION_VERIFICATION.DUPLICATE_REQUEST_CHECK) {
    return {
      Name: REGISTRATION_VERIFICATION_NAME.DUPLICATE_REQUEST_CHECK,
      RequestName: [],
      Details: null,
      IsWaive: false
    }
  }
  if (registrationCheckKey === REGISTRATION_VERIFICATION.REGISTRATION_CHECK) {
    return {
      Name: REGISTRATION_VERIFICATION_NAME.REGISTRATION_CHECK,
      RequestName: [],
      Details: null,
      IsWaive: false
    }
  }
  if (registrationCheckKey === REGISTRATION_VERIFICATION.SECTION_VALIDITY_CHECK) {
    return {
      Name: REGISTRATION_VERIFICATION_NAME.SECTION_VALIDITY_CHECK,
      RequestName: [],
      Details: responseData[REGISTRATION_VERIFICATION_DETAILS.check_sectionvalidity_issues],
      IsWaive: false
    }
  }
  return {}
}
