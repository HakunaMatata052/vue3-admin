<template>
  <div class="app-container">
    <div class="op">
      <el-button
        type="primary"
        @click="handleShowAdd"
      >
        添加配置
      </el-button>
    </div>
    <el-form
      ref="formRef"
      :model="form"
      label-width="120px"
    >
      <el-row
        :gutter="20"
        v-for="(v,k) in form"
        :key="k"
      >
        <el-col
          :span="12"
        >
          <el-form-item
            :label="form[k].title"
          >
            <el-input
              v-model="form[k].value"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
        >
          <el-form-item
            label="排序"
            label-width="60px"
          >
            <el-input
              v-model="form[k].sort"
            />
          </el-form-item>
        </el-col>
        <el-col
          :span="6"
        >
          <el-popconfirm
            v-if="!form[k].constant"
            title="确认删除吗?"
            @confirm="handleDelete(form[k].id)"
          >
            <template #reference>
              <el-button
                type="danger"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleSubmit"
        >
          修改
        </el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      v-model="dialogFormVisible"
      title="Shipping address"
    >
      <el-form :model="formAdd">
        <el-form-item
          label="字段名称(纯英文)"
          label-width="120px"
        >
          <el-input
            v-model="formAdd.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="字段标题"
          label-width="120px"
        >
          <el-input
            v-model="formAdd.title"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="字段默认值"
          label-width="120px"
        >
          <el-input
            v-model="formAdd.value"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="字段排序"
          label-width="120px"
        >
          <el-input
            v-model="formAdd.sort"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="handleAdd"
          >添加</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { getBasic, editBasic, addBasic, delBasic } from '@/apis/system'
import { ElMessage } from 'element-plus'
export default defineComponent({
  setup() {
    const dataMap = reactive({
      form: Array<any>(),
      listLoading: true,
      dialogFormVisible: false,
      formAdd: {}
    })

    const fetchData = async() => {
      dataMap.listLoading = true
      const res = await getBasic()
      if (res?.code === 200) {
        dataMap.form = res.data
      } else {
        ElMessage.error(res?.msg)
      }
      // Just to simulate the time of the request
      setTimeout(() => {
        dataMap.listLoading = false
      }, 0.5 * 1000)
    }
    const handleSubmit = async() => {
      const res = await editBasic(dataMap.form)
      if (res?.code === 200) {
        ElMessage.success(res?.msg)
      } else {
        ElMessage.error(res?.msg)
      }
    }
    const handleShowAdd = () => {
      dataMap.dialogFormVisible = true
    }
    const handleAdd = async() => {
      const res = await addBasic(dataMap.formAdd)
      if (res?.code === 200) {
        fetchData()
        dataMap.dialogFormVisible = false
        ElMessage.success(res?.msg)
      } else {
        ElMessage.error(res?.msg)
      }
    }
    const handleDelete = async(id: number) => {
      const res = await delBasic({ id })
      if (res?.code === 200) {
        fetchData()
        ElMessage.success(res?.msg)
      } else {
        ElMessage.error(res?.msg)
      }
    }
    onMounted(() => {
      fetchData()
    })
    return {
      ...toRefs(dataMap),
      fetchData,
      handleSubmit,
      handleShowAdd,
      handleAdd,
      handleDelete
    }
  }
})
</script>

<style lang="scss" scoped>
.op{
  margin-bottom: 20px;
}

.pagination{
  width: 100%;
  text-align: center;
  margin: 30px 0;
}
</style>
