import bookingApiService from '../service/bookingApiService'
const createFunc = async (req,res) =>{
    try {
        let data = await bookingApiService.createBooking(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        return res.status(400).json({
                EM: 'lỗi ở controller booking',
                EC: '-1',
                DT: '',
        })
    }
}


const readFunc = async (req,res) =>{
    try {
       if(req.query.page && req.query.limit){
        let page = req.query.page;
        let limit= req.query.limit;
        let data= await bookingApiService.getBookingWithPagination(+page, +limit);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } else {
        let data = await bookingApiService.getAllBooking();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    }
    } catch (e) {
        return res.status(500).json({
                EM: 'err from server',
                EC:'-1',
                DT:'',
        })
    }
}
const getBookingHistory = async (req,res) =>{
    try {
       if(req.query.page && req.query.limit){
        let page = req.query.page;
        let limit= req.query.limit;
        let userid= req.query.userid
        let data= await bookingApiService.getBookingHistory(+page, +limit,userid);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } else {
        let userid= req.query.userid
        let data = await bookingApiService.getAllBookingHistory(userid);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    }
    } catch (e) {
        return res.status(500).json({
                EM: 'err from server',
                EC:'-1',
                DT:'',
        })
    }
}

const deleteFunc = async (req,res) =>{
    try {
        let data = await bookingApiService.deleteBooking(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
            
    } catch (e) {
        return res.status(500).json({
                EM: 'err from server',
                EC: '-1',
                DT:'',
        })
    }
}

const getBookingCard = async (req,res) =>{
    try {
       if(req.query.page && req.query.limit){
        let page = req.query.page;
        let limit= req.query.limit;
        let userid= req.query.userid
        let data= await bookingApiService.getBookingCard(+page, +limit,userid);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } else {
        let userid= req.query.userid
        let data = await bookingApiService.getAllBookingCard(userid);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    }
    } catch (e) {
        return res.status(500).json({
                EM: 'err from server',
                EC:'-1',
                DT:'',
        })
    }
}

const ownerGetBooking = async (req,res) =>{
    try {
       if(req.query.page && req.query.limit){
        let page = req.query.page;
        let limit= req.query.limit;
        let parkingid= req.query.parkingid
        let data= await bookingApiService.ownerGetBooking(+page, +limit,parkingid);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } else {
        let parkingid= req.query.parkingid
        let data = await bookingApiService.ownerGetAllBooking(parkingid);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    }
    } catch (e) {
        return res.status(500).json({
                EM: 'err from server',
                EC:'-1',
                DT:'',
        })
    }
}

const updateConfirmFunc = async (req,res) =>{
    try {
        let data = await bookingApiService.updateConfirmFunc(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        return res.status(500).json({
                EM: 'err from server',
                EC: '-1',
                DT: '',
        })
    }
}

const updateKhachNhanXe = async (req,res) =>{
    try {
        let data = await bookingApiService.updateKhachNhanXe(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        return res.status(500).json({
                EM: 'err from server',
                EC: '-1',
                DT: '',
        })
    }
}

// const updateTongtien = async (req,res) =>{
//     try {
//         let data = await bookingApiService.updateTongtien(req.body);
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT,
//         })
//     } catch (error) {
//         return res.status(500).json({
//                 EM: 'err from server',
//                 EC: '-1',
//                 DT: '',
//         })
//     }
// }
module.exports = {
     createFunc, readFunc, deleteFunc, getBookingHistory, getBookingCard, ownerGetBooking,updateConfirmFunc,updateKhachNhanXe,
    //   updateTongtien
}