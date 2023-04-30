<template>
  <div class="content">
    <div class="-header-input">
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
                <UpOutlined/>
              </template>
              <template v-else>
                <DownOutlined/>
              </template>
              展开
            </a>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="-middle-table">
      <div style="margin-bottom: 16px">
        <a-space>

          <a-button type="primary" @click="showDrawer">
            新建
          </a-button>
          <a-drawer
              title="新建菜单"
              :width="720"
              :visible="visible"
              :body-style="{ paddingBottom: '80px' }"
              :footer-style="{ textAlign: 'right' }"
              @close="onClose"
          >
            <a-form :model="form" :rules="rules" layout="vertical">
              <a-row :gutter="16">
                <a-col :span="12">
                  <a-form-item label="标题" name="title">
                    <a-input v-model:value="form.title" placeholder="请输入菜单标题"/>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="图标" name="icon">
                    <a-input
                        v-model:value="form.icon"
                        style="width: 100%"
                        placeholder="请输入图标"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col :span="12">
                  <a-form-item label="图标颜色" name="iconColor">
                    <a-input
                        v-model:value="form.iconColor"
                        style="width: 100%"
                        placeholder="请输入图标颜色"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="请求路径" name="path">
                    <a-input
                        v-model:value="form.path"
                        style="width: 100%"
                        placeholder="请输入请求路径"
                    />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col :span="12">
                  <a-form-item label="文件夹名" name="name">
                    <a-input
                        v-model:value="form.name"
                        style="width: 100%"
                        placeholder="请输入文件夹名"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="菜单权限" name="permissions">
                    <a-select v-model:value="form.permissions" placeholder="请选择菜单权限">
                      <template v-for="item in permissions" :key="permissions.value">
                        <a-select-option :value="item.value">{{ item.name }}</a-select-option>
                      </template>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :gutter="16">
                <a-col :span="12">
                  <a-form-item label="组件名称" name="component">
                    <a-input
                        v-model:value="form.component"
                        style="width: 100%"
                        placeholder="请输入组件名称"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="父级菜单" name="pid">
                    <a-select v-model:value="form.pid" placeholder="请选择菜单权限">
                      <a-select-option value="0">无父菜单</a-select-option>
                      <template v-for="item in data" :key="data.menuId">
                        <a-select-option :value="item.menuId">{{ item.title }}</a-select-option>
                      </template>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
            <template #extra>
              <a-space>
                <a-button @click="onClose">取消</a-button>
                <a-button type="primary" @click="onSubmitData">确认</a-button>
              </a-space>
            </template>
          </a-drawer>
          <a-popconfirm
              title="是否确认删除"
              ok-text="是"
              cancel-text="否"
              @confirm="confirm"
              @cancel="cancel"
              :disabled="!hasSelected"
          >
            <a-button style="margin-left: 10px" type="primary" :disabled="!hasSelected">
              删除
            </a-button>
          </a-popconfirm>
        </a-space>
      </div>
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
import {ref, computed, reactive, toRefs, onBeforeMount} from 'vue';

const expand = ref(false);
const formRef = ref<FormInstance>();
const formState = reactive({
  hidden:null,
  pid:null,
  title:null,
  permissions:null

});
import {DownOutlined, UpOutlined} from '@ant-design/icons-vue';
import type {FormInstance} from "ant-design-vue";
import {HttpManager} from "@/api/system";
import type {Rule} from 'ant-design-vue/es/form';
import {menuStore} from "@/stores/menuStore";
import Swal from 'sweetalert2';
//------------------选择条件---------------------------

let store = menuStore();

const onFinish =async (values: any) => {
  console.log('Received values of form: ', values);
  console.log('formState: ', formState);
  let response = await HttpManager.getMenu(formState);
  data.value = response.data.data;
};

let searchField=[
  {
    field:"",
    title:""
  },
  {
    field:"title",
    title:"菜单名称"
  },
  {
    field:"permissions",
    title:"菜单权限"
  },
  {
    field:"hidden",
    title:"是否隐藏"
  },
  {
    field:"pid",
    title:"父亲菜单"
  },
]


