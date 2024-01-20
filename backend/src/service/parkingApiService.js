import db from '../models/index'
import { Op } from 'sequelize';

const createNewParking = async(data)=>{
    try {
        await db.Parking.create(data);
        return {
            EM: 'Đợi admin xác thực thông tin ...',
            EC: 0,
            DT: [],
        }
    } catch (error) {
        return{
            EM: 'err from service',
            EC: 1,
            DT: []
        }
    }
}
const getAllParking = async() =>{
    try {
        let parkings =  await db.Parking.findAll({
            where: {status: 1},
            include: {model: db.User, attributes: ["username","email","phone","id"]}
        });
        if(parkings){
            return{
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: parkings
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

const getParkingConfirm = async() =>{
    try {
        let parkings =  await db.Parking.findAll({
            where: {status: 2},
            // attributes: ["id", "name", "address", "price", "mota", "status","soluong","tc","userid","luo"],
            include: {model: db.User, attributes: ["username","email","phone","id"]}
        });
        if(parkings){
            return{
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: parkings
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

const readDsHienThiService = async() =>{
    try {
            let dsbaixe =  await db.Parking.findAll({
                where: {status: 2, tc: 2, 
                    soluong: {[Op.gte]: 1}
                },
                attributes: ["id", "name", "address", "price", "mota", "status","soluong","tc","lat","lng","luotxem"],
                include: {model: db.User , attributes: ["id", "phone", "username", "email" ,"bsx"]}
            });
            if(dsbaixe){
                return{
                    EM: 'GET DATA SUCCESS',
                    EC: 0,
                    DT: dsbaixe,
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

const updateParkingConfirm = async(data) =>{
    try {
        let parking = await db.Parking.findOne({
            where: { id: data.id}
        })
        let abc = await db.User.findOne({
            where: { id: data.userid}
        })
        if(abc && parking){
            await parking.update({
                status: 2,
                tc: 2,
                luotxem: 0,
                onoff: 1,
            })
            await abc.update({
                roleid: 3,  
            })
            return{
                EM: 'Đã xác thực bãi xe',
                EC: 0,
                DT: '',
            }
        }else{
            return{
                EM: 'ko tìm thấy bãi đỗ',
                EC: 2,
                DT: '',
            }
        }


    } catch (e) {
            return{
                EM: 'lỗi ở parking service',
                EC: 1,
                DT: [],
            }
    }
}

const updateParkingLuotXem = async(data) =>{
    try {
        let parking = await db.Parking.findOne({
            where: { id: data.id}
        })
        // let abc = await db.Parking.update({
        //     where: { id: data.id}
        // })
        if(parking){
            await parking.update({
                luotxem: parking.luotxem + 1,
            })
            return{
                EM: 'Đã xác thực bãi xe',
                EC: 0,
                DT: '',
            }
        }else{
            return{
                EM: 'ko tìm thấy bãi đỗ',
                EC: 2,
                DT: '',
            }
        }
    } catch (e) {
            return{
                EM: 'lỗi ở parking service',
                EC: 1,
                DT: [],
            }
    }
}


const updateTC = async(data) =>{
    try {
        let parking = await db.Parking.findOne({
            where: { id: data.id}
        })

        if(parking){
            await parking.update({
                status: 3,
            })
            return{
                EM: 'KQ: Bãi đỗ ko đạt điều kiện',
                EC: 0,
                DT: '',
            }


        }else{
            return{
                EM: 'ko tìm thấy bãi đỗ',
                EC: 2,
                DT: '',
            }
        }


    } catch (e) {
            return{
                EM: 'lỗi ở parking service',
                EC: 1,
                DT: [],
            }
    }
}
const updateOn = async(data) =>{
    try {
        let parking = await db.Parking.findOne({
            where: { id: data.id}
        })

        if(parking){
            await parking.update({
                tc: 1,
            })
            return{
                EM: 'Đã đóng bãi đỗ',
                EC: 0,
                DT: '',
            }


        }else{
            return{
                EM: 'ko tìm thấy bãi đỗ',
                EC: 2,
                DT: '',
            }
        }


    } catch (e) {
            return{
                EM: 'lỗi ở parking service',
                EC: 1,
                DT: [],
            }
    }
}
const updateOff = async(data) =>{
    try {
        let parking = await db.Parking.findOne({
            where: { id: data.id}
        })

        if(parking){
            await parking.update({
                tc: 2,
            })
            return{
                EM: 'Đã mở bãi đỗ',
                EC: 0,
                DT: '',
            }


        }else{
            return{
                EM: 'ko tìm thấy bãi đỗ',
                EC: 2,
                DT: '',
            }
        }


    } catch (e) {
            return{
                EM: 'lỗi ở parking service',
                EC: 1,
                DT: [],
            }
    }
}

const getProfile = async(id) =>{
    try {
        let users =  await db.Parking.findOne({
            where: {id: id}
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

module.exports = {
    createNewParking, getAllParking, getParkingConfirm, updateParkingConfirm,updateTC,updateOn,updateOff, readDsHienThiService, updateParkingLuotXem, getProfile
    // getAllUse,deleteUser,updateUser,createUser,
}