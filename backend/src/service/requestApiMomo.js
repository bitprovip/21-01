const axios = require('axios');
const CryptoJS = require('crypto-js');
require('dotenv').config();
import db from '../models/index'

// Hàm để tạo chữ ký HMACSHA256
function createSignature(accessKey, amount, extraData, notifyUrl, orderId, orderInfo, partnerCode, redirectUrl, requestId, requestType, secretKey) {
    const dataString = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${notifyUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const hash = CryptoJS.HmacSHA256(dataString, secretKey);
    return CryptoJS.enc.Hex.stringify(hash);
}

// Hàm để thực hiện yêu cầu API
async function executeApiRequest(dulieu) {
    try {
        const endpoint = 'https://test-payment.momo.vn/v2/gateway/api/create';
        const date = Date.now();
        const partnerCode = "MOMOBKUN20180529";
        const accessKey = "klm05TvNBzhg7h7j";
        const secretKey = "at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa";
        const requestId = date+'.'+ dulieu.id+'.'+dulieu.parkingid; //thêm cái id của booking vô đây ex: data.id
        const orderId = date + ':0123456778';
        const autoCapture = true;
        const requestType = 'captureWallet';
        const notifyUrl = 'https://1a91-183-80-28-79.ngrok-free.app/api/v1/webhook';
        const redirectUrl = 'http://localhost:3000/owner/booking';
        const amount = dulieu.gia;
        const orderInfo = 'Thanh toán qua ví MoMo';
        const extraData = '';
        const signature = createSignature(accessKey, amount, extraData, notifyUrl, orderId, orderInfo, partnerCode, redirectUrl, requestId, requestType, secretKey);
        const data = {
            partnerCode: partnerCode,
            partnerName: 'Test',
            storeId: partnerCode,
            requestType: requestType,
            ipnUrl: notifyUrl,
            redirectUrl: redirectUrl,
            orderId: orderId,
            amount: amount,
            lang: 'vi',
            autoCapture: autoCapture,
            orderInfo: orderInfo,
            requestId: requestId,
            extraData: extraData,
            signature: signature
        };
        const response = await axios.post(endpoint, data);
        // if(response.data.resultCode === 0 ){ 
        //     let trave = await queryTransaction(response.data.requestId, response.data.orderId)
        //     console.log('>>>>>',trave);
        //     // console.log(response);
        // }

        return{
            EM: 'Đợi admin xác thực thông tin ...',
            EC: 0,
            DT: response.data
        }
        
    } catch (error) {
        console.error(error);
    }
}

async function saveTransactionLogsToDB (response){
    //xử lý chuỗi response
    try {
        var responseData = response;
        // console.log(responseData);
        await db.Transaction_logs.create({
            orderId: responseData.orderId,
            requestId: responseData.requestId,
            amount: responseData.amount,
            responseTime: responseData.responseTime,
            
            transId: responseData.transId,
            message: responseData.message,
            resultCode:responseData.resultCode,
            lastUpdated: responseData.lastUpdated,
        });
        // console.log(response);
        return {
            EM: 'Đợi admin xác thực thông tin ...',
            EC: 0,
            DT: responseData, 
        }
    } catch (error) {
        console.log(error);
    }
    
}

 const queryTransaction = async (requestId, orderId) => {
  // Construct the signature string
  var accessKey = "klm05TvNBzhg7h7j";
  var secretKey = "at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa";
  var partnerCode = "MOMOBKUN20180529";
  const signatureString = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${requestId}`;

  // Generate HMAC-SHA256 signature using CryptoJS
  const hash = CryptoJS.HmacSHA256(signatureString, secretKey);
  const signature = CryptoJS.enc.Hex.stringify(hash);

  // Prepare the data object
  let data = JSON.stringify({
    "partnerCode": partnerCode,
    "requestId": requestId,
    "orderId": orderId,
    "lang": "vi",
    // Use the generated signature
    "signature": signature,
  });

  try {
    // Prepare the Axios request configuration
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://test-payment.momo.vn/v2/gateway/api/query',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    // Make the Axios request
    const response = await axios.request(config);

    // Extract the data from the response
    let responseData = response.data;

    return {
      EM: 'Đợi admin xác thực thông tin ...',
      EC: 0,
      DT: responseData,
    };
  } catch (error) {
    console.error(error);

    // Handle the error and return an appropriate response
    return {
      EM: 'Đã xảy ra lỗi trong quá trình xử lý.',
      EC: 1, // You may use a different error code based on your requirements
      DT: null,
    };
  }
};


module.exports = {
    executeApiRequest:executeApiRequest,queryTransaction,saveTransactionLogsToDB
}
