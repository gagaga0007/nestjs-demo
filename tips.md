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

`nest g module <name>`

### 创建 controller

`nest g controller <name>`

### 创建 service

`nest g service <name>`

> 如果不需要生成测试文件，在语句后增加 --no-spec

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

# 例子

见 `/src/test` 下代码。
