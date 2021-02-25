import { getOrganizations, getSourceModule } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKERS, DROPDOWN, IField } from "~/Component/Common/Form/common"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"
import { generateMMDDYY } from "~/utils/MMDDYYGenerator"

const meta: IField[] = [
  {
    label: "Registration Date",
    fieldName: "date_start",
    fieldName2: "date_end",
    rules: [{ required: true, message: "Date field is Required" }],
    inputType: DATE_PICKERS
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Registration Source",
    inputType: DROPDOWN,
    fieldName: "sourceAll",
    refLookupService: () =>
      getSourceModule().then((x) => {
        if (x.success) {
          x.data = [{ Name: "None", ID: undefined }, ...x.data]
        }
        return x
      }),
    displayKey: "Name",
    valueKey: "ID"
  }
]

const reportMeta: IReportMeta = {
  meta,
  initialFormValue: {
    date_start: generateMMDDYY(new Date()),
    date_end: generateMMDDYY(new Date()),
    sourceAll: 2
  }
}

export default reportMeta
