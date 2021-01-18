//TODO: Fix API
import { DATE_PICKERS, IFilterField } from "~/Component/Common/SearchFilters/common"

export const CertificateDefinitionSearchMeta: IFilterField[] = [
  {
    label: "Certificate Name",
    fieldName: "certificateName"
  },
  {
  //TODO: Department dropdown
    label: "Department",
    fieldName: "organizationID"
  },
  {
  //TODO: active dropdown
    label: "Active",
    fieldName: "isActive"
  },  
  {
  //TODO: true = Program, false = Offering
    label: "Certificate Type",
    fieldName: "isProgramCertificate"
  },
  //TODO: ref table CertificateCategoryType
  {
    label: "Certificate Category",
    fieldName: "certificateCategoryTypeID",
    customFilterComponent: SearchOfferingLookupButton
  }
]

