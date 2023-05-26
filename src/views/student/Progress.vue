<template>
  <div class="content">

    <div class="--middle-table">
      <a-card title="毕设详情" :bordered="false" style="width: 600px">
        <div>
          <div style="display: flex;margin-bottom: 10px">
            <span style="padding-right: 10px">毕设题目:</span>
            <a-mentions style="flex: 1" :placeholder="project.title" readonly/>
          </div>
          <div style="display: flex;margin-bottom: 10px">
            <span style="padding-right: 10px">指导老师:</span>
            <a-mentions style="flex: 1" :placeholder="project.teacherName" readonly/>
          </div>
          <div style="display: flex;margin-bottom: 10px">
            <span style="padding-right: 10px">开始时间:</span>
            <a-mentions style="flex: 1" :placeholder="project.startDate" readonly/>
          </div>
          <div style="display: flex;margin-bottom: 10px">
            <span style="padding-right: 10px">结束时间:</span>
            <a-mentions style="flex: 1" :placeholder="project.endDate" readonly/>
          </div>
          <div style="display: flex;margin-bottom: 10px">
            <span style="padding-right: 10px">所属专业:</span>
            <a-mentions style="flex: 1" :placeholder="project.major" readonly/>
          </div>
          <div style="display: flex;margin-bottom: 10px">
            <span style="padding-right: 10px">学生类型:</span>
            <a-mentions style="flex: 1" :placeholder="project.studentType" readonly/>
          </div>
        </div>
      </a-card>
    </div>
    <div class="footer">
      <a-card title="文档提交" :bordered="false" style="width: 600px">
        <a-upload-dragger
            v-model:fileList="fileList"
            name="file"
            accept=".doc,.docx"
            :multiple="true"
            action="http://localhost:9000/api/fileManage/upload"
            @change="handleChange"
            @drop="handleDrop"
            :headers="header"
        >
          <p class="ant-upload-drag-icon">
            <inbox-outlined></inbox-outlined>
          </p>
          <p class="ant-upload-text">提交论文</p>
        </a-upload-dragger>
        <div style="margin: 20px"></div>
      </a-card>
    </div>
  </div>
  <div class="step">
    <a-steps :current="status">
      <a-step v-for="item in steps" :key="item.title" :title="item.title"/>
    </a-steps>
    <div class="steps-content">
      {{ steps[status].content }}
    </div>
    <div class="steps-action">
      <a-button v-if="status < steps.length - 1" type="primary" @click="next">选择进度</a-button>
      <a-button
          v-if="status == steps.length - 1"
          type="primary"
      >
        结束
      </a-button>
      <a-button v-if="status > 0" style="margin-left: 8px" @click="prev">前一进度</a-button>
      <a-button style="margin-left: 10px" type="primary" @click="handleOk">确认进度</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onBeforeMount} from "vue";
import {currentProject, statusUpdate} from "@/api/project";

import type {UploadChangeParam} from 'ant-design-vue';
import {InboxOutlined} from '@ant-design/icons-vue';
import {userStore} from "@/stores/userStore";
import {storeToRefs} from "pinia";

let store=userStore()
const { token } = storeToRefs( store )

let header={
  'Authorization': `Bearer ${token.value}`, // 设置Authorization
}

let project = reactive<API.currentProject>({});

const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {

  } else if (status === 'error') {

  }
};

const handleDrop = (e: DragEvent) => {
  console.log(e);
}

const fileList = ref([]);

onBeforeMount(async () => {
  let res = await currentProject()
  // project = res.data
 await Object.assign(project, res.data);
  console.log(project)
  if(project?.status===3){
    status.value=2
  }else{
    status.value = project.status;
  }
})


const status = ref<number>(0);
const next = () => {
  status.value++;
  if(status.value===steps.length){
    status.value=steps.length-1
  }
};
const prev = () => {
  status.value--;
  if(status.value<0){
    status.value=0
  }
};


let queryParam = reactive<API.QueryParam>({})
const handleOk = async () => {
  console.log(status.value)
  queryParam.id = project.id
  queryParam.status = status.value
  await statusUpdate(queryParam)
  let res = await currentProject()
  project = res.data
  status.value = project.status;

}

let steps = [
  {
    title: '进行中',
    content: '毕设状态',
  },
  {
    title: '已完成',
    content: '毕设状态',
  },
  {
    title: '申请免答',
    content: '毕设状态',
  },
]
</script>

<style lang="less" scoped>

@--ant-div-background-color: #ffffff;
@--el-border-color-light: 1px;

.content {
  display: flex;

  .--middle-table {
    background-color: @--ant-div-background-color;
    box-shadow: 0 0 6px #0003;
    border: 1px solid var(--el-border-color-light);
    border-radius: 5px;
    flex: 2.5;
  }

  .footer {
    margin-left: 20px;
    background-color: @--ant-div-background-color;
    box-shadow: 0 0 6px #0003;
    border: 1px solid var(--el-border-color-light);
    border-radius: 5px;
    flex: 1;
  }

}

.step {
  background-color: @--ant-div-background-color;
  box-shadow: 0 0 6px #0003;
  border: 1px solid var(--el-border-color-light);
  border-radius: 5px;
  margin-top: 20px;
  padding: 20px;
}

</style>