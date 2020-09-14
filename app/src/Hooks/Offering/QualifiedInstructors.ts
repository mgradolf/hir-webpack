import { useState, useEffect } from "react"
import { searchFaculties } from "~/ApiServices/BizApi/faculty/facultyIf"
import {
  getCountries,
  getEthnicityTypes,
  getGenderTypes,
  getInstitutionStatusTypes,
  getInstructorTypes,
  getOrganizations,
  getRegionCodes
} from "~/ApiServices/Service/RefLookupService"
import { IFilterValues as IInstructorFilterValues } from "~/Component/Offering/QualifiedInstructor/QualifiedInstructorFilterColumn"

const INITIAL_INSTRUCTOR_FILTER_DATA: IInstructorFilterValues = {
  LastName: "",
  FirstName: "",
  FacultySerialNum: "",
  InstructorTypeID: "",
  TelephoneNumber: "",
  IsDeceased: "",
  PostalCode: "",
  CountryCodeID: "",
  Birthday: "",
  InstitutionStatusCodeID: "",
  OrganizationID: "",
  TaughtOfferingID: "",
  GenderTypeID: "",
  AvailableForSectionID: "",
  RegionCodeID: "",
  EthnicityTypeID: "",
  GovID: "",
  LastTaughtDate: "",
  CanTeachOfferingID: ""
}

export function useInstructorFilterState(state = INITIAL_INSTRUCTOR_FILTER_DATA) {
  const [filterData, updateFilterData] = useState<IInstructorFilterValues>(state)
  return { filterData, updateFilterData }
}

export function useInstructors(filterData: IInstructorFilterValues): [boolean, any[]] {
  const [instructorItems, setInstructorItems] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadInstructors = async function () {
      setLoading(true)

      const params: { [key: string]: any } = {}

      params["LastName"] = filterData.LastName !== "" ? filterData.LastName : "*"
      params["FIrstName"] = filterData.FirstName !== "" ? filterData.FirstName : undefined
      params["FacultySerialNum"] = filterData.FacultySerialNum !== "" ? filterData.FacultySerialNum : undefined
      params["InstructorTypeID"] = filterData.InstructorTypeID !== "" ? Number(filterData.InstructorTypeID) : undefined
      params["TelephoneNumber"] = filterData.TelephoneNumber !== "" ? filterData.TelephoneNumber : undefined
      params["IsDeceased"] = filterData.IsDeceased !== "" ? filterData.IsDeceased : undefined
      params["PostalCode"] = filterData.PostalCode !== "" ? filterData.PostalCode : undefined
      params["CountryCodeID"] = filterData.CountryCodeID !== "" ? Number(filterData.CountryCodeID) : undefined
      params["Birthday"] = filterData.Birthday !== "" ? filterData.Birthday : undefined
      params["InstitutionStatusCodeID"] =
        filterData.InstitutionStatusCodeID !== "" ? Number(filterData.InstitutionStatusCodeID) : undefined
      params["OrganizationID"] = filterData.OrganizationID !== "" ? Number(filterData.OrganizationID) : undefined
      params["TaughtOfferingID"] = filterData.TaughtOfferingID !== "" ? Number(filterData.TaughtOfferingID) : undefined

      params["GenderTypeID"] = filterData.GenderTypeID !== "" ? Number(filterData.GenderTypeID) : undefined
      params["AvailableForSectionID"] =
        filterData.AvailableForSectionID !== "" ? Number(filterData.AvailableForSectionID) : undefined
      params["RegionCodeID"] = filterData.RegionCodeID !== "" ? Number(filterData.RegionCodeID) : undefined
      params["EthnicityTypeID"] = filterData.EthnicityTypeID !== "" ? Number(filterData.EthnicityTypeID) : undefined
      params["GovID"] = filterData.GovID !== "" ? Number(filterData.GovID) : undefined
      params["LastTaughtDate"] = filterData.LastTaughtDate !== "" ? filterData.LastTaughtDate : undefined
      params["CanTeachOfferingID"] =
        filterData.CanTeachOfferingID !== "" ? Number(filterData.CanTeachOfferingID) : undefined

      const objectKeys = Object.keys(params)
      objectKeys.forEach((key) => {
        if (params[key] === undefined) {
          delete params[key]
        }
      })

      const result = await searchFaculties([params])

      if (result && result.success) {
        setInstructorItems(result.data)
      }
      setLoading(false)
    }
    loadInstructors()
  }, [filterData])

  return [loading, instructorItems]
}

type InstructorTypes = Array<any>
type GenderTypes = Array<any>
type RegionCodes = Array<any>
type EthnicityTypes = Array<any>
type Organizations = Array<any>
type Countries = Array<any>
type InstitutionStatusTypes = Array<any>

type QualifiedInstructorFilterData = [
  InstructorTypes,
  GenderTypes,
  RegionCodes,
  EthnicityTypes,
  Organizations,
  Countries,
  InstitutionStatusTypes
]

export function useQualifiedInstructorFilterData(): QualifiedInstructorFilterData {
  const [instructorTypes, setInstructorTypes] = useState<Array<any>>([])
  const [genderTypes, setGenderTypes] = useState<Array<any>>([])
  const [regionCodes, setRegionCodes] = useState<Array<any>>([])
  const [ethnicityTypes, setEthnicityTypes] = useState<Array<any>>([])
  const [organizations, setOrganizations] = useState<Array<any>>([])
  const [countries, setCountries] = useState<Array<any>>([])
  const [institutionStatuses, setInstitutionStatuses] = useState<Array<any>>([])

  useEffect(() => {
    ;(async () => {
      const response = await getInstructorTypes()
      if (response && response.data && Array.isArray(response.data)) {
        setInstructorTypes(response.data)
      }
    })()
    ;(async () => {
      const response = await getGenderTypes()
      if (response && response.data && Array.isArray(response.data)) {
        setGenderTypes(response.data)
      }
    })()
    ;(async () => {
      const response = await getRegionCodes()
      if (response && response.data && Array.isArray(response.data)) {
        setRegionCodes(response.data)
      }
    })()
    ;(async () => {
      const response = await getEthnicityTypes()
      if (response && response.data && Array.isArray(response.data)) {
        setEthnicityTypes(response.data)
      }
    })()
    ;(async () => {
      const response = await getOrganizations()
      if (response && response.data) {
        setOrganizations(response.data)
      }
    })()
    ;(async () => {
      const response = await getCountries()
      if (response && response.data) {
        setCountries(response.data)
      }
    })()
    ;(async () => {
      const response = await getInstitutionStatusTypes()
      if (response && response.data) {
        setInstitutionStatuses(response.data)
      }
    })()
  }, [])

  return [instructorTypes, genderTypes, regionCodes, ethnicityTypes, organizations, countries, institutionStatuses]
}
