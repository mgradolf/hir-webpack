import * as React from "react"
import styles from "~/component/Error.module.scss"

export function Error(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
) {
  const { children, ...otherProps } = props
  return (
    <p className={styles.Error_message} {...otherProps}>
      {children}
    </p>
  )
}
