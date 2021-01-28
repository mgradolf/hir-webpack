import { CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"
import { SearchCatalogLookup } from "~/Component/Common/Form/SearchLookups/SearchCatalogLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Catalog",
    fieldName: "CatalogID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SearchCatalogLookup,
    rules: [{ required: true, message: "Catalog is Required" }]
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
