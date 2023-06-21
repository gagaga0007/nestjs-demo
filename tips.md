# 调试

## 开发模式启动

`yarn run start:dev`

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

> 如果不需要生成测试文件，在语句后增加 --no-spec

### 创建 module

`nest g module <name>`

### 创建 controller

`nest g controller <name>`

### 创建 service

`nest g service <name>`

### 创建模块

`nest g res <name>`

- 选择 REST API
- 选择 Y

> 该命令会自动创建上述文件

### 创建 middleware（中间件）

`nest g mi <name>`

---

# 配置

## 配置热重载（搭配 webpack）

每次文件修改都会重新编译，如果业务逻辑复杂会影响开发效率，所以引入 webpack 进行热重载。

### 安装依赖包

```
yarn add webpack-node-externals run-script-webpack-plugin webpack
```

### 增加配置文件

在根目录新增 `webpack-hmr.config.js` 配置文件，并在其中增加代码：

```
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: false }),
    ],
  };
};
```

### 修改代码

在 `/src/main.ts` 中添加代码：

```
if (module.hot) {
	module.hot.accept();
	module.hot.dispose(() => app.close());
}
```

### 安装依赖包

配置完上一步后，ts 会报错，安装如下依赖包解决：

```
yarn add -D @types/webpack-env
```

### 修改代码

修改 `package.json` 代码，将

```
"start:dev": "nest start --watch",
```

改成

```
"start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js --watch",
```

热重载配置结束

## 全局配置前缀

在 `/src/main.ts` 中添加代码：

```
app.setGlobalPrefix('xxx')
```

配置后访问路径则变成了 `.../xxx/...`

---

# 数据库

需要安装数据库以及 TypeORM 插件（官方推荐）。

> ORM: 对象关系映射，解决了对象和关系型数据库之间的数据交互问题。

## 安装 TypeORM

`npm install --save @nestjs/typeorm typeorm mysql2`

## 引入 TypeORM

在 `/src/app.module.ts` 的 `import` 中引入，详见相关文件代码。

## 调试

- 可以使用 Navicat 等软件。
- 在 VSCode 中使用 Database Client 插件。

---

# 模块

## 局部模块

> 供局部使用的模块。

- 创建后使用 exports 导出
- 在使用的模块的 module 文件的 providers 中引入
- 在使用的模块的 controller 文件中 constructor 定义

_相关例子见文件 `/src/modules/test2/test2.module.ts`、`/src/modules/test/test.module.ts` 和 `/src/modules/test/test.controller.ts`_

## 全局模块

> 可全局使用的模块。

- 创建后使用 exports 导出
- 在 `/src/app.module.ts` 的 imports 中引入
- 在使用的模块中使用 @Inject 注入

_相关例子见文件 `/src/modules/global/global.module.ts`、`/src/app.module.ts` 和 `/src/modules/test/test.controller.ts`_

## 动态模块

> 根据传入的内容动态生成模块，搭配上述模块使用

_相关例子见 “全局模块” 的例子_

---

# 一些概念

## 中间件 middleware

> 创建自定义中间件：`nest g mi <name>`

用于实现一些资源共享、功能共享的目的。

_局部中间件例子可见 `/src/middleware` 下代码；全局中间件例子可见 `/src/main.ts` 下代码_

> 第三方中间件可以在 `/src/main.ts` 中添加 `app.use(xxx)`

## ORM

> ORM 即 Object Relational Mapping，译为“对象关系映射”，它解决了对象和关系型数据库之间的数据交互问题。

`Object <-> Mapping <-> DB`

ORM 的作用可以理解为：定义一个对象，这个对象对应着一张表，这个对象的一个实例，就对应着表中的一条记录。

ORM 自动完成映射，就不用写 SQL 语句了，只需要通过对象的形式即可操作数据库。

- 常见类型：
  int, tinyint, smallint, mediumint, bigint, float, double, dec, decimal, numeric, date,datetime, timestamp, time, year, char, varchar, nvarchar, text, tinytext, mediumtext, blob, longtext, tinyblob, mediumblob, longblob, enum, json, binary, geometry, point, linestring, polygon, multipoint, multilinestring, multipolygon, geometrycollection

### TypeORM 中的实体（Entities）

TypeORM 是官方推荐的 ORM 工具库。

> ORM 的实体其实就是把数据库映射为对象的那个类，这个类可以模拟数据库表，定义其中的字段。

实体即上面提到的 Object，通过这个 Object 可以自动生成表结构，DB 中的数据也会编程为标准的对象。

_例子可见 `/src/modules/test/entities` 下代码_

## 一对一关系、一对多关系

### 一对一关系

在实体中通过 `@OneToOne` 定义，在 `@JoinColumn` 中可以自定义列名

_例子可见 `/src/modules/test/entities/testDetail.entity.ts` 下代码_

> 不要忘记在 `/src/modules/test/test.module.ts` 的 `imports` 中引入新创建的实例

### 一对多关系

在使用的实体中通过 `@OneToMany` 定义，在被使用的实体中通过 `@ManyToOne` 定义

_例子可见 `/src/modules/test/entities/test.entity.ts` 和 `/src/modules/test3/entities/test3.entity.ts` 下代码_

---

# 例子

见 `/src/modules/test` 下代码。
