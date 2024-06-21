import styled from 'styled-components'
import { Button } from 'antd'

export const WindowItemStyle = styled.div`
  position: fixed;
  z-index: 100;
  width: 50%;
  top: 20%;
  left: 0;
  right: 0;
  margin: 0 auto;
  height: 50%;
  overflow: hidden;
`

export const WindowBodyStyle = styled.div`
  overflow: scroll;
  height: 100%;
`

export const WindowCloseButton = styled(Button)``
