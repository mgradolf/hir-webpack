import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchCatalogLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchCatalogLookup"
import { IReportMeta } from "~/Pages/Discovery/Report/IReportMeta"

const meta: IFilterField[] = [
  {
    label: "Catalog",
    fieldName: "CatalogID",
    customFilterComponent: SearchCatalogLookup
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
