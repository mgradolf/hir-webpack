import React, { useEffect, useState } from "react"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Button, Select, Typography } from "antd"
import { renderLink, ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"
import {
  getWebCatalogOfferings,
  getWebCatalogPrograms,
  getWebCatalogSections
} from "~/ApiServices/BizApi/catalog/catalogIf"
import {
  removeOfferingFromCatalog,
  removeProgramFromCatalog,
  removeSectionFromCatalog,
  swapOfferingsInCatalog,
  swapProgramsInCatalog,
  swapSectionsInCatalog
} from "~/ApiServices/Service/CatalogService"

import { ArrowUpOutlined, ArrowDownOutlined, DeleteOutlined } from "@ant-design/icons"

interface ISortingTableComponent {
  CatalogID: number
  propKey: string
  searchFunc: (Params: any) => Promise<IApiResponse>
  swapFunc: (Params: any) => Promise<IApiResponse>
  removeFunc: (Params: any) => Promise<IApiResponse>
  columns: TableColumnType
  trigger?: any
}

const SortingTableComponent = (props: ISortingTableComponent) => {
  const [data, setData] = useState<any[]>([])
  const [trigger, setTrigger] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    props
      .searchFunc({ CatalogID: props.CatalogID })
      .then((x) => {
        setData(x.data)
      })
      .finally(() => setLoading(false))
    // eslint-disable-next-line
  }, [trigger, props.trigger])

  const moveUpOrDown = (record: any, up: boolean) => {
    const index = data.findIndex((x: any) => x[props.propKey] === record[props.propKey])
    const swapIndex = up ? index - 1 : index + 1

    if (data[swapIndex]) {
      setLoading(true)
      props
        .swapFunc({
          CatalogID: props.CatalogID,
          [`${props.propKey}1`]: up ? data[swapIndex][props.propKey] : record[props.propKey],
          [`${props.propKey}2`]: up ? record[props.propKey] : data[swapIndex][props.propKey]
        })
        .then((x) => {
          if (x.success) setTrigger(!trigger)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <ResponsiveTable
      columns={[
        ...props.columns,
        {
          title: "Actions",
          render: (text, record) => {
            return (
              <div style={{ display: "flex" }}>
                <Button onClick={() => moveUpOrDown(record, true)}>
                  <ArrowUpOutlined />
                </Button>
                <Button onClick={() => moveUpOrDown(record, false)}>
                  <ArrowDownOutlined />
                </Button>
                <Button
                  danger
                  onClick={() => {
                    setLoading(true)
                    props
                      .removeFunc({
                        CatalogID: props.CatalogID,
                        [props.propKey]: record[props.propKey]
                      })
                      .then((x) => {
                        if (x.success) setTrigger(!trigger)
                        else setLoading(false)
                      })
                  }}
                >
                  <DeleteOutlined color="red" />
                </Button>
              </div>
            )
          }
        }
      ]}
      dataSource={data}
      refreshEventName={`REFRESH_${props.propKey}`}
      rowKey={props.propKey}
      loading={loading}
    ></ResponsiveTable>
  )
}

export const CatalogOfferingSortingTableComponent = (props: { CatalogID: number }) => {
  return (
    <SortingTableComponent
      CatalogID={props.CatalogID}
      propKey="OfferingID"
      searchFunc={getWebCatalogOfferings}
      swapFunc={swapOfferingsInCatalog}
      removeFunc={removeOfferingFromCatalog}
      columns={[
        {
          title: "Course",
          dataIndex: "Name",
          render: (text, record) => renderLink(`/offering/${record.OfferingID}`, text)
        },
        { title: "Description", dataIndex: "Description" }
      ]}
    />
  )
}
export const CatalogSectionSortingTableComponent = (props: { CatalogID: number }) => {
  const [offerings, setOfferings] = useState<any[]>([])
  const [selectedOfferingID, setSelectedOfferingID] = useState<any>(undefined)
  useEffect(() => {
    getWebCatalogOfferings({ CatalogID: props.CatalogID }).then((x) => {
      setOfferings(x.data)
    })
    // eslint-disable-next-line
  }, [props.CatalogID])
  return (
    <>
      <Typography.Title level={4}>Select Offering</Typography.Title>
      <Select
        style={{ width: "200px" }}
        onSelect={(value: any) => {
          setSelectedOfferingID(value)
        }}
        clearIcon
      >
        {offerings.map((x) => (
          <Select.Option key={x.OfferingID} value={x.OfferingID}>
            {x.Name}
          </Select.Option>
        ))}
      </Select>
      {selectedOfferingID && (
        <SortingTableComponent
          CatalogID={props.CatalogID}
          propKey="SectionID"
          searchFunc={(CatalogID: any) =>
            getWebCatalogSections({ CatalogID: CatalogID, SelectedOfferingID: selectedOfferingID })
          }
          swapFunc={swapSectionsInCatalog}
          removeFunc={removeSectionFromCatalog}
          columns={[
            {
              title: "Section",
              dataIndex: "SectionNumber",
              render: (text, record) => renderLink(`/section/${record.SectionID}`, text)
            },
            { title: "Start Date", dataIndex: "StartDateFormatted" },

            { title: "Description", dataIndex: "Description" }
          ]}
          trigger={selectedOfferingID}
        />
      )}
    </>
  )
}
export const CatalogProgramSortingTableComponent = (props: { CatalogID: number }) => {
  return (
    <SortingTableComponent
      CatalogID={props.CatalogID}
      propKey="ProgramID"
      searchFunc={getWebCatalogPrograms}
      swapFunc={swapProgramsInCatalog}
      removeFunc={removeProgramFromCatalog}
      columns={[
        {
          title: "Program",
          dataIndex: "Name",
          render: (text, record) => renderLink(`/program/${record.ProgramID}`, text)
        },
        { title: "Description", dataIndex: "Description" }
      ]}
    />
  )
}
