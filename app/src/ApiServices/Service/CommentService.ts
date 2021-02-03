import CommentService, { config } from "@packages/api/lib/proxy/Service/CommentService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function addStudentComment(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CommentService[config.Actions.addStudentComment](Params, Headers)
}

export function addFacultyComment(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CommentService[config.Actions.addFacultyComment](Params, Headers)
}

export function addEnrollmentComment(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CommentService[config.Actions.addEnrollmentComment](Params, Headers)
}

export function addSectionComment(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CommentService[config.Actions.addSectionComment](Params, Headers)
}

export function addSectionFacultyComment(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CommentService[config.Actions.addSectionFacultyComment](Params, Headers)
}

export function findStudentComments(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CommentService[config.Actions.findStudentComments](Params, Headers)
}

export function findFacultyComments(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CommentService[config.Actions.findFacultyComments](Params, Headers)
}

export function findEnrollmentComments(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CommentService[config.Actions.findEnrollmentComments](Params, Headers)
}

export function findSectionComments(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CommentService[config.Actions.findSectionComments](Params, Headers)
}

export function findSectionFacultyComments(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CommentService[config.Actions.findSectionFacultyComments](Params, Headers)
}

export function deleteStudentComment(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CommentService[config.Actions.deleteStudentComment](Params, Headers)
}

export function deleteFacultyComment(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CommentService[config.Actions.deleteFacultyComment](Params, Headers)
}

export function deleteEnrollmentComment(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CommentService[config.Actions.deleteEnrollmentComment](Params, Headers)
}

export function deleteSectionComment(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CommentService[config.Actions.deleteSectionComment](Params, Headers)
}

export function deleteSectionFacultyComment(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return CommentService[config.Actions.deleteSectionFacultyComment](Params, Headers)
}
