<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'

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
    GlobalHeader
  },
  setup() {
    return {
      list: testData,
      currentUser
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
