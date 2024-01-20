// createBooking
import db from '../models/index'
import { Op } from 'sequelize';
var cron = require('node-cron');
const moment = require('moment');

const ktHuyBooking = async() =>{
    try {
        const now = moment();
        let users =  await db.Booking.findAll({
            where:{ stt: 0
            },
            order:[['id','ASC']]
        });
        if(users){
            for (let i = 0; i < users.length; i++) {
                const updated_at = moment(users[i].createdAt).format('YYYY-MM-DD HH:mm:ss');
                // console.log(created_at.clone().add(30, 'minutes'));
                const abc =moment(updated_at).add(30, 'minutes');
                if(abc.isBefore(now)) {
                        await users[i].update({
                            stt:3
                        })
                        console.log('đã  đổi đơn đặt chỗ có id: ', users[i].id );
                // const formattedDateTime = users[i].createdAt.format('YYYY-MM-DD HH:mm:ss');
                // moment(users[i].createdAt).format('YYYY-MM-DD HH:mm:ss');
                // console.log(moment(users[i].createdAt).format('YYYY-MM-DD HH:mm:ss'));
                }else{
                    console.log(now);
                }
                // console.log(abc);
                // console.log(now);
            }
        } 
    } catch (error) {
        console.log(error);
    }
}
cron.schedule('30 * * * * *', async () => {
    await ktHuyBooking();
})


const createBooking = async(data)=>{
    try {
        let abc = Math.round(Math.random() * 100000);
        let stt = 0;
        let parking = await db.Parking.findOne({
            where: { id: data.parkingid}
        })
        let user = await db.User.findOne({
            where: { id: data.userid}
        })
        if(parking && user){
            if(parking.soluong === 0)
            {
                return{
                EM: 'Bãi đỗ đã hết chỗ',
                EC: 2,
                DT: '',
            }
            } else{
                await db.Booking.create({...data,bookingcode: abc , stt: stt});
                await parking.update({
                    soluong: parking.soluong -1
                })
                return {
                    EM: 'Đặt chỗ thành công',
                    EC: 0,
                    DT: [],
                }
            }
        }else{
            return{
                EM: 'ko tìm thấy User hoặc parking này',
                EC: 2,
                DT: '',
            }
        }
    } catch (error) {
        console.log(data);
        return{
            EM: 'err from service ne',
            EC: 1,
            DT: []
        }
    }
}


const getBookingWithPagination = async(page,limit) =>{
    try {
        let offset = (page - 1) * limit;
        const {count, rows}= await db.Booking.findAndCountAll({
            offset: offset,
            limit: limit,
            where:{ stt: {[Op.lte]: 1} },
            order:[['id','ASC']]
        })


        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return {
            EM: 'FETCH OK',
            EC: 0,
            DT: data,
        }

    } catch (e) {
            return{
                EM: 'loi o service',
                EC: 1,
                DT: []
            }
    }
}

const getAllBooking = async() =>{
    try {
        let users =  await db.Booking.findAll({
            where:{ stt: {[Op.lte]: 1} },
        });
        if(users){
            return{
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: users
            }
        }else{
            return{
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: []
            }
        }


    } catch (error) {
            return{
                EM: 'loi o service',
                EC: 1,
                DT: []
            }
    }
}




const getBookingHistory = async(page,limit, userid) =>{
    try {
        let offset = (page - 1) * limit;
        const {count, rows}= await db.Booking.findAndCountAll({
            offset: offset,
            limit: limit,
            where:{ userid: userid,
                stt: {[Op.gte]: 2}
            },
            order:[['id','ASC']]
        })

        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return {
            EM: 'FETCH OK',
            EC: 0,
            DT: data,
        }

    } catch (e) {
            return{
                EM: 'loi o service',
                EC: 1,
                DT: []
            }
    }
}

const getAllBookingHistory = async(userid) =>{
    try {
        let users =  await db.Booking.findAll({
            where:{ userid: userid,
                stt: {[Op.gte]: 2}},
            order:[['id','ASC']]
        });
        if(users){
            return{
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: users
            }
        }else{
            return{
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: []
            }
        }


    } catch (error) {
            return{
                EM: 'loi o service',
                EC: 1,
                DT: []
            }
    }
}

const deleteBooking = async(id) =>{
    try {
        let user= await db.Booking.findOne({
            where: { id: id}
        })
        if(user){
            await user.destroy();
            return{
                EM: 'delete success',
                EC: 0,
                DT: []
            }
        }else {
            return{
                EM: 'ko ton tai user nay ',
                EC: 2,
                DT: []
            }
        }
        
    } catch (e) {
        return {
            EM: 'err from service',
            EC: 1,
            DT: []
        }
    }
}

