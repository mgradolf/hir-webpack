import React, { useState, useEffect } from "react"
import { getTagTypes } from "~/ApiServices/Service/RefLookupService"
import { getTags, getParentTags, addTagIntoEntity, removeTagFromEntity } from "~/ApiServices/Service/TagService"
import { Form, Card, Select, Input, Switch, Row, Col, Button, Spin } from "antd"
import { CloseOutlined, CheckOutlined } from "@ant-design/icons"
import TagsTable from "~/Component/Offering/Tag/TagsTable"
import { eventBus, REFRESH_OFFERING_TAG_PAGE } from "~/utils/EventBus"
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
export default function TagPage(props: { offeringID: number }) {
  const [tagTypes, setTagTypes] = useState<Array<any>>([])

  const [offeringTags, setOfferingTags] = useState<Array<any>>([])
  const [parentTags, setParentTags] = useState<Array<any>>([])

  const [loadingTagTypes, setLoadingTagTypes] = useState(false)
  const [loadingOfferingTagSearchResults, setLoadingOfferingTagSearchResults] = useState(false)
  const [loadingParentTagSearchResults, setLoadingParentTagSearchResults] = useState(false)

  const [formInstance] = Form.useForm()
  const initialValues: IinitialValues = {
    EntityType: "Offering",
    EntityID: props.offeringID,
    IsSelected: true,
    Tag: "*",
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

  const searchTags = async () => {
    clearResult()
    Promise.all([searchOfferingTags(), searchParentTags()])
  }

  useEffect(() => {
    eventBus.subscribe(REFRESH_OFFERING_TAG_PAGE, () => {
      loadTagTypes()
      searchTags()
    })
    eventBus.publish(REFRESH_OFFERING_TAG_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_OFFERING_TAG_PAGE)
    }
    // eslint-disable-next-line
  }, [props.offeringID])

  const resetForm = () => {
    clearResult()
    formInstance.resetFields()
  }

  const clearResult = () => {
    setParentTags([])
    setOfferingTags([])
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
        response.data
          .map((x) => {
            x.isChecked = false
            if (x.EntityType === "Offering" && x.EntityID === props.offeringID) {
              x.isChecked = true
            }
            x.type = "Offering"
            return x
          })
          .sort((x, y) => Number(y.isChecked) - Number(x.isChecked))
      )
    }
  }

  const searchParentTags = async () => {
    setLoadingParentTagSearchResults(true)
    const response = await getParentTags(convertFormFieldIntoSearchParam(formInstance.getFieldsValue()))
    setLoadingParentTagSearchResults(false)
    if (response.success && Array.isArray(response.data)) {
      setParentTags(
        response.data
          .map((x) => {
            x.isChecked = false
            if (x.EntityType === "Offering" && x.EntityID === props.offeringID) {
              x.isChecked = true
            }
            x.Name = x.Tag
            x.ID = x.TagID
            x.Description = x.TagDescription
            x.type = "Parent"
            return x
          })
          .sort((x, y) => Number(y.isChecked) - Number(x.isChecked))
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
          <div className="hidden">
            <Form.Item label="Tag types" name={fieldNames.EntityType}>
              <Input aria-label="Tag Types" />
            </Form.Item>
            <Form.Item label="Tag types" name={fieldNames.EntityID}>
              <Input aria-label="Tag ID" />
            </Form.Item>
          </div>

          <Form.Item label="Tag types" name={fieldNames.TagTypeID}>
            <Select
              mode="multiple"
              aria-label="Tag Select"
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
                <Input aria-label="Search by Tag Name" />
              </Form.Item>
            </Col>
            <Col span="auto">
              <Form.Item label="Selected" name={fieldNames.IsSelected} valuePropName="checked">
                <Switch
                  aria-label="Is Selected"
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span="auto" style={{ textAlign: "right" }}>
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
        <Col span={24}>
          <TagsTable
            title="Offering Tags"
            data={offeringTags}
            loading={loadingOfferingTagSearchResults}
            select={addRemoveTagToOffering}
          />
        </Col>

        <Col span={24}>
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
