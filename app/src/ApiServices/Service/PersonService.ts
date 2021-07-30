import PersonService, { config } from "@packages/api/lib/proxy/Service/PersonService"
import PersonEmailService, { emailConfig } from "@packages/api/lib/proxy/Service/PersonEmailService"
import PersonPhoneService, { phoneConfig } from "@packages/api/lib/proxy/Service/PersonPhoneService"
import PersonAddressService, { addressConfig } from "@packages/api/lib/proxy/Service/PersonAddressService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { getDisabilityType } from "~/ApiServices/Service/RefLookupService"

export function createPersonRecordInRoles(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.createPersonRecordInRoles](Params, Headers)
}

export function getPersonDetails(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.getPersonDetails](Params, Headers).then((x) => {
    if (x.success && Array.isArray(x.data)) {
      if (x.data[0].Ethnicity) {
        const ethnicityIDs: Array<any> = []
        x.data[0].Ethnicity.map((ethnicity: any) => {
          ethnicityIDs.push(ethnicity.EthnicityTypeID)
          return ethnicityIDs
        })
        x.data[0].EthnicityTypeIDs = ethnicityIDs
      }
    }
    return x
  })
}

export function setupWebLogin(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.setupWebLogin](Params, Headers)
}

export function getPersonLogin(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.getPersonLogin](Params, Headers)
}

export function getRegions(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.getRegions](Params, Headers)
}

export function pushPerson(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.pushPerson](Params, Headers)
}

export function canPushPerson(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.canPushPerson](Params, Headers)
}

export function removePerson(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PersonService[config.Actions.removePerson](Params, Headers)
}

export function pushPersonEmail(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonEmailService[emailConfig.Actions.pushPersonEmail](Params, Headers)
}

export function deletePersonEmail(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonEmailService[emailConfig.Actions.deletePersonEmail](Params, Headers)
}

export function pushPersonPhone(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonPhoneService[phoneConfig.Actions.pushPersonPhone](Params, Headers)
}

export function findPreferredTelephone(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonPhoneService[phoneConfig.Actions.findPreferredTelephone](Params, Headers)
}

export function deletePersonPhone(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonPhoneService[phoneConfig.Actions.deletePersonPhone](Params, Headers)
}

export function pushPersonAddress(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonAddressService[addressConfig.Actions.pushPersonAddress](Params, Headers)
}

export function findAddresses(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PersonAddressService[addressConfig.Actions.findAddresses](Params, Headers)
}

export function deletePersonAddress(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonAddressService[addressConfig.Actions.deletePersonAddress](Params, Headers)
}

export function removePersonEducationHistory(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.removePersonEducationHistory](Params, Headers)
}

export function updatePersonEducationHistory(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.updatePersonEducationHistory](Params, Headers)
}

export function createPersonEducationHistory(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.createPersonEducationHistory](Params, Headers)
}

export function findPersonEducationHist(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.findPersonEducationHist](Params, Headers)
}

export function getPersonDisabilities(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.getPersonDisabilities](Params, Headers)
}

export function getDisabilities(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return Promise.all([getDisabilityType(), getPersonDisabilities({ PersonID: Params.PersonID })]).then((responses) => {
    const response1 = responses[0]
    const response2 = responses[1]
    if (response1.success && response2.success) {
      Object.keys(response1.data).forEach((disabilityType: any) => {
        response1.data[disabilityType]["IsPublished"] = false
        Object.keys(response2.data).forEach((personDisability: any) => {
          if (response1.data[disabilityType].ID === response2.data[personDisability].DisabilityTypeID) {
            response1.data[disabilityType]["IsPublished"] = true
            return false
          }
        })
      })
      return response1
    } else if (response2.success) {
      return response2
    } else {
      return response1
    }
  })
}

export function savePersonDisabilities(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.savePersonDisabilities](Params, Headers)
}

export function getFacultySchedule(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.getFacultySchedule](Params, Headers)
}

export function findCountry(Params: { [key: string]: any }, Headers?: { [key: string]: any }): Promise<IApiResponse> {
  return PersonAddressService[addressConfig.Actions.findCountry](Params, Headers)
}

export function getDegreeProgram(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.getDegreeProgram](Params, Headers)
}

export function findPersonsByAccount(
  Params: { [key: string]: any },
  Headers?: { [key: string]: any }
): Promise<IApiResponse> {
  return PersonService[config.Actions.findPersonsByAccount](Params, Headers)
}
