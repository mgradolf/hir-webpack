import SectionService, { config } from "@packages/api/lib/proxy/Service/SectionService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

export function addOfferingFinancials(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.addOfferingFinancials](Params, Headers)
}

export function addInstructorFinancials(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.addInstructorFinancials](Params, Headers)
}

export function addMarketingProgramFinancials(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.addMarketingProgramFinancials](Params, Headers)
}

export function addResourceFinancials(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.addResourceFinancials](Params, Headers)
}

export function addSectionDiscount(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.addSectionDiscount](Params, Headers)
}

export function getSectionDetails(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.getSectionDetails](Params, Headers)
}

export function getSectionStatistics(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.getSectionStatistics](Params, Headers)
}

export function findAffiliatedOrgsForSeatGroup(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.findAffiliatedOrgsForSeatGroup](Params, Headers)
}

// export function saveAffiliatedOrg(SeatGroupID: number, AffiliateAccountIDs: number): Promise<IApiResponse> {
//   return SectionService[config.Actions.saveAffiliatedOrg]({
//     SeatGroupID,
//     AffiliateAccountIDs
//   })
// }

export function getMeetings(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.getMeetings](Params, Headers)
}

export function createMeetings(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.createMeetings](Params, Headers)
}

export function saveMeetings(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return SectionService[config.Actions.saveMeetings](Params, Headers)
}

export function updateSection(Params: { [key: string]: any }, Headers?: { [key: string]: any }) {
  return SectionService[config.Actions.updateSection](Params, Headers)
}

export function copySection(Params: { [key: string]: any }, Headers?: { [key: string]: any }) {
  return SectionService[config.Actions.copySection](Params, Headers)
}

export function saveFinancial(Params: { [key: string]: any }, Headers?: { [key: string]: any }) {
  return SectionService[config.Actions.saveFinancial](Params, Headers)
}

export function saveFinancials(Params: { [key: string]: any }, Headers?: { [key: string]: any }) {
  return SectionService[config.Actions.saveFinancials](Params, Headers)
}

export function getSectionFinancials(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.getSectionFinancials](Params, Headers)
}

export function getSectionFinancialsCombined(SeatGroupID?: number, SectionID?: number): Promise<IApiResponse> {
  return Promise.all([getSectionFinancials({ SectionID, SeatGroupID }), getSectionFinancials({ SectionID })]).then(
    (responses) => {
      const response1 = responses[0]
      const response2 = responses[1]
      if (response1.success && response2.success) {
        Object.keys(response2.data).forEach((sectionFinancial: any) => {
          response2.data[sectionFinancial]["IsPublished"] = false
          Object.keys(response1.data).forEach((seatGroupFinancial: any) => {
            if (
              response2.data[sectionFinancial].SectionFinancialID ===
              response1.data[seatGroupFinancial].SectionFinancialID
            ) {
              response2.data[sectionFinancial]["IsPublished"] = true
              return false
            }
          })
        })
        return response2
      } else if (response2.success) {
        return response2
      } else {
        return response1
      }
    }
  )
}

export function getAvailableOfferingFinancials(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.getAvailableOfferingFinancials](Params, Headers)
}

export function getAvailableFacultyWithFinancials(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.getAvailableFacultyWithFinancials](Params, Headers)
}

export function saveSectionDiscount(Params: { [key: string]: any }, Headers?: { [key: string]: any }) {
  return SectionService[config.Actions.saveSectionDiscount](Params, Headers)
}

export function removeSectionDiscounts(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.removeSectionDiscounts](Params, Headers)
}

export function getSectionDiscounts(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.getSectionDiscounts](Params, Headers)
}

export function getAvailableDiscountPrograms(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.getAvailableDiscountPrograms](Params, Headers)
}

export function getAvailableResourcesWithFinancials(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.getAvailableResourcesWithFinancials](Params, Headers)
}

export function getAvailableMarketingProgramsWithFinancials(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.getAvailableMarketingProgramsWithFinancials](Params, Headers)
}

export function saveSectionNotification(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.saveSectionNotification](Params, Headers)
}

export function getSectionNotifications(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.getSectionNotifications](Params, Headers)
}

export function removeFinancials(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.removeFinancials](Params, Headers)
}

export function removeMeetings(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.removeMeetings](Params, Headers)
}

export function removeLocations(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.removeLocations](Params, Headers)
}

export function removeInstructors(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.removeInstructors](Params, Headers)
}

export function removeMeetingInformations(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return SectionService[config.Actions.removeMeetingInformations](Params, Headers)
}

// export function findRoom(Params: { [key: string]: any },Headers?: { [key: string]: any }) {
//   return SectionService[config.Actions.findRoom](Params,Headers)
// }

export function saveLocations(Params: { [key: string]: any }, Headers?: { [key: string]: any }) {
  return SectionService[config.Actions.saveLocations](Params, Headers)
}

export function saveGeneralComment(Params: { [key: string]: any }, Headers?: { [key: string]: any }) {
  return SectionService[config.Actions.saveGeneralComment](Params, Headers)
}

export function saveFacultyComment(Params: { [key: string]: any }, Headers?: { [key: string]: any }) {
  return SectionService[config.Actions.saveFacultyComment](Params, Headers)
}

export function saveEnrollmentComment(Params: { [key: string]: any }, Headers?: { [key: string]: any }) {
  return SectionService[config.Actions.saveEnrollmentComment](Params, Headers)
}

export function findGeneralCommentHistory(Params: { [key: string]: any }, Headers?: { [key: string]: any }) {
  return SectionService[config.Actions.findGeneralCommentHistory](Params, Headers)
}

export function findFacultyComments(Params: { [key: string]: any }, Headers?: { [key: string]: any }) {
  return SectionService[config.Actions.findFacultyComments](Params, Headers)
}

export function findEnrollmentCommentHistory(Params: { [key: string]: any }, Headers?: { [key: string]: any }) {
  return SectionService[config.Actions.findEnrollmentCommentHistory](Params, Headers)
}

export function findFaculty(Params: { [key: string]: any }, Headers?: { [key: string]: any }) {
  return SectionService[config.Actions.findFaculty](Params, Headers)
}

export function findEnrollmentStudentHistory(Params: { [key: string]: any }, Headers?: { [key: string]: any }) {
  return SectionService[config.Actions.findEnrollmentStudentHistory](Params, Headers)
}

export function scheduleInstructor(Params: { [key: string]: any }, Headers?: { [key: string]: any }) {
  return SectionService[config.Actions.scheduleInstructor](Params, Headers)
}

export function saveMeetingInformations(Params: { [key: string]: any }, Headers?: { [key: string]: any }) {
  return SectionService[config.Actions.saveMeetingInformations](Params, Headers)
}
