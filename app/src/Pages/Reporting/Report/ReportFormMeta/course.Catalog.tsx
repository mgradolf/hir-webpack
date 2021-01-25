import { CUSTOM_FIELD, IField } from "~/Component/Common/SearchFilters/SearchForm/common"
import { SearchCatalogLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchCatalogLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Catalog",
    fieldName: "CatalogID",
    customFilterComponent: SearchCatalogLookup,
    inputType: CUSTOM_FIELD
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
