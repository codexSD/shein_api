// import express ,{Express,Request,Response} from 'express';
import dotenv from 'dotenv';
import { PhoneNumber } from './src/common/phone';
import service from './src/service';

dotenv.config();
const port = process.env.PORT;

service.express.listen(port, () => {
  console.log(`⚡️Server is running at localhost:${port}🥵⚡💡`);
});

// const app:Express = express();
// app.get('/', (req:Request,res:Response)=>{
//     PhoneNumber.of(249,921125426);
//     res.send('Shein store : in development :) 🥵⚡💡');
// });
// app.listen(
//     port,
//     ()=>{
//         console.log(`⚡️Server is running at localhost:${port}🥵⚡💡`);
//     }
// );
