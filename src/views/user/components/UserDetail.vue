<template>
  <div class="userEdit-container">
    <el-form
      ref="formRef"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="form.password"
          type="password"
        />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input
          v-model="form.password2"
          type="password"
        />
      </el-form-item>
      <el-form-item
        label="openid"
        v-if="form.openid"
      >
        {{ form.openid }}
      </el-form-item>
      <el-form-item label="是否是管理员">
        <el-switch
          v-model="form.ismanage"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handeSubmit"
        >
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, onMounted } from 'vue'
import { getUser, putUsers } from '@/apis/user'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  props: {
    isEdit: {
      type: Boolean,
      default: true
    }
  },

  setup(prop) {
    const router = useRouter()
    const route = useRoute()
    const dataMap = reactive({
      form: {
        username: '',
        password: '',
        password2: '',
        ismanage: false
      }
    })
    const fetchData = async(id: any) => {
      const res = await getUser({ id })
      console.log(res, '-------------------')
      if (res?.code === 200) {
        dataMap.form = { ...dataMap.form, ...res.data }
      } else {
        ElMessage.error(res?.msg)
      }
    }
    const handeSubmit = async() => {
      if (!dataMap.form.username.length) {
        ElMessage.error('请填写用户名！')
        return
      }
      if (
        (dataMap.form.password.length || dataMap.form.password2.length) &&
        dataMap.form.password.length !== dataMap.form.password2.length
      ) {
        ElMessage.error('两次密码不一致！')
        return
      }
      const res = await putUsers({ ...dataMap.form })
      if (res?.code === 200) {
        ElMessage.success(res.msg)
        if (prop.isEdit) {
          router.go(-1)
        } else {
          dataMap.form = {
            username: '',
            password: '',
            password2: '',
            ismanage: false
          }
        }
      } else {
        ElMessage.error(res?.msg)
      }
    }
    onMounted(() => {
      if (prop.isEdit) {
        fetchData(route.params.id)
      }
    })
    return {
      ...toRefs(dataMap),
      handeSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.userEdit-container {
  padding: 30px 0;
}
</style>
