import { getMarketingCodeRelatedTagTypes } from "~/ApiServices/BizApi/marketingCode/marketingCodeIf"
import { getMarketingCategory } from "~/ApiServices/Service/MarketingService"
import { DATE_PICKERS, DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"

export const MarketingCodeRepositorySearchMeta: IField[] = [
  {
    label: "Code",
    inputType: TEXT,
    fieldName: "Name"
  },
  {
    label: "Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "StartDate",
    valueKey: "StartDate",
    displayKey2: "To",
    valueKey2: "EndDate",
    fieldName2: "EndDate"
  },
  {
    label: "Category",
    inputType: DROPDOWN,
    fieldName: "CategoryID",
    refLookupService: () => getMarketingCategory({}),
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Tag",
    inputType: TEXT,
    fieldName: "TagName"
  },
  {
    label: "Tag Type",
    inputType: DROPDOWN,
    refLookupService: () => getMarketingCodeRelatedTagTypes({}),
    fieldName: "TagTypeID",
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Active",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ],
    fieldName: "IsActive"
  }
]
