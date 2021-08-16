import { createApp } from 'vue'
import Message from './Message.vue'

export type MessageType = 'success' | 'error' | 'default'

const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  const messageInstace = createApp(Message, {
    message,
    type
  })

  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstace.mount(mountNode)
  setTimeout(() => {
    messageInstace.unmount()
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage
