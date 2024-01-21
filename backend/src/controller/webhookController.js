import Sequelize from "sequelize";
import { sequelize } from "../models/index";
import requestApiMomo from '../service/requestApiMomo'
import bookingApiService from '../service/bookingApiService'

let handleWebhookCreate = (req, res) => {
    return new Promise(async (resolve, reject) => {
      try {
        const eventData = req.body;
        // console.log(eventData.resultCode);
        if(eventData.resultCode || eventData.resultCode===0)
        {
          const trave = await requestApiMomo.queryTransaction(eventData.requestId, eventData.orderId);
          console.log('>>>hfdj',trave);
          if(trave.DT.resultCode ===0){
            await requestApiMomo.saveTransactionLogsToDB(trave.DT)
            let data= [];
            let parkingid = trave.DT.requestId.slice(-2);
            let chuoi = trave.DT.requestId;
            let mang = chuoi.split('.');
            let id = mang[1];
            // console.log('id',id);
            let abc = await bookingApiService.updateKhachNhanXe({...data,id,parkingid});
            console.log(abc);
          }
          // console.log(trave.DT.resultCode);
        }

        res.status(204).end();
        resolve();
      }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
        reject(error);

      }
    });
}

module.exports = {
    handleWebhookCreate:handleWebhookCreate
}