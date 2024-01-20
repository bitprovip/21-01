import React,{useEffect, useState} from "react";
import "./ShowParking.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import {readDsHienThi} from "../../services/parkingService";


const ShowParking = (props) => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const [baiXe, setBaiXe] = useState([]);

  useEffect(() => {
        fetchDsViewBenDau();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  const fetchDsViewBenDau = async () => {
        let response = await readDsHienThi();
        if(response && +response.EC === 0 ){
            setBaiXe(response.DT);
            localStorage.setItem("markers", JSON.stringify(response.DT));
        }
  }

  const handleclick = ()=>{
    console.log(baiXe);
  }
  
  return (
    <div className="show-parking">
      <div className="content">
        <div className="content-header">
          <span className="title">Bãi xe nổi bật</span>
        </div>
        <div className="content-body">
          {baiXe.map((marker, index) => (
           <Slider {...settings}>
              <div>
                <div> {marker.id}</div>
                <div> {marker.name}</div>
                <div>Abc</div>
              </div>
            <button  className= 'btn btn-success' onClick={()=>{handleclick()}}>fdsfsdfsdf</button>
          </Slider>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ShowParking;
