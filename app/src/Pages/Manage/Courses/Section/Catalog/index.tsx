import React from "react"
import { RouteComponentProps } from "react-router-dom"
import SectionCatalogPage from "~/Pages/Manage/Courses/Section/Catalog/CatalogPage"

export default function SectionCatalog(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = parseInt(props.match.params.sectionID)
  return <SectionCatalogPage sectionID={SectionID} title={"Manage Catalogs"} />
}
