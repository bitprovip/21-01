import db from '../models/index'


const getDoanhThu = async(parkingid) =>{
    try {
        let parking =  await db.Parking.findAll({
            where:{ id: parkingid},
            // include: {model: db.Parking},
            order:[['id','ASC']]
        });
        if(parking){
            return{
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: parking,
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
    getDoanhThu
}