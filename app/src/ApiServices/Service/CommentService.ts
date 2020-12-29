import CommentService, { config } from "@packages/api/lib/proxy/Service/CommentService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function addStudentComment(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CommentService[config.Actions.addStudentComment](Params)
}

export function addFacultyComment(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CommentService[config.Actions.addFacultyComment](Params)
}

export function addEnrollmentComment(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CommentService[config.Actions.addEnrollmentComment](Params)
}

export function addSectionComment(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CommentService[config.Actions.addSectionComment](Params)
}

export function addSectionFacultyComment(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CommentService[config.Actions.addSectionFacultyComment](Params)
}

export function findStudentComments(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CommentService[config.Actions.findStudentComments](Params)
}

export function findFacultyComments(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CommentService[config.Actions.findFacultyComments](Params)
}

export function findEnrollmentComments(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CommentService[config.Actions.findEnrollmentComments](Params)
}

export function findSectionComments(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CommentService[config.Actions.findSectionComments](Params)
}

export function findSectionFacultyComments(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CommentService[config.Actions.findSectionFacultyComments](Params)
}


export function deleteStudentComment(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CommentService[config.Actions.deleteStudentComment](Params)
}

export function deleteFacultyComment(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CommentService[config.Actions.deleteFacultyComment](Params)
}

export function deleteEnrollmentComment(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CommentService[config.Actions.deleteEnrollmentComment](Params)
}

export function deleteSectionComment(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CommentService[config.Actions.deleteSectionComment](Params)
}

export function deleteSectionFacultyComment(Params: { [key: string]: any }): Promise<IApiResponse> {
  return CommentService[config.Actions.deleteSectionFacultyComment](Params)
}

