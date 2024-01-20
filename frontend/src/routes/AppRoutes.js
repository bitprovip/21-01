import { Switch, Route } from "react-router-dom";
import Login from "../components/public/Login/Login";
import About from "../components/public/About/About";
import Register from "../components/public/Register/Register";
import Users from "../components/Admin/ManageUsers/Users";
import PrivateRoutes from "./PrivateRoutes";
import Role from '../components/Admin/Role/Role'
import Parkings from "../components/Admin/ManageParkings/Parkings";
import QLBooking from "../components/Admin/QLBooking/QLBooking";
import HomePage from "../components/public/HomePage/HomePage";
import UserParking from "../components/User/UserParking/UserParking";
import RegParking from '../components/User/RegPaking/RegPaking'
import ConfirmDK from "../components/Admin/ConfirmDK/ConfirmDK";

import ManageInfo from "../components/owner/ManageInfo/ManageInfo";
import QLDonDatCho from "../components/owner/QLDonDatCho/QLDonDatCho";

import ManageInfoUser from "../components/User/ManageInfo/ManageInfo";
import ManageBooking from "../components/User/ManageBooking/ManageBooking";
import BookingHistory from "../components/User/BookingHistory/BookingHistory";
import Chekout from "../components/User/checkout/Chekout";


// import ABC from "../components/Map/ABC";

const AppRoutes = (props) =>{
    return(
    <>
        <Switch>

            {/* admin route */}
            <PrivateRoutes path="/admin/users" component= {Users} />
            <PrivateRoutes path="/admin/parkings" component= {Parkings} />
            <PrivateRoutes path="/admin/roles" component= {Role} />
            <PrivateRoutes path="/admin/confirmparking" component= {ConfirmDK} />
            <PrivateRoutes path="/admin/booking" component= {QLBooking} />
            

            {/* user route */}
            <PrivateRoutes path="/parking" component= {UserParking} />
            <PrivateRoutes path="/dkbaixe" component= {RegParking} />


            <PrivateRoutes path="/user/info" component= {ManageInfoUser}/>
            <PrivateRoutes path="/user/thongke" component= {RegParking}/>
            <PrivateRoutes path="/user/booking" component= {ManageBooking}/>
            <PrivateRoutes path="/user/history" component= {BookingHistory}/>

            {/* ownner route */}
            <PrivateRoutes path="/owner/info" component= {ManageInfo}/>
            <PrivateRoutes path="/owner/thongke" component= {RegParking}/>
            <PrivateRoutes path="/owner/booking" component= {QLDonDatCho}/>

            <PrivateRoutes path="/checkout" component= {Chekout} />

            {/* <PrivateRoutes path="/abc" component= {Role} />          */}

            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/" exact>
                <HomePage/>
            </Route>
            <Route path="/about" exact>
                <About />
            </Route>
            <Route path="*">
                <HomePage />
            </Route>
        </Switch>
    </>
    )
}

export default AppRoutes;
