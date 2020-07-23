import React from 'react'

interface ButtonProps {
  title: string
}
const ActionButton: React.FC<ButtonProps> = ({ title }) => {
  return <button>{title}</button>
}

export default ActionButton
