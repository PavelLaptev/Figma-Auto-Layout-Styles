import * as React from 'react'
import styles from './styles.module.scss'

import Icon from '../Icon'
import Tooltip from '../Tooltip'

interface Props {
  className?: any
  text?: string
  icon?: string
  reference?: React.Ref<HTMLButtonElement>
  type?: string
  contentWidth?: boolean
  lightStyle?: boolean
  style?: React.CSSProperties
  disabled?: boolean
  danger?: boolean
  tooltip?: {
    text: string
    position: 'center' | 'left' | 'right'
  }
  reverse?: boolean
  onClick?: (e) => void
  onBlur?: (e) => void
  onMouseUp?: (e) => void
  onMouseDown?: (e) => void
  onFocus?: (e) => void
  onFileChange?: (e) => void
}

const Button: React.FunctionComponent<Props> = (props) => {
  const handleOnFileChange = (e) => {
    props.onFileChange(e)
  }

  const getWidth = () => {
    if (props.contentWidth) {
      return '0 0 auto'
    }
    return '1'
  }

  return (
    <button
      onClick={props.onClick}
      onBlur={props.onBlur}
      onMouseUp={props.onMouseUp}
      onMouseDown={props.onMouseDown}
      onFocus={props.onFocus}
      className={`${styles.button} ${props.disabled ? styles.disabled : null} ${props.className} ${
        props.lightStyle ? styles.darkStyle : styles.lightStyle
      } ${props.danger ? styles.danger : null}`}
      ref={props.reference}
      style={{
        flex: getWidth(),
        flexDirection: props.reverse ? 'row-reverse' : 'row',
        ...props.style,
      }}
    >
      {props.tooltip ? <Tooltip text={props.tooltip.text} position={props.tooltip.position} className={styles.tooltip} /> : null}
      {props.type === 'file' ? (
        <input
          type="file"
          title=""
          className={styles.input}
          accept="application/JSON"
          onClick={(e) => (e.currentTarget.value = null)}
          multiple={false}
          onChange={handleOnFileChange}
        />
      ) : null}
      {props.text ? <span className={styles.text}>{props.text}</span> : null}
      {props.icon ? <Icon className={styles.icon} name={props.icon} /> : null}
    </button>
  )
}

Button.defaultProps = {
  text: null,
  icon: null,
  type: 'button',
  tooltip: null,
  contentWidth: false,
  lightStyle: false,
  style: {},
  disabled: false,
  reverse: false,
} as Partial<Props>

export default Button
