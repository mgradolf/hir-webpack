import React from "react"
import debounce from "~/utils/debounce"
import { Button, Input, Table } from "antd"
import {
  SortableContainer as sortableContainer,
  SortableElement as sortableElement,
  SortableHandle as sortableHandle,
  SortEnd
} from "react-sortable-hoc"
import { MenuOutlined } from "@ant-design/icons"
import arrayMove from "array-move"
import { TableRowSelection } from "antd/lib/table/interface"

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />)
const SortableItem = sortableElement((props: any) => <tr {...props} />)
const SortableContainer = sortableContainer((props: any) => <tbody {...props} />)

type TypeSortableTable = {
  data: Array<any>
  updatedList: (Params: Array<any>) => void
}

export default class SortableTable extends React.Component<TypeSortableTable> {
  state = {
    dataSource: this.props.data,
    updatedList: this.props.updatedList,
    columns: [
      {
        title: "Drag",
        dataIndex: "sort",
        width: 30,
        className: "drag-visible",
        render: () => <DragHandle />
      },
      {
        title: "Sort Position",
        dataIndex: "SortPosition"
      },
      {
        title: "Value",
        dataIndex: "TextValue",
        render: (value: any, record: any) => (
          <Input
            defaultValue={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              e.persist()
              this.onUpdateValue({ value: e.target.value, record })
            }}
          />
        )
      },
      {
        title: "Remove",
        render: (value: any, record: any) => (
          <Button danger type="primary" onClick={() => this.removeRow(record.index)}>
            Remove
          </Button>
        )
      }
    ]
  }

  componentWillReceiveProps = (nextProps: TypeSortableTable): void => {
    this.setState({
      dataSource: nextProps.data
    })
  }

  rowSelection: TableRowSelection<any> = {
    onChange: (selectedRowKeys: Array<string | number>, selectedRows: Array<string | number>) => {
      const newDataSource = this.state.dataSource.map((x) => {
        x.IsDefault = selectedRowKeys.findIndex((rowKey) => rowKey === x.index) >= 0
        return x
      })
      this.setState({ dataSource: newDataSource })
      this.props.updatedList(newDataSource)
    },
    getCheckboxProps: (record: any) => ({
      name: record.name
    }),
    columnTitle: "Default"
  }

  onUpdateValue = debounce((Params: any): void => {
    const { value, record } = Params
    const newDataSource = this.state.dataSource.map((x) => {
      if (record.index === x.index) x.TextValue = value
      return x
    })

    this.setState({ dataSource: newDataSource })
    this.props.updatedList(newDataSource)
  }, 1000)

  removeRow = (index: number) => {
    const newDataSource = this.state.dataSource
      .filter((x) => {
        return x.index !== index
      })
      .map((x, i) => {
        x.SortPosition = i + 1
        x.index = i + 1
        return x
      })
    this.setState({ dataSource: newDataSource })
    this.props.updatedList(newDataSource)
  }

  onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const newDataSource = arrayMove([...this.state.dataSource], oldIndex, newIndex)
        .filter((el) => !!el)
        .map((x, i) => {
          x.SortPosition = i + 1
          return x
        })
      this.setState({ dataSource: newDataSource })
      this.props.updatedList(newDataSource)
    }
  }

  DraggableBodyRow = ({ className, style, ...restProps }: any) => {
    const index = this.state.dataSource.findIndex((x) => x.index === restProps["data-row-key"])
    return <SortableItem index={index} {...restProps} />
  }

  render() {
    const { dataSource, columns } = this.state
    const DraggableContainer = (props: any) => (
      <SortableContainer useDragHandle helperClass="row-dragging" onSortEnd={this.onSortEnd} {...props} />
    )
    return (
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowSelection={{ type: "radio", ...this.rowSelection }}
        rowKey="index"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: this.DraggableBodyRow
          }
        }}
      />
    )
  }
}

// ReactDOM.render(<SortableTable />, document.getElementById("container"))
