import React from 'react';
import NavHeader from '../../public/Navigation/NavHeader';
import OwnerSidebar from '../OwnerSidebar/OwnerSidebar';
import { Container, Row, Col } from 'react-bootstrap';


function ThongKe(props) {
    return (
        <div>
            <NavHeader/>
            <div className='content-body row bg'>
                <div className='col-2'>
                    <OwnerSidebar/>
                </div>
                <Container className="mt-5">
      <h1 className="text-center mb-4">Thống kê Đơn Giản</h1>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <div>
            <canvas id="myChart"></canvas>
          </div>
        </Col>
      </Row>
    </Container>
            </div>
        </div>
    );
}

export default ThongKe;