const getBookingCard = async(page,limit, userid) =>{
    try {
        let offset = (page - 1) * limit;
        const {count, rows}= await db.Booking.findAndCountAll({
            offset: offset,
            limit: limit,
            where:{ userid: userid,
                stt: {[Op.lte]: 1}
            },
            include: {model: db.Parking},
            order:[['id','ASC']]
        })

        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return {
            EM: 'FETCH OK',
            EC: 0,
            DT: data,
        }

    } catch (e) {
            return{
                EM: 'loi o service',
                EC: 1,
                DT: []
            }
    }
}

const getAllBookingCard = async(userid) =>{
    try {
        let users =  await db.Booking.findAll({
            where:{ userid: userid,
                stt: {[Op.lte]: 1}},
            include: {model: db.Parking},
            order:[['id','ASC']]
        });
        if(users){
            return{
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: users,
            }
            
        }else{
            return{
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: []
            }
        }


    } catch (error) {
            return{
                EM: 'loi o service',
                EC: 1,
                DT: []
            }
    }
}

const ownerGetBooking = async(page,limit, parkingid) =>{
    try {
        let offset = (page - 1) * limit;
        const {count, rows}= await db.Booking.findAndCountAll({
            offset: offset,
            limit: limit,
            where:{ parkingid: parkingid,
                stt: {[Op.lte]: 1}
            },
            include: {model: db.User},
            order:[['id','ASC']]
        })

        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return {
            EM: 'FETCH OK',
            EC: 0,
            DT: data,
        }

    } catch (e) {
            return{
                EM: 'loi o service',
                EC: 1,
                DT: []
            }
    }
}

const ownerGetAllBooking = async(parkingid) =>{
    try {
        let users =  await db.Booking.findAll({
            where:{ parkingid: parkingid,
                stt: {[Op.lte]: 1}
            },
            include: {model: db.User},
            order:[['id','ASC']]
        });
        if(users){
            return{
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: users,
            }
            
        }else{
            return{
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: []
            }
        }


    } catch (error) {
            return{
                EM: 'loi o service',
                EC: 1,
                DT: []
            }
    }
}

const updateConfirmFunc = async(data) =>{
    try {
        let booking = await db.Booking.findOne({
            where: { id: data.id}
        })
        if(booking){
            await booking.update({
                stt:1
            })
            return{
                EM: 'Đã nhận xe vào bãi',
                EC: 0,
                DT: '',
            }
        }else{
            return{
                EM: 'not found!',
                EC: 2,
                DT: '',
            }
        }


    } catch (e) {
            return{
                EM: 'lỗi ở booking service',
                EC: 1,
                DT: [],
            }
    }
}
const updateKhachNhanXe = async(data) =>{
    try {
        let booking = await db.Booking.findOne({
            where: { id: data.id}
        })
        // const now = moment();
        // khoangtg = 
        // let tongtien =  
        let parking = await db.Parking.findOne({
            where: { id: data.parkingid}
        })
        if(booking && parking){
            await booking.update({
                stt:2,
                tongtien: data.tong
            })
            await parking.update({
                soluong: parking.soluong + 1,
            })
            return{
                EM: 'Đơn đặt chỗ đã hoàn thành',
                EC: 0,
                DT: '',
            }
        }else{
            return{
                EM: 'not found!',
                EC: 2,
                DT: '',
            }
        }


    } catch (e) {
            return{
                EM: 'lỗi ở booking service',
                EC: 1,
                DT: [],
            }
    }
}


// const updateTongtien = async(data) =>{
//     try {
//         let booking = await db.Booking.findOne({
//             where: { id: data.id}
//         })
//         let parking = await db.Parking.findOne({
//             where: { id: data.parkingid}
//         })
//         if(booking && parking){
//             await booking.update({
//                 tongtien: data.tongtien
//             })
//             await parking.update({
//                 soluong: parking.soluong + 1,
//             })
//             return{
//                 EM: 'Đơn đặt chỗ đã hoàn thành',
//                 EC: 0,
//                 DT: '',
//             }
//         }else{
//             return{
//                 EM: 'not found!',
//                 EC: 2,
//                 DT: '',
//             }
//         }


//     } catch (e) {
//             return{
//                 EM: 'lỗi ở booking service',
//                 EC: 1,
//                 DT: [],
//             }
//     }
// }

module.exports = {
    createBooking, getBookingWithPagination,getAllBooking,deleteBooking,getAllBookingHistory,getBookingHistory , 
    getBookingCard, getAllBookingCard, ownerGetBooking, ownerGetAllBooking, updateConfirmFunc, updateKhachNhanXe, 
    // updateTongtien
}