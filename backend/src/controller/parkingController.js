// import userApiService from '../service/userApiService'
import parkingApiService from '../service/parkingApiService'

const readFunc = async(req,res) =>{
    try {
            let data = await parkingApiService.getAllParking();
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

const createFunc = async (req,res) =>{
    try {
        let data = await parkingApiService.createNewParking(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        return res.status(400).json({
                EM: 'lỗi ở controller',
                EC: '-1',
                DT: '',
        })
    }
}

const readConfirm = async (req,res) =>{
    try {
            let data = await parkingApiService.getParkingConfirm();
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

const readDsHienThi = async (req,res) =>{
    try {
            let data = await parkingApiService.readDsHienThiService();
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


const updateConfirmFunc = async (req,res) =>{
    try {
        let data = await parkingApiService.updateParkingConfirm(req.body);
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

const updateLuotXem = async (req,res) =>{
    try {
        let data = await parkingApiService.updateParkingLuotXem(req.body);
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
const updateTC = async (req,res) =>{
    try {
        let data = await parkingApiService.updateTC(req.body);
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
const updateOn = async (req,res) =>{
    try {
        let data = await parkingApiService.updateOn(req.body);
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

const updateOff = async (req,res) =>{
    try {
        let data = await parkingApiService.updateOff(req.body);
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


// const deleteFunc = async(req,res) =>{
//     try {
//         let data = await userApiService.deleteUser(req.body.id);
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

const getProfile = async (req,res) =>{
    try {
       if(req.query.id){
            let id = req.query.id;
            let data= await parkingApiService.getProfile(id);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            })
        }
    }catch (e) {
        return res.status(500).json({
                EM: 'err from server',
                EC:'-1',
                DT:'',
        })
    }
}


const updateMo = async (req,res) =>{
    try {
        let data = await parkingApiService.updateMo(req.body);
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

const updateDong = async (req,res) =>{
    try {
        let data = await parkingApiService.updateDong(req.body);
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
module.exports = {
     createFunc, readFunc, readConfirm, updateConfirmFunc,updateTC,updateOn,updateOff,readDsHienThi, updateLuotXem,getProfile, updateDong,updateMo
}