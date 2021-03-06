<template>
  <div class="app-container">
    <div class="op">
      <router-link to="/user/edit/">
        <el-button type="primary">
          添加用户
        </el-button>
      </router-link>
    </div>
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
        width="220"
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

          <el-popconfirm
            title="确认删除吗?"
            @confirm="handleDelete(row.id)"
          >
            <template #reference>
              <el-button
                type="danger"
                size="small"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      @current-change="fetchData"
      layout="prev, pager, next"
      :total="total"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { UserInfoModel } from '@/model/userModel'
import { getUsersList, delUsers } from '@/apis/user'
import { ElMessage } from 'element-plus'
export default defineComponent({
  setup() {
    const dataMap = reactive({
      list: Array<UserInfoModel>(),
      total: 0,
      page: 1,
      pageSize: 5,
      listLoading: true
    })

    const fetchData = async(page: number) => {
      dataMap.listLoading = true
      dataMap.page = page
      const res = await getUsersList({ page, pageSize: dataMap.pageSize })
      if (res?.code === 200) {
        dataMap.list = res?.data.list ?? []
        dataMap.total = res?.data.total || 0
      } else {
        ElMessage.error(res?.msg)
      }
      // Just to simulate the time of the request
      setTimeout(() => {
        dataMap.listLoading = false
      }, 0.5 * 1000)
    }
    const handleDelete = async(id: number) => {
      const res = await delUsers({ id })
      if (res?.code === 200) {
        fetchData(dataMap.page)
        ElMessage.success(res?.msg)
      }
    }
    onMounted(() => {
      fetchData(dataMap.page)
    })
    return {
      ...toRefs(dataMap),
      fetchData,
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
