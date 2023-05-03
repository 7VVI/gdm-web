<template>
  <div class="content">
    <div class="-header-search">
      <a-form
          ref="formRef"
          name="advanced_search"
          class="ant-advanced-search-form"
          :model="formState"
          @finish="onFinish"
      >
        <a-row :gutter="24">
          <template v-for="i in 2" :key="i">
            <a-col v-show="expand || i <=2" :span="8">
              <a-form-item
                  :name="searchField[i].field"
                  :label="searchField[i].title"
                  :rules="[{ required: false, message: '请输入内容' }]"
              >
                <a-input v-model:value="formState[searchField[i].field]" placeholder="请输入内容"></a-input>
              </a-form-item>
            </a-col>
          </template>
        </a-row>
        <a-row>
          <a-col :span="24" style="text-align: right">
            <a-button type="primary" html-type="submit">查询</a-button>
            <a-button style="margin: 0 8px" @click="() => formRef.resetFields()">清空</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="--middle-table">
      <a-table
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :columns="columns"
          :data-source="data"
      >
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'operation'">
            <a>修改</a>
          </template>
        </template>
      </a-table>
    </div>
  </div>

</template>

<script setup lang="ts">
import {ref, reactive} from "vue";
import type {FormInstance} from "ant-design-vue";

const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive({
  title: null,
  content: null
});
import {DownOutlined, UpOutlined} from '@ant-design/icons-vue';


const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
  console.log('formState: ', formState);
};
const searchField = [
  {
    field: "",
    title: ""
  },
  {
    field: "name",
    title: "标题"
  },
  {
    field: "content",
    title: "内容"
  }
]

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '内容',
    dataIndex: 'content',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
  },
  {
    key: "创建人",
    title: '操作',
    dataIndex: 'user',
  },
];
</script>

<style lang="less" scoped>

@--ant-div-background-color: #ffffff;
@--el-border-color-light: 1px;

.content{

  .-header-search {
    padding: 20px;
    background-color: @--ant-div-background-color;
    box-shadow: 0 0 6px #0003;
    border: 1px solid var(--el-border-color-light);
    border-radius: 5px;
  }

  .--middle-table{
    margin-top: 20px;
    background-color: @--ant-div-background-color;
    box-shadow: 0 0 6px #0003;
    border: 1px solid var(--el-border-color-light);
    border-radius: 5px;
  }
}

</style>