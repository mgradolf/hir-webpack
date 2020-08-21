import React, { useState, useEffect, useCallback } from "react"
import { RouteComponentProps } from "react-router-dom"
import { getTagTypes } from "~/ApiServices/Service/RefLookupService"
import { getTags, getParentTags, addTagIntoEntity, removeTagFromEntity } from "~/ApiServices/Service/TagService"
import { Form, Card, Select, Input, Switch, Row, Col, Button, Spin } from "antd"
import { CloseOutlined, CheckOutlined } from "@ant-design/icons"
import TagsTable from "~/component/Offering/Tag/TagsTable"
import EventBus from "~/utils/EventBus"
import { REFRESH_OFFERING_TAG_PAGE } from "~/utils/EventList"
import { hidden } from "~/utils/style"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

interface IFieldNames {
  EntityType: string
  EntityID: string
  TagTypeID: string
  IsSelected: string
  Tag: string
}

const fieldNames = {
  EntityType: "EntityType",
  EntityID: "EntityID",
  TagTypeID: "TagTypeID",
  IsSelected: "IsSelected",
  Tag: "Tag"
}

interface IinitialValues {
  EntityType: string
  EntityID: number
  IsSelected: boolean
  Tag: string
  TagTypeID: Array<number | string>
}
export default function (props: RouteComponentProps<{ id: string }>) {
  const [tagTypes, setTagTypes] = useState<Array<any>>([])

  const [offeringTags, setOfferingTags] = useState<Array<any>>([])
  const [parentTags, setParentTags] = useState<Array<any>>([])

  const [loadingTagTypes, setLoadingTagTypes] = useState(false)
  const [loadingOfferingTagSearchResults, setLoadingOfferingTagSearchResults] = useState(false)
  const [loadingParentTagSearchResults, setLoadingParentTagSearchResults] = useState(false)

  const [formInstance] = Form.useForm()
  const initialValues: IinitialValues = {
    EntityType: "Offering",
    EntityID: parseInt(props.match.params.id),
    IsSelected: false,
    Tag: "",
    TagTypeID: []
  }

  const loadTagTypes = async () => {
    setLoadingTagTypes(true)
    const response = await getTagTypes()
    if (response.success) {
      setTagTypes(response.data)
    }
    setLoadingTagTypes(false)
  }

  useEffect(() => {
    EventBus.subscribe(REFRESH_OFFERING_TAG_PAGE, loadTagTypes)
    EventBus.publish(REFRESH_OFFERING_TAG_PAGE)
    return () => {
      EventBus.unsubscribe(REFRESH_OFFERING_TAG_PAGE)
    }
  }, [])

  const resetForm = () => {
    clearResult()
    formInstance.resetFields()
  }

  const clearResult = () => {
    setParentTags([])
    setOfferingTags([])
  }

  const searchTags = async () => {
    clearResult()
    Promise.all([searchOfferingTags(), searchParentTags()])
  }

  const convertFormFieldIntoSearchParam = (formFields: { [key: string]: any }): IinitialValues => {
    const searchParams = formFields as IinitialValues
    searchParams.TagTypeID = searchParams.TagTypeID.map((x) => {
      if (typeof x === "string") {
        return parseInt(x.split(";")[0])
      }
      return x
    })
    return searchParams
  }

  const searchOfferingTags = async () => {
    setLoadingOfferingTagSearchResults(true)
    const response = await getTags(convertFormFieldIntoSearchParam(formInstance.getFieldsValue()))
    setLoadingOfferingTagSearchResults(false)
    if (response.success && Array.isArray(response.data)) {
      setOfferingTags(
        response.data.map((x) => {
          x.isChecked = false
          if (x.EntityType === "Offering" && x.EntityID === parseInt(props.match.params.id)) {
            x.isChecked = true
          }
          x.type = "Offering"
          return x
        })
      )
    }
  }

  const searchParentTags = async () => {
    setLoadingParentTagSearchResults(true)
    const response = await getParentTags(convertFormFieldIntoSearchParam(formInstance.getFieldsValue()))
    setLoadingParentTagSearchResults(false)
    if (response.success && Array.isArray(response.data)) {
      setParentTags(
        response.data.map((x) => {
          x.isChecked = false
          if (x.EntityType === "Offering" && x.EntityID === parseInt(props.match.params.id)) {
            x.isChecked = true
          }
          x.Name = x.Tag
          x.ID = x.TagID
          x.Description = x.TagDescription
          x.type = "Parent"
          return x
        })
      )
    }
  }

  const addRemoveTagToOffering = async (Tag: { [key: string]: any }, add: boolean): Promise<IApiResponse> => {
    const formValue = formInstance.getFieldsValue()
    const methodToCall = add ? addTagIntoEntity : removeTagFromEntity
    const loadingMethod =
      Tag.type === "Offering" ? setLoadingOfferingTagSearchResults : setLoadingParentTagSearchResults
    loadingMethod(true)
    const response = await methodToCall({
      ...formValue,
      TagID: Tag.ID
    })
    loadingMethod(false)
    return response
  }

  return (
    <>
      <Card>
        <Form form={formInstance} initialValues={initialValues}>
          <div style={hidden}>
            <Form.Item label="Tag types" name={fieldNames.EntityType}>
              <Input />
            </Form.Item>
            <Form.Item label="Tag types" name={fieldNames.EntityID}>
              <Input />
            </Form.Item>
          </div>

          <Form.Item label="Tag types" name={fieldNames.TagTypeID}>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              notFoundContent={loadingTagTypes ? <Spin size="small" /> : null}
              placeholder="Please select Tag types"
            >
              {tagTypes.map((tag) => {
                return (
                  <Select.Option value={`${tag.ID};${tag.Name}`} key={tag.ID} style={{ lineHeight: "32px" }}>
                    {tag.Name}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>

          <Row gutter={[48, 8]}>
            <Col span="auto">
              <Form.Item label="Search by Tag name" name={fieldNames.Tag}>
                <Input />
              </Form.Item>
            </Col>
            <Col span="auto">
              <Form.Item label="Selected" name={fieldNames.IsSelected} valuePropName="checked">
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button
                type="primary"
                onClick={searchTags}
                disabled={loadingOfferingTagSearchResults || loadingParentTagSearchResults}
              >
                Search
              </Button>
              <Button style={{ margin: "0 8px" }} type="primary" danger onClick={resetForm}>
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Row>
        <Col flex={1}>
          <TagsTable
            title="Offering Tags"
            data={offeringTags}
            loading={loadingOfferingTagSearchResults}
            select={addRemoveTagToOffering}
          />
        </Col>
        <Col flex={1}>
          <TagsTable
            title="Parent Tags"
            data={parentTags}
            loading={loadingParentTagSearchResults}
            select={addRemoveTagToOffering}
          />
        </Col>
      </Row>
    </>
  )
}
