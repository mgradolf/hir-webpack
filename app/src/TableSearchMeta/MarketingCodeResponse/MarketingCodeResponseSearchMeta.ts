import { getMarketingCategory } from "~/ApiServices/Service/MarketingService"
import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField } from "~/Component/Common/Form/common"
import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"
import { MarketingCodeLookup } from "~/Component/Common/Form/FormLookupFields/MarketingCodeLookup"
import { OfferingLookupButton } from "~/Component/Common/Form/FormLookupFields/OfferingLookup"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { ProgramLookup } from "~/Component/Common/Form/FormLookupFields/ProgramLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { FormFieldSelector } from "~/Component/Common/Form/FormFieldSelectors/FormFieldSelector"

export const MarketingCodeResponseSearchMeta: IField[] = [
  {
    label: "Promotion Code",
    fieldName: "MarketingCodeID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: MarketingCodeLookup
  },
  {
    label: "Category",
    inputType: DROPDOWN,
    refLookupService: () => getMarketingCategory({}),
    fieldName: "CategoryID",
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Lookup",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: FormFieldSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Section",
          fieldName: "SectionId",
          valueKey: "SectionID",
          component: SectionLookup
        },
        {
          label: "Offering",
          fieldName: "OfferingID",
          valueKey: "OfferingID",
          component: OfferingLookupButton
        },
        {
          label: "Program",
          fieldName: "ProgramID",
          valueKey: "ProgramID",
          component: ProgramLookup
        }
      ]
    }
  },
  {
    label: "Order Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "StartDate",
    valueKey: "StartDate",
    displayKey2: "To",
    valueKey2: "EndDate",
    fieldName2: "EndDate"
  },
  {
    label: "Purchaser",
    fieldName: "PersonID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: PersonLookup
  },
  {
    label: "Account",
    fieldName: "AccountID",
    valueKey: "AccountID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: AccountLookup
  }
]
