import { CUSTOM_FIELD, DATE_PICKERS, DROPDOWN, IField } from "~/Component/Common/Form/common"
import { FormFieldSelector } from "~/Component/Common/Form/FormFieldSelectors/FormFieldSelector"
import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"
import { OfferingLookupButton } from "~/Component/Common/Form/FormLookupFields/OfferingLookup"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"
import { SectionLookup } from "~/Component/Common/Form/FormLookupFields/SectionLookup"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"

export const WaitlistEntriesSearchMeta: IField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup
  },
  {
    label: "Offering",
    fieldName: "OfferingID",
    inputType: CUSTOM_FIELD,
    customFilterComponent: OfferingLookupButton
  },
  {
    label: "Creation Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "CreationTimeFrom",
    valueKey: "CreationTimeFrom",
    displayKey2: "To",
    valueKey2: "CreationTimeTo",
    fieldName2: "CreationTimeTo"
  },
  {
    label: "Expiration Date",
    inputType: DATE_PICKERS,
    displayKey: "From",
    fieldName: "RequestExpirationTimeFromExclusive",
    valueKey: "RequestExpirationTimeFromExclusive",
    displayKey2: "To",
    fieldName2: "RequestExpirationTimeToExclusive",
    valueKey2: "RequestExpirationTimeToExclusive"
  },

  // {
  //   label: "Account/Person",
  //   fieldName: "SiteID",
  //   inputType: CUSTOM_FIELD,
  //   customFilterComponent: WaitlistSearchCustomLookupFilter
  // },
  {
    label: "Lookup",
    fieldName: "",
    inputType: CUSTOM_FIELD,
    customFilterComponent: FormFieldSelector,
    extraProps: {
      selectorKeys: [
        {
          label: "Account",
          fieldName: "AccountID",
          valueField: "AccountID",
          component: AccountLookup
        },
        {
          label: "Purchaser",
          fieldName: "RequesterPersonID",
          valueField: "PersonID",
          component: PersonLookup
        },
        {
          label: "Student",
          fieldName: "RecipientPersonID",
          valueField: "PersonID",
          component: StudentLookup
        },
        {
          label: "Purchaser/Student",
          fieldName: "RequesterRecipientPersonID1",
          valueField: "PersonID",
          component: PersonLookup
        }
      ]
    }
  },
  {
    label: "Active",
    inputType: DROPDOWN,
    fieldName: "IsActive",
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ]
  }
]
