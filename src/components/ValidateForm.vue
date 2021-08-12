<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">Commit</button>
      </slot>
    </div>
  </form>
</template>

<script lang='ts'>
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

type ValidateFunc = () => boolean
type ClearFunc = () => void
interface CallbackProps {
  validator: ValidateFunc;
  clearInput: ClearFunc;
}
type Events = { 'form-item-created': CallbackProps}
export const emitter = mitt<Events>()

export default defineComponent({
  name: "ValidateForm",
  emits: ['form-submit'],
  setup(props, context) {
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }
    let funcArr: ValidateFunc[] = []
    let clearArr: ClearFunc[] = []
    const callback = (obj?: CallbackProps) => {
      if (obj) {
        funcArr.push(obj.validator)
        clearArr.push(obj.clearInput)
      }
    }
    const clearInputs = () => {
      clearArr.forEach(clear => clear())
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funcArr = []
      clearArr = []
    })
    return {
      submitForm,
      clearInputs
    }
  }
})
</script>

<style>
</style>