import ActivityService, { config } from "@packages/api/lib/proxy/Service/ActivityService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function getStudentAcademicActivity(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ActivityService[config.Actions.getStudentAcademicActivity](Params)
}

export function getStudentEnrollmentActivity(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ActivityService[config.Actions.getStudentEnrollmentActivity](Params)
}

export function getOrderActivity(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ActivityService[config.Actions.getOrderActivity](Params)
}

export function getCreditMemoActivity(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ActivityService[config.Actions.getCreditMemoActivity](Params)
}

export function getPaymentActivity(Params: { [key: string]: any }): Promise<IApiResponse> {
  return ActivityService[config.Actions.getPaymentActivity](Params)
}

export function getSystemSchedules(Params: { [key: string]: any }): Promise<IApiResponse> {
  if (Params["Completed"] === "CompletedOnly") {
    Params["CompletedOnly"] = 0
  } else if (Params["Completed"] === "IncompleteOnly") {
    Params["IncompleteOnly"] = 0
  }
  delete Params["Completed"]
  return ActivityService[config.Actions.getSystemSchedules](Params)
}
