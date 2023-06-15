## 文件结构

```
nestjs-demo
|- RESTClient 接口测试文件，搭配 VSCode 的 Rest Client 插件使用
|- src
  |- core 配置等文件
  |- model 数据类型等文件
  |- modules 模块，包含各个模块自己的控制器、服务和其他相关组件
    |- test 第一个 demo，命名为 test
  |- test 测试文件，目前没用
```

其他文件

- `tips.md` 一些笔记记录

---

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

Nest is [MIT licensed](LICENSE).
