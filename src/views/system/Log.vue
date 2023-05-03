<template>
  <div class="content">
    <div class="-header-log">
      <div>
        <a-form
            ref="formRef"
            name="advanced_search"
            class="ant-advanced-search-form"
            :model="formState"
            @finish="onFinish"
        >
          <a-row :gutter="24">
            <template v-for="i in 4" :key="i">
              <a-col v-show="expand || i <=3" :span="8">
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
              <a style="font-size: 12px" @click="expand = !expand">
                <template v-if="expand">
                  <UpOutlined />
                 收起
                </template>
                <template v-else>
                  <DownOutlined />
                  展开
                </template>

              </a>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <div class="-middle-log">
      <a-table
          :columns="columns"
          :data-source="data"
      >
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import type {FormInstance} from "ant-design-vue";
const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive({

});
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';


import type { TableProps } from 'ant-design-vue';
import { usePagination } from 'vue-request';
import { computed } from 'vue';
import axios from 'axios';
import {getLogPageList} from "@/api/log";


const onFinish = async (values: any) => {
  let log=await getLogPageList(values);
  console.log(log);
  data.value=log.data

};
let searchField=[
  {
    field:"",
    title:""
  },
  {
    field:"operIp",
    title:"操作IP"
  },
  {
    field:"operUrl",
    title:"操作URL"
  },
  {
    field:"requestMethod",
    title:"操作方法"
  },
  {
    field:"operName",
    title:"操作人"
  },
]


let logRequestParam:API.LogQueryParam={

}

let data = ref<API.LogData>();

onMounted(async ()=>{
  let log=await getLogPageList(logRequestParam);
  console.log(log);
  data.value=log.data
})

const columns = [
  {
    title: '日志级别',
    dataIndex: 'level',
  },
  {
    title: '业务类型',
    dataIndex: 'businessType',
  },
  {
    title: '请求方式',
    dataIndex: 'requestMethod',
  }, {
    title: '操作人',
    dataIndex: 'operName',
  }, {
    title: '请求URL',
    dataIndex: 'operUrl',
  }, {
    title: '请求IP',
    dataIndex: 'operIp',
  }, {
    title: '请求耗时',
    dataIndex: 'operTime',
  }, {
    title: '异常详情',
    dataIndex: 'exceptionDetail',
  },
];



type Key = string | number;
const state = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
});

</script>

<style lang="less" scoped>
@--el-border-color-light:1px;
@--ant-div-background-color: #ffffff;

.content{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .-header-log{
    margin-bottom: 10px;
    padding: 20px;
    background-color: @--ant-div-background-color;
    box-shadow: 0 0 6px #0003;
    border: 1px solid @--el-border-color-light;
    border-radius: 5px;

  }

  .-middle-log{
    margin-top: 10px;
    background-color: @--ant-div-background-color;
    flex: 1;
    box-shadow: 0 0 6px #0003;
    border: 1px solid var(--el-border-color-light);
    border-radius: 5px;
    padding: 10px;
  }
  #components-form-demo-advanced-search .ant-form {
    max-width: none;
  }
  #components-form-demo-advanced-search .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 2px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }
  [data-theme='dark'] .ant-advanced-search-form {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid #434343;
    padding: 24px;
    border-radius: 2px;
  }
  [data-theme='dark'] #components-form-demo-advanced-search .search-result-list {
    border: 1px dashed #434343;
    background: rgba(255, 255, 255, 0.04);
  }
}
</style>