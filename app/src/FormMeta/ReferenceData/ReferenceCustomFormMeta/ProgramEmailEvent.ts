import { getSystemEvent } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DROPDOWN, IField, NUMBER, TEXT, TEXTAREA } from "~/Component/Common/Form/common"

export const FormMeta: IField[] = [
  {
    label: "Name",
    fieldName: "Name",
    inputType: TEXT
  },
  {
    label: "Description",
    fieldName: "Description",
    inputType: TEXT
  },
  {
    label: "SortPosition",
    fieldName: "SortPosition",
    inputType: NUMBER
  },
  {
    label: "Is Active",
    fieldName: "IsActive",
    inputType: BOOLEAN
  },
  {
    label: "Mime Type",
    fieldName: "DefaultMimeType",
    inputType: TEXT
  },
  {
    label: "Default Subject",
    fieldName: "DefaultSubject",
    inputType: TEXT
  },
  {
    label: "Default Message",
    fieldName: "DefaultMessage",
    inputType: TEXTAREA
  },
  {
    label: "System Event",
    inputType: DROPDOWN,
    fieldName: "SystemEventID",
    refLookupService: getSystemEvent,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Component ID",
    fieldName: "ComponentID",
    inputType: TEXT
  }
]
