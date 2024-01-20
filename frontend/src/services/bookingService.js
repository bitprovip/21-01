import axios from "../setup/axios";


const createBooking=(thongtindanhap)=>{
    return axios.post('/api/v1/booking/create',{...thongtindanhap})
}
const fetchAllBooking = (page,limit)=>{
    return axios.get(`/api/v1/booking/adminGetDSBooking?page=${page}&limit=${limit}`)
}
const fechHistory = (page,limit,userid)=>{
    return axios.get(`/api/v1/booking/getBookingHistory?page=${page}&limit=${limit}&userid=${userid}`)
}
const deleteBooking = (user)=>{
    return axios.delete("/api/v1/booking/delete", {data: { id: user.id} });
}
const getBookingCard = (page,limit,userid)=>{
    return axios.get(`/api/v1/booking/getBookingCard?page=${page}&limit=${limit}&userid=${userid}`)
}

const ownerGetBooking = (page,limit,parkingid)=>{
    return axios.get(`/api/v1/booking/ownerGetBooking?page=${page}&limit=${limit}&parkingid=${parkingid}`)
}
const updateConfirmBooking = (bookingData) =>{
    return axios.put("/api/v1/booking/updateConfirm",{...bookingData})
}
const updateKhachNhanXe = (bookingData) =>{
    return axios.put("/api/v1/booking/updateKhachNhanXe",{...bookingData})
}
const thanhToanMomo=(data)=>{
    return axios.post('/api/v1/momo-payment',{...data});
}
export {createBooking,fetchAllBooking, deleteBooking, fechHistory, getBookingCard, ownerGetBooking, updateConfirmBooking, updateKhachNhanXe, thanhToanMomo}