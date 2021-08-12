<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <column-list :list="list"></column-list>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validata-input
          :rules="emailRules"
          v-model="emailVal"
          type="text"
          placeholder="Please Input email address"
        />
        {{emailVal}}
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <validata-input
          type="password"
          placeholder="Please input password"
          :rules="passwordRules"
          v-model="passwordVal"
        />
      </div>
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ValidataInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'

const currentUser: UserProps = {
  isLogin: true,
  name: "Themirage"
}

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test title 1',
    avatar: require("./assets/logo.png"),
    description: 'test description one'
  },
  {
    id: 2,
    title: 'test title 2',
    avatar: require("./assets/logo.png"),
    description: 'test description two'
  },
  {
    id: 3,
    title: 'test title 2',
    description: 'test description third'
    //avatar: require("./assets/logo.png"),
  },
  {
    id: 4,
    title: 'test title 4',
    avatar: require("./assets/logo.png"),
    description: 'test description forth'
  }
]

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    ValidataInput,
    ValidateForm
  },
  setup() {
    const emailVal = ref("")
    const emailRules: RulesProp = [
      { type: 'required', message: 'Should not be empty' },
      { type: 'email', message: 'Should not be a valid email' }
    ]
    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: 'Should not be empty' },
      { type: 'range', min: { message: "Your password must over then 8 bits", length: 8 } },
      { type: 'range', max: { message: "Your password must shorter then 16 bits", length: 16 } },
      { type: 'password', message: '至少1个大写字母，1个小写字母和1个数字' }
    ]

    const onFormSubmit = (result: boolean) => {
      console.log(result)
    }
    return {
      list: testData,
      currentUser,
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
