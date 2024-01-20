import React,{memo, useContext} from 'react';
import {UserContext} from '../../../context/UserContext'
import {NavLink, useHistory} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import {logoutUser} from '../../../services/userService'
import {toast} from 'react-toastify'
import './Nav.scss'

function AdminSidebar(props) {
    

    const history = useHistory();
    const {logoutContext}= useContext(UserContext);
    const handleLogout = async() =>{
        let data = await logoutUser();
        localStorage.removeItem('jwt');
        logoutContext();

        if(data && +data.EC ===0){
            toast.success('log out thanh cong');
            history.push('/login');
        }else{
            toast.error(data.EM);
        }
    }
    return (
    <div className='nav-header'>
        <div className='bg-color'>
        <div className='p-3 content-body'>
                <Container>
                    <div className='col-12'>
                    <Navbar.Brand>
                        <NavLink to="/admin/users" className='sidebar'><span className='brand-name'></span>ADMIN PAGE</NavLink>
                    </Navbar.Brand>  
                    
                    </div>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    
                        <NavLink to="/admin/users" exact className='nav-link'>
                            <i className="fa fa-user" aria-hidden="true"> </i> Quản lí người dùng
                        </NavLink>
                        <NavLink to="/admin/booking" className='nav-link'>
                            <i className="fa fa-check-square-o" aria-hidden="true"></i> Quản lý phiếu gửi</NavLink>
                        <NavLink to="/admin/parkings" className='nav-link'>
                            <i className="fa fa-product-hunt" aria-hidden="true"></i> Quản lí bãi đỗ 
                        </NavLink>
                        <NavLink to="/admin/users" className='nav-link'>
                            <i className="fa fa-area-chart" aria-hidden="true"></i> Thống kê</NavLink>
                        
                        <hr/>
                        <div className='mt-5'>                        
                            <span className='logout' onClick={()=> handleLogout()}> 
                                <i className="fa fa-sign-out" aria-hidden="true"></i>  LOG OUT
                                 
                            </span>
                        </div>

                </Container>
        </div>
                   
        </div>
    </div>
    );
}

export default memo(AdminSidebar);