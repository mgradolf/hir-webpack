import React from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import { putSpaceBetweenCapitalLetters } from "~/utils/util"
import { getOrderCreditsTableColumns } from "~/FormMeta/OrderCredits/OrderCreditsTableColumns"
import { getSectionDiscountTableColumns } from "~/FormMeta/SectionDiscount/DiscountTableColumns"
import { REFRESH_SECTION_DISCOUNT_PAGE } from "~/utils/EventBus"
import SectionAddButton from "~/Component/Section/SectionAddButton"

export const getDiscountProgramsDetailsMeta = (discountProgram: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      // {label: "Name", value:discountProgram.Name},
      { label: "Description", value: discountProgram.Description },
      { label: "Discount Type", value: discountProgram.DiscountType },
      { label: "Discount Group", value: discountProgram.DiscountGroup },
      { label: "GL Account", value: discountProgram.GLAccount },
      { label: "GL Description", value: discountProgram.GLAccountDescription },
      { label: "Amount in dollar/ Amount in percentage", value: discountProgram.DiscountAmountType },
      { label: "Dollars", value: discountProgram.Amount },
      { label: "Percentage", value: discountProgram.Amount },
      { label: "Is Promoted For Marketing", value: discountProgram.IsPromotedForMarketing, render: renderBoolean },
      { label: "Is Active", value: discountProgram.IsActive, render: renderBoolean }
    ]
  }

  const discountType: CardContainer = {
    contents: []
  }

  discountType.contents = [
    { label: "Discount Type", value: discountProgram.DiscountType },
    ...Object.keys(discountProgram?.DiscountServiceParams).map((key) => ({
      label: putSpaceBetweenCapitalLetters(key),
      value: discountProgram?.DiscountServiceParams[key]
    }))
  ]

  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary, discountType]
    }
  })

  meta.push({
    tabTitle: "Sections",
    tabType: "table",
    tabMeta: {
      blocks: [<SectionAddButton DiscountProgramID={discountProgram.DiscountProgramID} />],
      tableProps: {
        ...getSectionDiscountTableColumns(),
        searchParams: { DiscountProgramID: discountProgram.DiscountProgramID },
        refreshEventName: REFRESH_SECTION_DISCOUNT_PAGE
      }
    }
  })

  meta.push({
    tabTitle: "Transactions",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getOrderCreditsTableColumns(),
        searchParams: { DiscountProgramID: discountProgram.DiscountProgramID },
        refreshEventName: "REFRESH_ORDER_CREDITS_TAB"
      }
    }
  })

  return {
    pageTitle: `Discount Program Name - ${discountProgram.Name}`,
    tabs: meta
  }
}
