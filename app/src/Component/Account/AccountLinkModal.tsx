import * as React from "react"
import { LookupModal } from "~/Component/Common/Modal/LookupModal"
import { AccountSearchMeta } from "~/FormMeta/Account/AccountSearchMeta"
import { getAccountTableColumns } from "~/FormMeta/Account/AccountTableColumns"

interface IAccountLinkProps {
  onClose: (items?: any[]) => void
}

export function AccountLinkModal({ onClose }: IAccountLinkProps) {
  return (
    <LookupModal
      meta={AccountSearchMeta}
      defaultFormValue={{}}
      {...getAccountTableColumns(true)}
      title="Select Account"
      closeModal={onClose}
    />
  )
}
