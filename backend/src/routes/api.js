import express from "express"
import apiController  from "../controller/apiController"
import userController from "../controller/userController"
import roleController from "../controller/roleController"
import { checkUserJWT, checkUserPermission} from '../middleware/JWTAction'
import groupController from "../controller/groupController"
import parkingController from "../controller/parkingController"
import bookingController from "../controller/bookingController"
import momoController from "../controller/momoController"


const router=express.Router();

/**
 * 
 * @param {*} app: express app
 */



const initApiRoutes=(app)=>{
    router.all("*", checkUserJWT, checkUserPermission);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);
    
    router.get("/account",userController.getUserAccount);

    router.get("/user/read", userController.readFunc);
    router.get("/user/getProfile", userController.getProfile);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    router.get("/role/read", roleController.readFunc);

    //group routes
    router.get("/group/read", groupController.readFunc);
    router.post("/group/create", groupController.createFunc);
    router.put("/group/update", groupController.updateFunc);
    router.delete("/group/delete", groupController.deleteFunc);

    //bai do routes

    router.get("/parking/read", parkingController.readFunc);
    router.get("/parking/readConfirm", parkingController.readConfirm);
    router.get("/parking/readDsHienThi", parkingController.readDsHienThi);
    router.post("/parking/create", parkingController.createFunc);
    router.put("/parking/updateConfirm", parkingController.updateConfirmFunc);
    router.put("/parking/updateLuotXem", parkingController.updateLuotXem);
    router.put("/parking/updateUnConfirm", parkingController.updateTC);
    router.put("/parking/updateOn", parkingController.updateOn);
    router.put("/parking/updateOff", parkingController.updateOff);
    router.get("/parking/getProfile", parkingController.getProfile);
    // router.delete("/parking/delete", parkingController.deleteFunc);

    
    
    //booking
    router.post("/booking/create", bookingController.createFunc);
    router.put("/booking/updateConfirm", bookingController.updateConfirmFunc);
    router.put("/booking/updateKhachNhanXe", bookingController.updateKhachNhanXe);
    
    router.get("/booking/adminGetDSBooking", bookingController.readFunc);
    router.get("/booking/getBookingHistory", bookingController.getBookingHistory);
    router.get("/booking/getBookingCard", bookingController.getBookingCard);
    router.get("/booking/ownerGetBooking", bookingController.ownerGetBooking);
    router.delete("/booking/delete", bookingController.deleteFunc);
    // router.put("/booking/updateTongtien", bookingController.updateTongtien);

    //pay-api
    router.post('/momo-payment', momoController.handleRequestMoMo);

    return app.use("/api/v1/",router);
}

export default initApiRoutes