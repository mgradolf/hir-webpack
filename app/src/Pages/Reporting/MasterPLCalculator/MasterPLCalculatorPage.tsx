import { Col, Descriptions, Row, Tabs, Typography } from "antd"
import React, { useState } from "react"
import { analyzeSections } from "~/ApiServices/Service/BudgetAnalysisService"
import { MetaDrivenForm } from "~/Component/Common/Form/MetaDrivenForm"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { MasterPLCalculatorSearchMeta } from "~/TableSearchMeta/MasterPLCalculator/MasterPLCalculatorSearchMeta"
import {
  MasterPLCalculatorBudgetTableColumns,
  MasterPLCalculatorSeatGroupsTableColumns
} from "~/TableSearchMeta/MasterPLCalculator/MasterPLCalculatorTableColumns"

export default function QueriesPage() {
  const [dataSource, setDataSource] = useState<{ [key: string]: any }>({})
  const [loading, setLoading] = useState(false)
  const loadData = (searchParams: { [key: string]: any }) => {
    setLoading(true)
    analyzeSections(searchParams).then((x) => {
      if (x.success) setDataSource(x.data)
      setLoading(false)
    })
  }
  return (
    <div className="site-layout-content">
      <Row>
        <Col span={21}>
          <Typography.Title level={3}>{"Master P & L Calculator"}</Typography.Title>
        </Col>
      </Row>

      <MetaDrivenForm
        meta={MasterPLCalculatorSearchMeta}
        metaName="MasterPLCalculatorSearchMeta"
        stopProducingQueryParams={true}
        initialFormValue={{ IsActual: true }}
        applyButtonLabel="Calculate"
        onApplyChanges={(newFilterValues) => loadData(newFilterValues)}
      />

      <Row>
        <Col span={24}>
          <Tabs defaultActiveKey="1" type="card" size="large">
            <Tabs.TabPane tab="Budget" key={1}>
              <Descriptions style={{ background: "white", paddingTop: "10px", paddingLeft: "10px" }}>
                <Descriptions.Item label="Income">
                  <span style={{ fontWeight: 800 }}> {dataSource.TotalIncome}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Expense">
                  <span style={{ fontWeight: 800 }}> {dataSource.TotalExpense}</span>
                </Descriptions.Item>
                <Descriptions.Item label="P/L">
                  <span
                    style={{
                      fontWeight: 800,
                      color: dataSource.ProfitLoss && dataSource.ProfitLoss > 0 ? "green" : "red"
                    }}
                  >
                    {dataSource.ProfitLoss}
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label="Gross Margin">
                  <span style={{ fontWeight: 800 }}> {dataSource.MarginPercent}</span>
                </Descriptions.Item>
              </Descriptions>
              <ResponsiveTable
                loading={loading}
                columns={MasterPLCalculatorBudgetTableColumns}
                dataSource={dataSource.Financials || []}
                refreshEventName={"REFRESH_BUDGET_TAB"}
                pagination={false}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Seat Groups" key={2}>
              <Descriptions style={{ background: "white", paddingTop: "10px", paddingLeft: "10px" }}>
                <Descriptions.Item label="Total Reserved Enrollment">
                  {dataSource.TotalEstimatedEnrollment}
                </Descriptions.Item>
                <Descriptions.Item label="Total Actual Enrollment">
                  {dataSource.TotalActualEnrollment}
                </Descriptions.Item>
              </Descriptions>
              <ResponsiveTable
                loading={loading}
                columns={MasterPLCalculatorSeatGroupsTableColumns}
                dataSource={dataSource.SeatGroups}
                refreshEventName={"REFRESH_FINANCIAL_TAB"}
                pagination={false}
              />
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  )
}
