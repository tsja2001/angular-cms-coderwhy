# CmsAngular

# 命令

* `pnpm install` 安装依赖
* `pnpm start` 启动
* `pnpm build` 构建

# 介绍

1. API源于Coderwhy的Vue项目, [Vue项目地址](https://github.com/tsja2001/vue3_ts_coderwhy-).
2. 边阅读Angular官方文档, 边开发此项目, 目的是接触到Angular尽可能的API与语法.

3. 账号: `coderwhy` 密码: `123456`

# 功能

1. JWT认证 + 路由守卫
2. 动态菜单赋权
3. 高封装性的Request Service, Store Service
4. Service形式调用全局组件(Alert、Message)

### 尝试将React与Vue的开发思维移植到Angular中, 并找到最佳实践:

####  1. 请求封装 `src/app/request/request.service.ts`

使用原生 `Http Service` 请求服务, 但对其进行封装. 实现以下功能:

* 将所有请求携带token
* 统一处理返回异常
* 解构返回数据, 只返回data

#### 2. 针对业务模块封装Service `src/app/request/{module}.service.ts`

将请求封装到Srevise中, 并在Service缓存请求数据, 具有以下优势:

* 页面需要请求时, 只需注入对应模块的Service, 无需手动引入Http模块或者URI常量.
* Service挂在在根结点中, 数据请求后缓存在Service, 实现数据全局缓存. 即使组件销毁, 数据也有保留, 便于数据复用.

#### 3. Service形式调用全局组件

* 封装Alert、Message, 并挂到根组件上, 通过Service实现全局调用.

#### 4. 配置路由守卫

* 初次进入与跳转时, 验证token是否过期, 若过期则清除登录信息重定向到登陆页
* 初次进入时, 若Storage中存在登录信息, Service中没有. 则将Storage中数据缓存到Service中
* 根据角色动态路由注册(暂未开发)

