import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"

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

  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })

  return {
    pageTitle: `Discount Program Name - ${discountProgram.Name}`,
    tabs: meta
  }
}
