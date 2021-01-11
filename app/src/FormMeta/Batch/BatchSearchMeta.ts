import { getBatchTypes } from "~/ApiServices/Service/BatchImportService"
import { getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const BatchSearchMeta: IFilterField[] = [
  {
    label: "Type*",
    inputType: DROPDOWN,
    fieldName: "Type",
    refLookupService: () =>
      getBatchTypes().then((x) => {
        if (x.success) x.data = x.data.BatchTypes
        return x
      }),
    displayKey: "FullName",
    valueKey: "FullName"
  },
  // {
  //   label: "Status",
  //   inputType: DROPDOWN,
  //   fieldName: "StatusID",
  //   refLookupService: getBatchTypes,
  //   displayKey: "FullName",
  //   valueKey: "FullName"
  // },
  {
    label: "Source",
    inputType: DROPDOWN,
    fieldName: "SourceID",
    refLookupService: getSourceModule,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Account Name",
    inputType: TEXT,

    fieldName: "AccountName",
    ariaLabel: "Account Name"
  },
  {
    label: "Uploaded By",
    inputType: TEXT,
    fieldName: "CreatedBy"
  },
  {
    label: "File",
    inputType: TEXT,
    fieldName: "FileName"
  },
  {
    label: "Date Between",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "CreatedFromDate",
    valueKey: "FromFinalEnrollmentDate",
    displayKey2: "To",
    fieldName2: "CreatedToDate",
    valueKey2: "ToFinalEnrollmentDate"
  }
]
