import { CUSTOM_FIELD, IField } from "~/Component/Common/Form/common"
import { CatalogLookup } from "~/Component/Common/Form/FormLookupFields/CatalogLookup"
import { IReportMeta } from "~/Pages/Reporting/Report/IReportMeta"

const meta: IField[] = [
  {
    label: "Catalog",
    fieldName: "CatalogID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: CatalogLookup,
    rules: [{ required: true, message: "Catalog is Required" }],
    extraProps: {
      isArray: true
    }
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta
