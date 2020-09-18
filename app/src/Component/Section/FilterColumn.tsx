import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { RecordType } from "~/Component/ResponsiveTable"

const TEXT = "TEXT"
const SELECT = "SELECT"
const SELECT_ASYNC = "SELECT_ASYNC"
const DATE_PICKER = "DATE_PICKER"
const DATE_PICKERS = "DATE_PICKERS"

type IFilterFieldType = typeof TEXT | typeof SELECT | typeof SELECT_ASYNC | typeof DATE_PICKER | typeof DATE_PICKERS

interface IFilterField {
  label: string
  inputType: IFilterFieldType
  defaultValue?: string
  placeholder?: string

  fieldName?: string
  displayKey?: string
  valueKey?: string
  ariaLabel: string

  fieldName2?: string
  ariaLabel2?: string
  displayKey2?: string
  valueKey2?: string

  options?: any[]
  refLookupService: () => Promise<IApiResponse>
}

export interface IFilterValues extends RecordType {
  OfferingCode: string
  OfferingName: string
  ToCreationDate: string
  FromCreationDate: string
  ToTerminationDate: string
  FromTerminationDate: string
  IsQuickAdmit: string
  StatusID: string
  Coordinator: string
  OrganizationID: string
  OfferingTypeID: string
  SectionTypeID: string
  InstructorID: string
  ShowProgramOffering: string
  TagName: string
  TagTypeID: string
  IsSearchTagHierarchy: string
  OfferingNearCapacity: string
  ToFinalEnrollmentDate: string
  FromFinalEnrollmentDate: string
}

// const fieldNames = {
//   SectionNumber: "SectionNumber",
//   OfferingCode: "OfferingCode",
//   OfferingName: "OfferingName",
//   SectionFacultyLastName: "SectionFacultyLastName",
//   SectionFacultyFirstName: "SectionFacultyFirstName",
//   ToTerminationDate: "ToTerminationDate",
//   ToCreationDate: "ToCreationDate",
//   OrganizationID: "OrganizationID",
//   RoomID: "RoomID",
//   Coordinator: "Coordinator",
//   FromTerminationDate: "FromTerminationDate",
//   FromCreationDate: "FromCreationDate",
//   SectionStatusCodeID: "SectionStatusCodeID",
//   MeetsOn: "MeetsOn",
//   IsQuickAdmit: "IsQuickAdmit",
//   ToStartDate: "ToStartDate",
//   FromStartDate: "FromStartDate",
//   MeetingType: "MeetingType",
//   ComboSearchTagHierarchy: "ComboSearchTagHierarchy",
//   ComboSearchTagTypeIDHierarchy: "ComboSearchTagTypeIDHierarchy"
// }

interface IFilterGenericComponentProps extends IFilterField {
  filterValueChanged: (key: string, value: any) => void
}

// const metaData: Array<IFilterField> = [
//   {
//     label: 'Offering Code',
//     inputType: TEXT,
//     defaultValue: '',
//     fieldName:
//   }
// ]
