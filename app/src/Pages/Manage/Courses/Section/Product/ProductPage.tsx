import React from "react"
import { RouteComponentProps } from "react-router"
import StandardPage from "~/Component/Common/Page/StandardPage"
import { ProductAddButton } from "~/Component/Section/Product/ProductAddButton"
import { getSectionProductTableColumns } from "~/TableSearchMeta/SectionProduct/ProductTableColumns"
import { REFRESH_SECTION_PRODUCT_PAGE } from "~/utils/EventBus"

export default function SectionProductPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props?.match?.params?.sectionID)

  return (
    <StandardPage
      blocks={[<ProductAddButton SectionId={SectionID} />]}
      title="Manage Section Products"
      tableProps={{ ...getSectionProductTableColumns(), refreshEventName: REFRESH_SECTION_PRODUCT_PAGE }}
      initialFormValue={{ SectionID: SectionID }}
    />
  )
}
