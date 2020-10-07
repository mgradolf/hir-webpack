import React, { useState, useEffect } from "react"
import { RouteComponentProps } from "react-router-dom"
import { getTagTypes } from "~/ApiServices/Service/RefLookupService"
import { getTags, getParentTags, addTagIntoEntity, removeTagFromEntity } from "~/ApiServices/Service/TagService"
import { Form, Card, Select, Input, Switch, Row, Col, Button, Spin } from "antd"
import { CloseOutlined, CheckOutlined } from "@ant-design/icons"
import TagsTable from "~/Component/Section/Tag/TagsTable"
import { eventBus, REFRESH_SECTION_TAG_PAGE } from "~/utils/EventBus"
import { hidden } from "~/utils/style"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

interface IFieldNames {
  EntityType: string
  EntityID: string
  TagTypeID: string
  IsSelected: string
  Tag: string
}

const fieldNames: IFieldNames = {
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
export default function (props: RouteComponentProps<{ sectionID: string }>) {
  const sectionID = Number(props.match.params.sectionID)
  const [tagTypes, setTagTypes] = useState<Array<any>>([])

  const [sectionTags, setSectionTags] = useState<Array<any>>([])
  const [parentTags, setParentTags] = useState<Array<any>>([])

  const [loadingTagTypes, setLoadingTagTypes] = useState(false)
  const [loadingSectionTagSearchResults, setLoadingSectionTagSearchResults] = useState(false)
  const [loadingParentTagSearchResults, setLoadingParentTagSearchResults] = useState(false)

  const [formInstance] = Form.useForm()
  const initialValues: IinitialValues = {
    EntityType: "Section",
    EntityID: sectionID,
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
    Promise.all([searchSectionTags(), searchParentTags()])
  }

  useEffect(() => {
    eventBus.subscribe(REFRESH_SECTION_TAG_PAGE, () => {
      loadTagTypes()
      searchTags()
    })
    eventBus.publish(REFRESH_SECTION_TAG_PAGE)
    return () => {
      eventBus.unsubscribe(REFRESH_SECTION_TAG_PAGE)
    }
    // eslint-disable-next-line
  }, [sectionID])

  const resetForm = () => {
    clearResult()
    formInstance.resetFields()
  }

  const clearResult = () => {
    setParentTags([])
    setSectionTags([])
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

  const searchSectionTags = async () => {
    setLoadingSectionTagSearchResults(true)
    const response = await getTags(convertFormFieldIntoSearchParam(formInstance.getFieldsValue()))
    setLoadingSectionTagSearchResults(false)
    if (response.success && Array.isArray(response.data)) {
      setSectionTags(
        response.data
          .map((x) => {
            x.isChecked = false
            if (x.EntityType === "Section" && x.EntityID === sectionID) {
              x.isChecked = true
            }
            x.type = "Section"
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
            if (x.EntityType === "Section" && x.EntityID === sectionID) {
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

  const addRemoveTagToSection = async (Tag: { [key: string]: any }, add: boolean): Promise<IApiResponse> => {
    const formValue = formInstance.getFieldsValue()
    const methodToCall = add ? addTagIntoEntity : removeTagFromEntity
    const loadingMethod = Tag.type === "Section" ? setLoadingSectionTagSearchResults : setLoadingParentTagSearchResults
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
                disabled={loadingSectionTagSearchResults || loadingParentTagSearchResults}
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
            title="Section Tags"
            data={sectionTags}
            loading={loadingSectionTagSearchResults}
            select={addRemoveTagToSection}
          />
        </Col>

        <Col span={24}>
          <TagsTable
            title="Parent Tags"
            data={parentTags}
            loading={loadingParentTagSearchResults}
            select={addRemoveTagToSection}
          />
        </Col>
      </Row>
    </>
  )
}
