import { useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import styles from './index.module.scss'

type Props = {
  visible: boolean
  onClickMask?: () => void
}
export const Popup: React.FC<Props> = (props) => {
  const { visible, onClickMask } = props
  const [maskVisible, setMaskVisible] = useState(visible)
  const maskStyles = useSpring({
    opacity: visible ? 1 : 0,
    onStart: ({ value }) => {
      if (value.opacity < 0.1) { setMaskVisible(true) }
    },
    onRest: ({ value }) => {
      if (value.opacity < 0.1) { setMaskVisible(false) }
    }
  })
  const menuStyles = useSpring({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0%)' : 'translateY(100%)',
  })
  const maskStyles2 = {
    ...maskStyles,
    visibility: (maskVisible ? 'visible' : 'hidden') as 'visible' | 'hidden'
  } // workaround
  return (
    <div>
      <animated.div
        onClick={() => onClickMask?.()}
        className={styles.mask}
        style={maskStyles2}
      />
      <animated.div
        className={styles.menu}
        style={menuStyles}
      />
    </div>
  )
}
