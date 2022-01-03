<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
    >
      <el-table-column
        width="95"
        align="center"
        label="头像"
      >
        <template #default="{row}">
          <el-avatar
            shape="square"
            :size="50"
            :src="row.avatar"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="用户名"
      >
        <template #default="{row}">
          {{ row.username }}
        </template>
      </el-table-column>
      <el-table-column
        label="角色"
        width="150"
        align="center"
      >
        <template
          #default="{row}"
        >
          <template
            v-for="(v,k) in row.roles"
          >
            <el-tag
              v-if="v"
              :key="k"
            >
              {{ v }}
            </el-tag>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        width="350"
        align="center"
        label="openid"
      >
        <template #default="{row}">
          {{ row.openid }}
        </template>
      </el-table-column>
      <el-table-column
        width="220"
        align="center"
        label="注册日期"
      >
        <template #default="{row}">
          <i class="el-icon-time" />
          <span>{{ row.timestamp }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        align="center"
        label="操作"
        fixed="right"
      >
        <template #default="{row}">
          <router-link :to="'/user/edit/'+row.id">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
            >
              编辑
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { UserInfoModel } from '@/model/userModel'
import { getUsersList } from '@/apis/user'
import { ElMessage } from 'element-plus'
export default defineComponent({
  setup() {
    const dataMap = reactive({
      list: Array<UserInfoModel>(),
      listLoading: true
    })

    const fetchData = async() => {
      dataMap.listLoading = true
      const res = await getUsersList({ /* Your params here */ })
      if (res?.code === 200) {
        dataMap.list = res?.data.list ?? []
      } else {
        ElMessage.error(res?.msg)
      }
      // Just to simulate the time of the request
      setTimeout(() => {
        dataMap.listLoading = false
      }, 0.5 * 1000)
    }
    const handleEdit = async(row: any) => {
      console.log(row)
    }
    onMounted(() => {
      fetchData()
    })
    return {
      ...toRefs(dataMap),
      fetchData,
      handleEdit
    }
  }
})
</script>

<style lang="" scoped>

</style>
