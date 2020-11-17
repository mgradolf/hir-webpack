import React from "react"
import { searchPersons } from "~/ApiServices/BizApi/person/persongIF"
import PersonSearchFilterMeta from "~/FormMeta/Person/PersonSearchFilterMeta"
import SearchPage from "~/Component/Common/Page/SearchPage"
import {
  getPersonTableColumns,
  personExpandableIndices,
  personResponsiveIndices
} from "~/FormMeta/Person/PersonTableColumns"

export default function PersonTable() {
  return (
    <SearchPage
      title="Manage Persons"
      meta={PersonSearchFilterMeta}
      hideSearchField={false}
      tableProps={{
        columns: getPersonTableColumns(),
        searchFunc: searchPersons,
        expandableColumnIndices: personExpandableIndices,
        responsiveColumnIndices: personResponsiveIndices,
        pagination: { position: ["topLeft"], pageSize: 20 }
      }}
      helpKey="https://docs.google.com/document/d/1FKV-i5gsVClhsHLYFMqpdEGDVZmwJU576AXKKcTfwiY/edit?usp=sharing"
    ></SearchPage>
  )
}
