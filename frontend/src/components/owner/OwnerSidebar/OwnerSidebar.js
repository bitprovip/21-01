import React,{memo, useContext} from 'react';
import {UserContext} from '../../../context/UserContext'
import {NavLink, useHistory} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import {logoutUser} from '../../../services/userService'
import {toast} from 'react-toastify'
import './Nav.scss'

function OwnerSidebar(props) {
    

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
                        <NavLink to="/owner/info" className='sidebar'><span className='brand-name'></span>TRANG QUẢN LÝ BÃI XE</NavLink>
                    </Navbar.Brand>  
                    
                    </div>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    
                        <NavLink to="/owner/info" exact className='nav-link'>
                            <i className="fa fa-user" aria-hidden="true"> </i> Thông tin bãi xe
                        </NavLink>
                        
                        <NavLink to="/owner/booking" className='nav-link'>
                            <i className="fa fa-car" aria-hidden="true"></i> Đơn đặt chỗ
                        </NavLink>
                        <NavLink to="/owner/info" className='nav-link'>
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Doanh thu</NavLink>
                        <NavLink to="/owner/info" className='nav-link'>
                            <i className="fa fa-money" aria-hidden="true"></i> Thống kê</NavLink>
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

export default memo(OwnerSidebar);