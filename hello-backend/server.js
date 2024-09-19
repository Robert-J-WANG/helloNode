
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
