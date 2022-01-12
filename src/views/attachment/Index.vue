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
        width="80"
        align="center"
        label="id"
        prop="id"
      />
      <el-table-column
        width="220"
        align="center"
        label="图片"
      >
        <template #default="{row}">
          <el-popover
            placement="right"
            width="auto"
            trigger="click"
          >
            <template #reference>
              <img
                :src="row.imgurl"
                style="width: 200px;height:120px;object-fit: cover;display:block;"
              >
            </template>
            <img
              :src="row.imgurl"
              style="width: auto;max-height:90vh;display:block;"
            >
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="原始名称"
      >
        <template #default="{row}">
          {{ row.originalname }}
        </template>
      </el-table-column>
      <el-table-column
        width="350"
        align="center"
        label="上传时间"
      >
        <template #default="{row}">
          <i class="el-icon-time" />
          {{ row.timestamp }}
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        align="center"
        label="附件大小"
      >
        <template #default="{row}">
          <span>{{ parseInt(row.size/1024) }}Kb</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        align="center"
        label="操作"
        fixed="right"
      >
        <template #default="{row}">
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
import { AttachmentModel } from '@/model/attachmentModel'
import { getAttachmentList, delAttachment } from '@/apis/attachment'
import { ElMessage } from 'element-plus'
export default defineComponent({
  setup() {
    const dataMap = reactive({
      list: Array<AttachmentModel>(),
      total: 0,
      page: 1,
      pageSize: 5,
      listLoading: true
    })

    const fetchData = async(page: number) => {
      dataMap.listLoading = true
      dataMap.page = page
      const res = await getAttachmentList({ page, pageSize: dataMap.pageSize })
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
      const res = await delAttachment({ id })
      if (res?.code === 200) {
        fetchData(dataMap.page)
        ElMessage.success(res?.msg)
      } else {
        ElMessage.error(res?.msg)
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
.pagination{
  width: 100%;
  text-align: center;
  margin: 30px 0;
}
</style>
