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
    </div>
    <div class="-middle-log">
      <a-table
          :columns="columns"
          :data-source="data"
          :loading="loadding"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.key === 'operation'">
            <a-button type="primary" @click="showDrawer(record)">修改</a-button>
            <template>
              <a-radio-group v-model:value="placement" style="margin-right: 8px">
                <a-radio value="right">right</a-radio>
              </a-radio-group>
              <a-drawer
                  :width="500"
                  title="修改用户信息"
                  :placement="placement"
                  :visible="visible"
                  @close="onClose"
              >
                <template #extra>
                  <a-button style="margin-right: 8px" @click="onClose">取消</a-button>
                  <a-button type="primary" @click="onOk">确认</a-button>
                </template>
                <div style="display: flex;margin-bottom: 10px">
                  <span style="padding-right: 10px">账号:</span>
                  <a-mentions style="flex: 1" :placeholder="userInfo.username" readonly/>
                </div>
                <div style="display: flex;margin-bottom: 10px">
                  <span style="padding-right: 10px">姓名:</span>
                  <a-mentions style="flex: 1" :placeholder="userInfo.name" readonly/>
                </div>
                <div style="display: flex;margin-bottom: 10px">
                  <span style="padding-right: 10px">性别:</span>
                  <a-mentions style="flex: 1" :placeholder="userInfo.gender===0?'男':'女'" readonly/>
                </div>
                <div style="display: flex;margin-bottom: 10px">
                  <span style="padding-right: 10px">手机:</span>
                  <a-mentions style="flex: 1" :placeholder="userInfo.mobile" readonly/>
                </div>
                <div style="display: flex;margin-bottom: 10px">
                  <span style="padding-right: 10px">邮箱:</span>
                  <a-mentions style="flex: 1" :placeholder="userInfo.email" readonly/>
                </div>
                <div style="display: flex;margin-bottom: 10px">
                  <span style="padding-right: 10px">类型:</span>
                  <a-mentions style="flex: 1" :placeholder="userInfo.type" readonly/>
                </div>
                <div style="display: flex;margin-bottom: 10px">
                  <span style="padding-right: 10px">职称:</span>
                  <a-mentions style="flex: 1" :placeholder="userInfo.professional" readonly/>
                </div>
                <div style="display: flex;margin-bottom: 10px">
                  <span style="padding-right: 10px">权限:</span>
                  <a-select
                      v-model:value="userInfo.permissions"
                      mode="multiple"
                      style="width: 100%"
                      :allowClear="true"
                      placeholder="请选择"
                      :options="[...names.map((_, i) => ({ value:_ }))]"
                      @change="handleChange"
                  ></a-select>
                </div>
              </a-drawer>
            </template>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from "vue";
import type {FormInstance} from "ant-design-vue";
import type {DrawerProps} from 'ant-design-vue';

const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive({});
import {DownOutlined, UpOutlined} from '@ant-design/icons-vue';


import type {TableProps} from 'ant-design-vue';
import {usePagination} from 'vue-request';
import {computed} from 'vue';
import axios from 'axios';
import {getLogPageList} from "@/api/log";
import {HttpManager} from "@/api/system";
import User = API.User;

const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

let loadding = ref(false)

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

let userInfo = reactive<User>({});


const placement = ref<DrawerProps['placement']>('left');
const visible = ref<boolean>(false);
let cacheUserId = ref()
const showDrawer = (record: any) => {
  visible.value = true;
  console.log(record)
  cacheUserId = record.id
  Object.assign(userInfo, record)
};

const onClose = () => {
  visible.value = false;
};
const onOk = async () => {
  loadding.value = true
  let permission: any = [];
  console.log("确认", userInfo)
  userInfo.permissions?.forEach(role => {
    let roles = getValueByName(role);
    if (roles != null) {
      permission.push(roles);
    }
  })
  await HttpManager.updateUser({id: cacheUserId, roles: permission.join(",")})
  let account = await HttpManager.getAccount(values);
  data.value = account.data;
  data.value?.forEach(info => {
    info.sex = info.gender == 0 ? '男' : '女'
    info.roles.split(",").forEach(role => {
      let p = getNameByValue(Number(role))
      if (info.permissions == null || info.permissions.length <= 0) {
        if (p != null) {
          info.permissions = [p]
        }
      } else {
        if (p != null) {
          info.permissions.push(p)
        }
      }
    })
  })
  visible.value = false;
  loadding.value = false
};

const onFinish = async (values: any) => {
  loadding.value = true
  let account = await HttpManager.getAccount(values);
  data.value = account.data;
  data.value?.forEach(info => {
    info.sex = info.gender == 0 ? '男' : '女'
    info.roles.split(",").forEach(role => {
      let p = getNameByValue(Number(role))
      if (info.permissions == null || info.permissions.length <= 0) {
        if (p != null) {
          info.permissions = [p]
        }
      } else {
        if (p != null) {
          info.permissions.push(p)
        }
      }
    })
  })
  loadding.value = false
};
let searchField = [
  {
    field: "",
    title: ""
  },
  {
    field: "username",
    title: "账号"
  },
  {
    field: "name",
    title: "用户名"
  },
  {
    field: "type",
    title: "用户类型"
  }
]

//表格数据类型
interface DataType {
  key: Key;
  id: number;
  username: string;
  roles: string;
  name: string;
  gender: number;
  sex: string;
  mobile: string;
  email: string;
  type: string;
  professional: string;
  permissions: string[];
}

function getValueByName(name: string): number | undefined {
  const permission = roles.find(p => p.name === name);
  return permission?.value;
}

function getNameByValue(value: number): string | undefined {
  const permission = roles.find(p => p.value === value);
  return permission?.name;
}


let roles = reactive<API.Permissions[]>([]);
//保存用户类型
let userTypeInfos = reactive({})
//表格数据源
let data = ref<DataType[]>();
let values = ref()
let names=ref()
onMounted(async () => {
  loadding.value = true
  let userTypeInfo = await HttpManager.getUserType()
  Object.assign(userTypeInfos, userTypeInfo.data)
  //查询所有权限
  let permissions = await HttpManager.getPermissions()
  Object.assign(roles, permissions.data)
  values.value = roles.map(function (item) {
    return item.value;
  });

  names.value = roles.map(function (item) {
    return item.name;
  });

  let account = await HttpManager.getAccount({});
  data.value = account.data;
  data.value?.forEach(info => {
    info.sex = info.gender == 0 ? '男' : '女'
    info.roles.split(",").forEach(role => {
      let p = getNameByValue(Number(role))
      if (info.permissions == null || info.permissions.length <= 0) {
        if (p != null) {
          info.permissions = [p]
        }
      } else {
        if (p != null) {
          info.permissions.push(p)
        }
      }
    })
  })
  loadding.value = false

})

const columns = [
  {
    title: '账号',
    dataIndex: 'username',
  },
  {
    title: '权限',
    dataIndex: 'roles',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '性别',
    dataIndex: 'sex',
  },
  {
    title: '手机',
    dataIndex: 'mobile',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '用户类型',
    dataIndex: 'type',
  },
  {
    title: '职称',
    dataIndex: 'professional',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: "operation",
    width: '10%',
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
@--el-border-color-light: 1px;
@--ant-div-background-color: #ffffff;

.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .-header-log {
    margin-bottom: 10px;
    padding: 20px;
    background-color: @--ant-div-background-color;
    box-shadow: 0 0 6px #0003;
    border: 1px solid @--el-border-color-light;
    border-radius: 5px;

  }

  .-middle-log {
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