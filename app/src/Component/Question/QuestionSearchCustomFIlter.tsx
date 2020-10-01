import React, { useEffect, useState } from "react"
import { Form, Select } from "antd"
import { getTags } from "~/ApiServices/Service/TagService"
import { getQuestionEvents, getTagTypes } from "~/ApiServices/Service/RefLookupService"

interface IQuestionSearchCustomFIlter {
  entityType: string
  entityID: number
  setFilters: (param: { [key: string]: number }) => void
}

const layout = {
  labelCol: { span: 6 }
}

export default function QuestionSearchCustomFIlter(props: IQuestionSearchCustomFIlter) {
  const [allEvents, setAllEvents] = useState<Array<any>>([])
  const [allTagTypes, setAllTagTypes] = useState<Array<any>>([])
  const [allTags, setAllTags] = useState<Array<any>>([])

  const [selectedTagType, setSelectedTagType] = useState<null | number>(null)
  const [selectedTag, setSelectedTag] = useState<null | number>(null)
  const [selectedEvent, setSelectedEvent] = useState<null | number>()

  useEffect(() => {
    const filter: { [key: string]: number } = {}
    filter[props.entityType] = props.entityID
    if (selectedEvent) filter.EventID = selectedEvent
    if (selectedTagType) filter.TagTypeID = selectedTagType
    if (selectedTag) filter.TagID = selectedTag

    props.setFilters(filter) // eslint-disable-next-line
  }, [selectedEvent, selectedTagType, selectedTag, props.entityType, props.entityID])

  useEffect(() => {
    getQuestionEvents().then((x) => {
      if (x.success) {
        setAllEvents(x.data)
        setSelectedEvent(2)
      }
    })
  }, [])

  useEffect(() => {
    getTagTypes().then((x) => {
      if (x.success) {
        setAllTagTypes([{ ID: -2, Name: " " }, ...x.data])
      }
    })
  }, [])

  useEffect(() => {
    getTags({
      TagTypeID: selectedTagType ? [selectedTagType] : undefined
    }).then((x) => {
      if (x.success) {
        setAllTags([{ ID: -3, Name: " " }, ...x.data])
      }
    })
  }, [selectedTagType])

  const onChangeEvent = (id: number) => {
    if (id < 0) {
      setSelectedEvent(null)
    } else {
      setSelectedEvent(id)
    }
  }

  const onChangeTagType = (id: number) => {
    if (id < 0) {
      setSelectedTagType(null)
      setSelectedTag(null)
    } else {
      setSelectedTagType(id)
      setSelectedTag(null)
    }
  }

  const onChangeTag = (id: number) => {
    if (id >= 0) {
      setSelectedTag(id)
    } else {
      setSelectedTag(null)
    }
  }

  return (
    <>
      <Form.Item label="Event" {...layout}>
        <Select onChange={onChangeEvent} defaultValue={2}>
          {allEvents.map((x, i) => (
            <Select.Option key={"Event" + x.Name + x.ID + i} value={x.ID}>
              {x.Name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Tag Type" {...layout}>
        <Select onChange={onChangeTagType}>
          {allTagTypes.map((x, i) => (
            <Select.Option key={"TagType" + x.Name + x.ID + i} value={x.ID}>
              {x.Name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Tag" {...layout}>
        <Select onChange={onChangeTag}>
          {allTags.map((x, i) => (
            <Select.Option key={"Tag" + x.Name + x.ID + i} value={x.ID}>
              {x.Name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  )
}
