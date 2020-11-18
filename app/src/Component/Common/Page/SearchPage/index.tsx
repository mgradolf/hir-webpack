import React from "react"
import { IDataTableProps } from "~/Component/Common/ResponsiveTable"
import { IFilterField } from "~/Component/Common/SearchFilters/common"
import SearchListWithHiddenSearchForm from "~/Component/Common/Page/SearchPage/SearchListWithHiddenSearchForm"
import SearchListWithVisibleSearchForm from "~/Component/Common/Page/SearchPage/SearchListWithVisibleSearchForm"
import { RouteComponentProps, useLocation } from "react-router-dom"

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

interface IPage extends Partial<RouteComponentProps> {
  hideSearchField?: boolean
  blocks?: JSX.Element[]
  title: string
  meta?: IFilterField[]
  tableProps: IDataTableProps
  initialFilter?: any
  helpKey?: string
}
export default function Page(props: IPage) {
  const hideSearchFieldByUrlParam = useQuery().get("hide-search") === "true"
  const propsToPass = {
    blocks: props.blocks,
    title: props.title,
    meta: props.meta,
    tableProps: props.tableProps,
    initialFilter: props.initialFilter,
    helpKey: props.helpKey
  }
  if (props.meta && (hideSearchFieldByUrlParam || props.hideSearchField)) {
    return <SearchListWithHiddenSearchForm {...propsToPass} />
  }
  return <SearchListWithVisibleSearchForm {...propsToPass} />
}
