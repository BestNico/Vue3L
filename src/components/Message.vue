<template>
<teleport to="#message">
  <div class="alert nessage-info fixed-top w-50 mx-auto d-flex justify-content-between mt-2"
    :class="classObject" v-if="isVisibal">
    <span>{{message}}</span>
    <button type="button" class="btn-close" aria-label="Close" @click.prevent="hide">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</teleport>
</template>
<script lang='ts'>
import { defineComponent, PropType, ref } from 'vue'
import useDOMCreate from '../hooks/useDOMCreate'

export type MessageType = 'success' | 'error' | 'default'

export default defineComponent({
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      required: true,
      default: 'default'
    }
  },
  emits: ['close-message'],
  setup(props, context) {
    useDOMCreate('message')

    const isVisibal = ref(true)
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }

    const hide = () => {
      isVisibal.value = false
      context.emit('close-message', true)
    }
    return {
      classObject,
      isVisibal,
      hide
    }
  }
})
</script>
<style>
</style>