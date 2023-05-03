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
      <div class="button-table">
        <a-button type="primary" @click="showModal">新建</a-button>
        <a-button style="margin-left: 10px" type="primary" :disabled="!hasSelected" @click="deleteTopicSelection">
          删除
        </a-button>
        <a-modal v-model:visible="visible" title="新建公告" @ok="handleOk">
          <a-form :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
            <a-form-item label="公告标题" required>
              <a-input v-model:value="modelRef.title" placeholder="请输入公告标题"/>
            </a-form-item>
            <a-form-item label="公告内容">
              <a-textarea v-model:value="modelRef.content"/>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>

      <a-table
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :columns="columns"
          :data-source="data"
          :loading="loading"
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
import {ref, reactive, computed, toRefs, onMounted} from "vue";
import type {FormInstance} from "ant-design-vue";

const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive({
  title: null,
  content: null
});
import {DownOutlined, UpOutlined} from '@ant-design/icons-vue';
import {announcementAdd, announcementDelete, getAnnouncement} from "@/api/announcement";
import {topicSelectionDelete} from "@/api/topic.selection";
import AnnouncementAddParam = API.AnnouncementAddParam;
let loading=ref(false)
let modelRef = reactive<AnnouncementAddParam>({
  title: '',
  content: undefined,
});

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14},
};
const onFinish = async (values: any) => {
  loading.value=true
  console.log('Received values of form: ', values);
  console.log('formState: ', formState);
  let Announcement = await getAnnouncement(formState);
  data.value = Announcement.data
  data.value?.forEach(e => {
    e.key = e.id
  })
  loading.value=false
};
const searchField = [
  {
    field: "",
    title: ""
  },
  {
    field: "title",
    title: "标题"
  },
  {
    field: "content",
    title: "内容"
  }
]

const columns = [
  {
    title: '公告标题',
    dataIndex: 'title',
  },
  {
    title: '公告内容',
    dataIndex: 'content',
  },
  {
    title: '发布人',
    dataIndex: 'username',
  },
  {
    key: "发布时间",
    title: '发布时间',
    dataIndex: 'createTime',
  },
];

type Key = string | number;

let data = ref<API.Announcement>();

const state = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);


const onSelectChange = (selectedRowKeys: Key[]) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  state.selectedRowKeys = selectedRowKeys;
};
let {selectedRowKeys} = toRefs(state)

onMounted(async () => {
  loading.value=true
  let response = await getAnnouncement({});
  data.value = response.data
  data.value?.forEach(e => {
    e.key = e.id
  })
  loading.value=false
})

const visible = ref<boolean>(false);

const showModal = () => {
  visible.value = true;
};

const handleOk = async (e: MouseEvent) => {
  console.log(modelRef);
  visible.value = false;
  await announcementAdd(modelRef)
  let Announcement = await getAnnouncement({});
  data.value = Announcement.data
  data.value?.forEach(e => {
    e.key = e.id
  })
};

/**
 * 公告删除
 */
const deleteTopicSelection = async () => {
  console.log("id", state.selectedRowKeys.join(","))
  await announcementDelete(state.selectedRowKeys.join(","))
  let Announcement = await getAnnouncement({});
  data.value = Announcement.data
  data.value?.forEach(e => {
    e.key = e.id
  })
}
</script>

<style lang="less" scoped>

@--ant-div-background-color: #ffffff;
@--el-border-color-light: 1px;

.content {

  .-header-search {
    padding: 20px;
    background-color: @--ant-div-background-color;
    box-shadow: 0 0 6px #0003;
    border: 1px solid var(--el-border-color-light);
    border-radius: 5px;
  }

  .--middle-table {
    margin-top: 20px;
    background-color: @--ant-div-background-color;
    box-shadow: 0 0 6px #0003;
    border: 1px solid var(--el-border-color-light);
    border-radius: 5px;

    .button-table {
      padding: 10px;
    }
  }
}

</style>