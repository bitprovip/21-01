import axios from "../setup/axios";
const registerNewParking=(name,address, price, soluong, userid, status,lng,lat)=>{
    return axios.post('/api/v1/parking/create',{
        name,address,price,soluong, userid, status,lat,lng
    })
}
const fetchAllParking = ()=>{
    return axios.get(`/api/v1/parking/read`)
}

const fetchParkingConfirm = ()=>{
    return axios.get(`/api/v1/parking/readConfirm`)
}
const updateConfirmParking = (parkingData) =>{
    return axios.put("/api/v1/parking/updateConfirm",{...parkingData})
}
const updateUnConfirmParking = (parkingData) =>{
    return axios.put("/api/v1/parking/updateUnConfirm",{...parkingData})
}
const updateOn = (parkingData) =>{
    return axios.put("/api/v1/parking/updateOn",{...parkingData})
}
const updateOff = (parkingData) =>{
    return axios.put("/api/v1/parking/updateOff",{...parkingData})
}
const readDsHienThi = (parkingData) =>{
    return axios.get(`/api/v1/parking/readDsHienThi`)
}

const updateLuotXem = (parkingData) =>{
    return axios.put("api/v1/parking/updateLuotXem",{...parkingData})
}

const getProfile = (id)=>{
    return axios.get(`/api/v1/parking/getProfile?id=${id}`)
}

export {registerNewParking, fetchAllParking, fetchParkingConfirm, updateConfirmParking, updateUnConfirmParking,updateOn,updateOff,readDsHienThi, updateLuotXem, getProfile};