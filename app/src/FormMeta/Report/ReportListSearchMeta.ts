import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { getReportList } from "~/ApiServices/Service/ReportService"
import { DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"

export const ReportListSearchMeta: IField[] = [
  {
    label: "Report Name",
    inputType: TEXT,
    fieldName: "ReportLabel"
  },
  {
    label: "Folder",
    inputType: DROPDOWN,
    fieldName: "Folder",
    displayKey: "Folder",
    valueKey: "Folder",
    refLookupService: () => {
      return getReportList({}).then((x: IApiResponse) => {
        if (x.success) {
          const folders: any = {}
          x.data = x?.data?.Reports?.forEach((report: any) => {
            folders[report.Folder] = report.Folder
          })
          x.data = []
          for (const folder of Object.keys(folders)) {
            x.data.push({ Folder: folder })
          }
        }
        return x
      })
    }
  }
]
