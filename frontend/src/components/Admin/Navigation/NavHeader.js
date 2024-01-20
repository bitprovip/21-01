import React, {  useContext} from 'react';
import './Nav.scss'
import {NavLink, Link, useHistory} from 'react-router-dom';
import {UserContext} from '../../../context/UserContext'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropDown from 'react-bootstrap/NavDropdown'

import {logoutUser} from '../../../services/userService'
import {toast} from 'react-toastify'

const NavHeader=(props) =>{
    const {user, logoutContext}= useContext(UserContext);
    // const location = useLocation();
    const history = useHistory();
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

    // if( (user && user.isAuthenticated === true) || location.pathname === '/'){
        return(
            <>
                <div className='nav-header'>
                    <Navbar bg='header' expand='lg'>
                        <Container>
                            <Navbar.Brand>
                                <NavLink to="/" className='navbar-brand'><span className='brand-name'></span>TT-PARKING</NavLink>
                            </Navbar.Brand>

                            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                            
                            <Navbar.Collapse id='basic-navbar-nav'>
                                
                                {/* link */}
                                <Nav className='me-auto'>
                                    <NavLink to="/admin/users" className='nav-link'></NavLink>
                                </Nav>

                                <Nav>
                                    {(user && user.isAuthenticated ===true )
                                    ?
                                    <>
                                    <Nav.Item className='nav-link'>
                                        Hi! {user.account.username}
                                    </Nav.Item>

                                    <NavDropDown title='Settings' id='basic-nav-dropdown'>
                                        <NavDropDown.Item href="/user/info">Quản lý tài khoản</NavDropDown.Item>
                                        <NavDropDown.Divider/>

                                        

                                        <NavDropDown.Item href="/user/history"> lịch sử tra cứu </NavDropDown.Item>
                                        <NavDropDown.Divider/>

                                        <NavDropDown.Item className='nav-link-c'>
                                            <span onClick={()=> handleLogout()}> LOG OUT</span>
                                        </NavDropDown.Item>
                                    </NavDropDown>

                                    
                                    </>
                                    :
                                    <Link className='nav-link' to='/login'>
                                        login
                                    </Link>
                             
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        );
    // }
    // else {
    //     return <></>
    // }
}

export default NavHeader;