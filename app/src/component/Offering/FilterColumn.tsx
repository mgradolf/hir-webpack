import { Col, Row, Checkbox, Input, Select, Button } from "antd"
import React from "react"
import Title from "antd/lib/skeleton/Title"

interface IFilterState {
  OfferingCode: string
  OfferingName: string
  ToCreationDate: string
  FromCreationDate: string
  ToTerminationDate: string
  FromTerminationDate: string
}

interface IFilterColumnProps {
  visible: boolean
  toggleVisiibility: () => void
  onSubmit: () => void
  state: IFilterState
  showOfferingCodeBlock: boolean
  showOfferingNameBlock: boolean
  showCreationDateBlock: boolean
  showTerminationDateBlock: boolean
  showIsQuickAdmitBlock: boolean
  toggleOfferingCodeBLock: () => void
  toggleOfferingNameBLock: () => void
  toggleCreationDateBLock: () => void
  toggleTerminationDateBLock: () => void
  toggleIsQuickAdmitBLock: () => void
}

export function FilterColumn(props: IFilterColumnProps) {
  // TODO: In progress
  // const {
  //   visible,
  //   toggleVisiibility,
  //   showOfferingCodeBlock,
  //   showOfferingNameBlock,
  //   showCreationDateBlock,
  //   showIsQuickAdmitBlock,
  //   showTerminationDateBlock
  // } = props

  // return (
  //   <Col className={visible ? `gutter-row ${styles.offeringFilter}` : styles.hidden} xs={24} sm={24} md={5}>
  //     <Row>
  //       <Col span={12}>
  //         <Title level={4}>Offering Filter</Title>
  //       </Col>
  //       <Col span={12} className={styles.padding5px}>
  //         <span onClick={toggleVisiibility}>
  //           <CloseOutlined style={{ fontSize: "20px", color: "black", float: "right" }} />
  //         </span>
  //       </Col>
  //     </Row>
  //     <Row>
  //       <Checkbox onChange={toggleOfferingCodeBLock}>Offering Code</Checkbox>
  //       <Row className={showOfferingCodeBlock ? styles.offeringFilterField : styles.hidden}>
  //         <Input
  //           name="OfferingCode"
  //           defaultValue=""
  //           value={OfferingCode === "*" ? "" : OfferingCode}
  //           onChange={this.handleInputChange}
  //         />
  //       </Row>
  //     </Row>
  //     <Row>
  //       <Checkbox onChange={this.toggleOfferingNameBLock}>Offering Name</Checkbox>
  //       <Row className={showOfferingNameBlock ? styles.offeringFilterField : styles.hidden}>
  //         <Input
  //           name="OfferingName"
  //           defaultValue=""
  //           value={OfferingName === "*" ? "" : OfferingName}
  //           onChange={this.handleInputChange}
  //         />
  //       </Row>
  //     </Row>
  //     <Row>
  //       <Checkbox onChange={this.toggleCreationDateBLock}>Creation Date</Checkbox>
  //       <Row className={showCreationDateBlock ? styles.offeringFilterField : styles.hidden}>
  //         <RangePicker
  //           value={[fromCreationDate, toCreationDate]}
  //           onChange={this.handleCreationDateChange}
  //           format={dateFormat}
  //         />
  //       </Row>
  //     </Row>
  //     <Row>
  //       <Checkbox onChange={this.toggleTerminationDateBLock}>Termination Date</Checkbox>
  //       <Row className={showTerminationDateBlock ? styles.offeringFilterField : styles.hidden}>
  //         <RangePicker
  //           value={[fromTerminationDate, toTerminationDate]}
  //           onChange={this.handleTerminationDateChange}
  //           format={dateFormat}
  //         />
  //       </Row>
  //     </Row>
  //     <Row>
  //       <Checkbox onChange={this.toggleIsQuickAdmitBLock}>Is QuickAdmit</Checkbox>
  //       <Row className={showIsQuickAdmitBlock ? styles.offeringFilterField : styles.hidden}>
  //         <Select defaultValue="1" style={{ width: 200 }}>
  //           <Option value="1">Yes</Option>
  //           <Option value="2">No</Option>
  //         </Select>
  //       </Row>
  //     </Row>
  //     <Row className={styles.floatRight}>
  //       <Button type="primary" className={styles.applyBtn} onClick={this.handleSubmit}>
  //         Apply
  //       </Button>
  //     </Row>
  //   </Col>
  // )
  return null
}
