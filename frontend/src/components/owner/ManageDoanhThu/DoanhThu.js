import React, { useEffect, useState } from 'react';
import NavHeader from '../../public/Navigation/NavHeader';
import OwnerSidebar from '../OwnerSidebar/OwnerSidebar';

const Card = ({ value, title, chartId }) => (
  <div className="col-lg-3 col-md-6 mb-4">
    <div className={`card bg-${chartId} update-card h-100`}>
      <div className="card-block">
        <div className="row align-items-end">
          <div className="col-8">
            <h4 className="text-black text-center">{value}</h4>
            <h6 className="text-black text-center">{title}</h6>
          </div>
          <div className="col-4 text-center">
            <canvas id={chartId} height="50"></canvas>
          </div>
        </div>
      </div>
      <div className="card-footer">
        <p className="text-black m-b-0 text-center">
          <i className="feather icon-clock text-black f-14 m-r-10"></i>
          {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  </div>
);

const DoanhThu = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMenu, setTotalMenu] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalProductItems, setTotalProductItems] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard');
        const data = await response.json();

        setTotalUsers(data.totalUsers || 0);
        setTotalMenu(data.totalMenu || 0);
        setTotalProduct(data.totalProduct || 0);
        setTotalProductItems(data.totalProductItems || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <NavHeader />
      <div className="content-body row bg">
        <div className="col-lg-2 col-md-3">
          <OwnerSidebar />
        </div>
        <div className="col-lg-8 col-md-9 mt-4">
          <h1 className="text-center display-5 mb-4 bolder">Thống kê</h1>
          <div className="row row-cols-1 row-cols-lg-2 row-cols-md-2 row-cols-sm-1">
            {[
              { value: totalUsers, title: 'Users', chartId: 'update-chart-1' },
              { value: totalMenu, title: 'Bài thi', chartId: 'update-chart-2' },
              { value: totalProduct, title: 'Bài nghe', chartId: 'update-chart-3' },
              { value: totalProductItems, title: 'Bài đọc', chartId: 'update-chart-4' },
            ].map(card => (
              <Card key={card.chartId} value={card.value} title={card.title} chartId={card.chartId} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoanhThu;
