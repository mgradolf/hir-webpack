import React from "react"
import style from "~/component/Modal/modal.module.scss"

export default function (props: React.Props<JSX.Element>) {
  return (
    <div id={style.myModal} className={style.modal}>
      <div className={style.modal_content}>
        <span className={style.modal__close}>&times;</span>
        {props.children}
      </div>
    </div>
  )
}
