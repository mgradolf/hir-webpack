import React from "react"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderDate } from "~/Component/Common/ResponsiveTable"

export const getBatchDetailsMeta = (batch: { [key: string]: any }): IDetailsMeta => {
  console.log(batch)

  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Source", value: batch.SourceName },
      { label: "Batch Date", value: batch.CreatedDate, render: renderDate },
      { label: "Processed", value: batch?.BatchDetails?.TotalProcessed },
      { label: "File", value: batch.FileName },
      { label: "Data", value: batch?.ContextData?.SourceID },
      { label: "Status", value: batch.State },
      { label: "Uploaded By", value: batch.CreatedBy },
      { label: "Uploaded", value: batch?.BatchDetails?.TotalUploaded },
      { label: "Failed", value: batch?.BatchDetails?.TotalFailed }
    ]
  }

  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      actions: [<HelpButton helpKey="toolsBatchSearchBatchSummaryTab" />],
      summary: [summary]
    }
  })

  return {
    pageTitle: `Batch Type - ${batch.Name}`,
    tabs: meta
  }
}
