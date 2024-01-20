import React from 'react';
import NavHeader from "../Navigation/NavHeader";
import './About.scss'
const About = (props) => {
    return (
        <div className='bg'>
        <NavHeader />
        <div className='noidung'>
            <div className='container mt-4'>
                <div className='brand text-center'>
                    <h1> Ứng dụng tìm bãi đỗ xe - Thành Thìn Parking</h1>
                    
                </div>
                <div className='about-content row mt-4'>
                    <div className='col-6 thanh'>
                        <div className='bit'> FRONTEND</div>
                        <hr/>
                        <div className='body'>
                            <div> Người thực hiện: Ngọc Thìn</div>
                            <div> &emsp;- Nội dung: </div>
                            <div> &emsp;- Nội dung: </div>
                            <div> &emsp;- Nội dung: </div>
                            <div> &emsp;- Nội dung: </div>
                            <div> &emsp;- Nội dung: </div>
                            <div> &emsp;- Nội dung: </div>
                            <div> &emsp;- Nội dung: </div>
                        </div>


                    </div>
                    <div className='col-6 thin'> BACKEND
                    <hr/>
                    <div className='body'>
                            <div> Người thực hiện: Trọng Thành</div>
                            <div> &emsp;- Nội dung: </div>
                            <div> &emsp;- Nội dung: </div>
                            <div> &emsp;- Nội dung: </div>
                            <div> &emsp;- Nội dung: </div>
                            <div> &emsp;- Nội dung: </div>
                            <div> &emsp;- Nội dung: </div>
                            <div> &emsp;- Nội dung: </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
        </div>

    );
}

export default About;