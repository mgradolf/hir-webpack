import { getCertificateCategoryType, getOrganizations } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"

export const CertificateDefinitionSearchMeta: IFilterField[] = [
  {
    label: "Certificate Name",
    fieldName: "certificateName",
    inputType: TEXT
  },
  {
    label: "Department",
    fieldName: "organizationID",
    inputType: DROPDOWN,
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Active",
    fieldName: "isActive",
    inputType: BOOLEAN
  },
  {
    label: "Certificate Type",
    fieldName: "isProgramCertificate",
    inputType: DROPDOWN,
    options: [
      { label: "Program", value: true },
      { label: "Offering", value: false }
    ]
  },
  {
    label: "Certificate Category",
    fieldName: "certificateCategoryTypeID",
    inputType: DROPDOWN,
    refLookupService: getCertificateCategoryType
  }
]
