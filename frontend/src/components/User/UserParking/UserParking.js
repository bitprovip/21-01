import React from 'react';
import NavHeader from '../../public/Navigation/NavHeader'
import './User.scss'
import {useHistory} from "react-router-dom"; 
import { useContext,useEffect,useState } from "react";
// import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import {UserContext} from '../../../context/UserContext'
import { toast } from 'react-toastify';
import {getProfile} from "../../../services/userService"


function UserParking(props) {
    let history = useHistory();
    const {user} = useContext(UserContext);

    const [userid, setUserId] = useState(2);
    const [dataUser,setDataUser] = useState([]);

    useEffect(() => {
        fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userid])

    const fetchProfile = async () => {
        let id = user.account.userid
        let response = await getProfile(id);
        if(response && +response.EC === 0 ){
            setUserId(user.account.userid)
            setDataUser(response.DT);
            console.log(dataUser);
            console.log(user.account);
        }
    }

    const handleCreateNewParking = () =>{
        if(user?.account?.roleid !==1){
            history.push("/dkbaixe");
        }else{
            alert('admin không được đăng kí bãi đỗ')
        }
    }
    if(user?.account?.roleid === 3){
        toast.error('Chỉ được đăng kí 1 bãi đỗ!')
        return (
            <div>
                <Redirect to='/'></Redirect>;
            </div>
            
            
        )
    // }else if(dataUser === null && dataUser.roleid !== user.account.roleid ){
    //     toast.error('yêu cầu đăng nhập lại')
    //     return (
    //         <div>
    //             <Redirect to='/'></Redirect>;
    //         </div>
            
            
    //     )
    } else {
        return (
            <div className='bg'>
                <NavHeader />
                <div className='container mt-4'>
                    <div className='row  mb-4'>
                        <div className='col-6'> 
                            <div className='mt-5'>
                                <h1>Bạn có bãi đỗ xe? <br/></h1>
                            </div>  
                            <h5>Bạn muốn trở thành đối tác của chúng tôi?</h5> <hr/>
                            &emsp; - Tăng tỉ lệ tiếp cận <br/>
                            &emsp; - Doanh thu chia tỉ lệ hợp lí <br/>
                            &emsp; - Quản lí chuyên nghiệp <br/>
                            &emsp; - Thao tác đơn giản <br/>
                            <div className='text-center'>
                                <button className='btn btn-success' onClick={()=>handleCreateNewParking()}> Đăng kí ngay</button>
                            </div>
                            
                        </div>
                    <div className='col-6'>
                        <img src="https://c8.alamy.com/comp/G6G7KN/parking-lot-design-park-icon-yellow-background-vector-graphic-G6G7KN.jpg" className="img-fluid" alt="..."></img>
                    </div>
                
                    
                </div>
                <hr/>
                
                </div>
            </div>
        )
    }
    
;}

export default UserParking;