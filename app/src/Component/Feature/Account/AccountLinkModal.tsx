import * as React from "react"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"
import { AccountSearchMeta } from "~/TableSearchMeta/Account/AccountSearchMeta"
import { getAccountTableColumns } from "~/TableSearchMeta/Account/AccountTableColumns"

interface IAccountLinkProps {
  onClose: (items?: any[]) => void
}

export function AccountLinkModal({ onClose }: IAccountLinkProps) {
  return (
    <LookupModal
      meta={AccountSearchMeta}
      metaName="AccountSearchMeta"
      defaultFormValue={{}}
      {...getAccountTableColumns(true)}
      title="Select Account"
      closeModal={onClose}
    />
  )
}
