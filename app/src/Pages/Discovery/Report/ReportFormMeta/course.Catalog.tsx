import { IFilterField } from "~/Component/Common/SearchFilters/common"
import { SearchCatalogLookup } from "~/Component/Common/SearchFilters/SearchLookups/SearchCatalogLookup"

const meta: IFilterField[] = [
  {
    label: "Catalog",
    fieldName: "CatalogID",
    customFilterComponent: SearchCatalogLookup
  }
]

export default meta