//-----------------------表格------------------
type Key = string | number;

interface DataType {
  key: Key;
  menuId: number;
  title: string;
  icon: string;
  iconColor: string;
  path: string;
  component: string;
  name: string;
  permissions: string;
  hidden: boolean;
}

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'title',
  },
  {
    title: '图标',
    dataIndex: 'icon',
  },
  {
    title: '图标颜色',
    dataIndex: 'iconColor',
  },
  {
    title: '请求路径',
    dataIndex: 'path',
  },
  {
    title: '组件名',
    dataIndex: 'component',
  },
  {
    title: '组件文件夹',
    dataIndex: 'name',
  },
  {
    title: '菜单权限',
    dataIndex: 'permissions',
  },
  {
    title: '是否隐藏',
    dataIndex: 'hidden',
  },
  {
    key: "operation",
    title: '操作',
    dataIndex: 'operation',
  },
];

let data = ref<DataType[]>();
let permissions = ref()

onBeforeMount(async () => {
  //获取分页菜单
  let response = await HttpManager.getMenu({});
  data.value = response.data.data;

})

const confirm =async (e: MouseEvent) => {
let res=await HttpManager.deleteMenu(state.selectedRowKeys.join(","));
  setTimeout(() => {
    state.loading = false;
    state.selectedRowKeys = [];
  }, 1000);
  if(res.data<0){
    await Swal.fire(
        {
          title: '删除菜单失败',
          icon: 'error',
        }
    )
  }else{
    await Swal.fire(
        {
          title: '删除菜单成功',
          icon: 'success',
        }
    )
  }
};

const cancel = (e: MouseEvent) => {
  setTimeout(() => {
    state.loading = false;
    state.selectedRowKeys = [];
  }, 1000);
};

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
let { selectedRowKeys} = toRefs(state)

const form = reactive({
  title: '',
  icon: '',
  iconColor: '',
  path: '',
  name: '',
  permissions: null,
  component: '',
  pid: ''
});

const rules: Record<string, Rule[]> = {
  title: [{required: true, message: '请输入标题'}],
  icon: [{required: true, message: '请输入图标'}],
  iconColor: [{required: true, message: '请输入图标颜色'}],
  path: [{required: true, message: '请输入请求路径'}],
  name: [{required: true, message: '请输入文件夹名'}],
  permissions: [{required: true, message: '请输入菜单权限'}],
  component: [{required: true, message: '请输入组件名称'}],
  pid: [{required: true, message: '请选择父级菜单'}],
};

const visible = ref<boolean>(false);

const showDrawer = async () => {
  visible.value = true;
  //查询权限信息
  let permissionsResponse = await HttpManager.getPermissions();
  permissions.value = permissionsResponse.data;
  let response = await HttpManager.getMenu({});
  data.value = response.data.data;
};

const onClose = async () => {
  visible.value = false;
};

const onSubmitData = async () => {
  visible.value = false;
  if(form.title==''||form.permissions==''||form.component==''
      ||form.path==''||form.icon==''||form.iconColor==''||form.name==''||form.pid==''){
    return;
  }
  let flag = await HttpManager.addMenu(form)
  if (flag.data < 0) {
    await Swal.fire(
        {
          title: '新增菜单失败',
          icon: 'error',
        }
    )
  }
  //获取分页菜单
  let response = await HttpManager.getMenu({});
  data.value = response.data.data;
  await store.getMenu();
  await Swal.fire(
      {
        title: '新增菜单成功',
        icon: 'success',
      }
  )
};

</script>

<style lang="less" scoped>
@--ant-div-background-color: #ffffff;
@--el-border-color-light: 1px;
.content {
  .-header-input {
    padding: 20px;
    background-color: @--ant-div-background-color;
    box-shadow: 0 0 6px #0003;
    border: 1px solid @--el-border-color-light;
    border-radius: 5px;
  }

  .-middle-table {
    margin-top: 20px;
    padding: 20px;
    background-color: @--ant-div-background-color;
    box-shadow: 0 0 6px #0003;
    border: 1px solid @--el-border-color-light;
    border-radius: 5px;
  }
}


</style>