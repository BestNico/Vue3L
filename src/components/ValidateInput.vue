<template>
  <div class="validate-input-container pd-3">
    <input
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    >
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, PropType, onMounted } from 'vue'
import { emitter } from "./ValidateForm.vue"

const emailReg = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i
const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/

interface Range {
  message: string;
  length: number;
}

interface RuleProp {
  type: 'required' | 'email' | 'password' | 'range';
  message?: string;
  min?: Range;
  max?: Range;
}

export type RulesProp = RuleProp[]
export default defineComponent({
  name: "ValidataInput",
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String
  },
  inheritAttrs: false,
  setup(props, context) {
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    const validateInput = () => {
      if (props.rules) {
        const allPassed: boolean = props.rules.every(rule => {
          let passed = true
          switch (rule.type) {
            case 'required':
              inputRef.message = rule.message || ''
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              inputRef.message = rule.message || ''
              passed = emailReg.test(inputRef.val)
              break
            case 'range':
              inputRef.message = rule.min?.message || rule.max?.message || ''
              if ((rule.min?.length && inputRef.val.length < rule.min.length) ||
               (rule.max?.length && inputRef.val.length > rule.max.length)) {
                passed = false
              }
              break
            case 'password':
              inputRef.message = rule.message || ''
              passed = passwordReg.test(inputRef.val)
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed

        return allPassed
      }

      return true
    }

    const clearInput = () => {
      inputRef.val = ""
    }
    onMounted(() => {
      emitter.emit('form-item-created', {
        validator: validateInput,
        clearInput
      })
    })
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>
<style>
</style>