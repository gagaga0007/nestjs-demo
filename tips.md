# 调试

## 开发模式启动

`yarn start:dev`

## 接口调试

### 使用 postman 或 apiFox 等工具

### 使用 vsCode 插件 —— Rest Client

新建 RESTClient 文件夹，添加 demo.http 文件，输入语句直接执行插件。

_例子：_

- GET

```
GET http://localhost:3000/test
```

- POST

```
POST http://localhost:3000/test/addTest
Content-Type: application/json

{
	"id": 4,
	"name": "test4",
}

```

---

# 命令

## 创建文件

### 创建 module

`nest g module \<name\>`

### 创建 controller

`nest g controller \<name\>`

### 创建 service

`nest g service \<name\>`

> 如果不需要生成测试文件，在语句后增加 --no-spec

---

# 全局配置

## 全局配置前缀

在 `main.ts` 中编辑：

```
// ...
app.setGlobalPrefix('xxx')
// ...
```

配置后访问路径则变成了 `.../xxx/...`

# 数据库

需要安装数据库以及 TypeORM 插件（官方推荐）。

> ORM: 对象关系映射，解决了对象和关系型数据库之间的数据交互问题。

## 安装 TypeORM

`npm install --save @nestjs/typeorm typeorm mysql2`

## 引入 TypeORM

在 `app.module.ts` 的 `import` 中引入，详见相关文件代码。

## 调试

- 可以使用 Navicat 等软件。
- 在 VSCode 中使用 Database Client 插件。

# 例子

见 `src/test` 下代码。
