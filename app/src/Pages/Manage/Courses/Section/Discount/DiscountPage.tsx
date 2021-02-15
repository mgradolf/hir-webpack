import React from "react"
import { RouteComponentProps } from "react-router-dom"
import StandardPage from "~/Component/Common/Page/StandardPage"
import { getSectionDiscountTableColumns } from "~/TableSearchMeta/SectionDiscount/DiscountTableColumns"
import { REFRESH_SECTION_DISCOUNT_PAGE } from "~/utils/EventBus"
import { AddDiscountButton } from "~/Component/Discount/AddDiscountButton"

export default function DiscountPage(props: RouteComponentProps<{ sectionID?: string }>) {
  const SectionID = Number(props.match.params.sectionID)

  return (
    <StandardPage
      blocks={[<AddDiscountButton sectionId={SectionID} />]}
      title="Manage Discount Programs"
      tableProps={{ ...getSectionDiscountTableColumns(), refreshEventName: REFRESH_SECTION_DISCOUNT_PAGE }}
      initialFormValue={{ SectionID: SectionID }}
    />
  )
}
