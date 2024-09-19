## Express.js setup steps

1. 初始化项目

    项目文件夹下创建后端项目目录backend并初始化 `package.json`：

    ```bash
    npm init -y
    ```

2. 安装 Express 和 MongoDB 驱动

    后端项目目录backend下进入终端，执行

    ```bash
    npm install express mongoose cors
    ```

    **express**: 用于创建服务器。

    **mongoose**: MongoDB 的对象数据模型（ODM），方便与数据库交互。

    **cors**: 处理跨域问题，允许前端与后端通信。

3. 创建 Express 应用

    创建 `server.js` 文件，设置基本的 Express 服务器：

    ```js
    
    import express from 'express'
    import mongoose from 'mongoose'
    import cors from 'cors'
    
    const app = express();
    // 中间件
    app.use(cors());
    app.use(express.json());
    
    // 连接 MongoDB 数据库
    mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => console.log(err));
    
    // 定义 Schema 和 Model
    const messageSchema = new mongoose.Schema({
      text: String
    });
    const Message = mongoose.model('Message', messageSchema);
    
    // 路由 - 获取存储的消息
    app.get('/api/message', async (req, res) => {
      const messages = await Message.find(); // 获取所有消息
      res.json(messages);
    });
    
    // 路由 - 存储新消息
    app.post('/api/message', async (req, res) => {
      const { text } = req.body;
      const newMessage = new Message({ text });
      await newMessage.save(); // 保存新消息到数据库
      res.json(newMessage); // 返回存储的消息
    });
    
    // 启动服务器
    app.listen(5001, () => {
      console.log('Server running on http://localhost:5001');
    });
    
    ```

4. 向 MongoDB 插入 "hello node" 数据

    确保已安装MongoDB服务器：https://www.mongodb.com/zh-cn/docs/manual/tutorial/install-mongodb-on-os-x/

    使用 MongoDB Compass 图形工具或者在 Mongo Shell 中插入数据：

    ```bash
    use mydb
    db.messages.insert({ text: "hello node" })
    ```

5. 启动服务器

    1. 先连接MongoDB数据库

    2. 启动后端服务器

        ```bash
        node server.js
        ```

        
