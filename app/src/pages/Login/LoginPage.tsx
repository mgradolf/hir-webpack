import * as React from "react"
import styles from "~/pages/Login/LoginPage.module.scss"
import { Layout } from "antd"
import Login from "~/component/Login/Login"

export default function LoginPage() {
  return (
    <Layout className={styles.Layout}>
      <Layout.Content className={styles.Content}>
        <img src="./images/logo.png" className={styles.Logo} alt="jenzabar-logo" />
        <Login page={true} />
        <p className={styles.Footer_note}>{`2011-${new Date().getFullYear()} Jenzabar, Inc.`}</p>
      </Layout.Content>
    </Layout>
  )
}
