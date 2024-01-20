/* global google */
// import { jsx, jsxs } from 'react/jsx-runtime';
import ModalDatCho from './ModalDatCho';
import ModalThongTin from './ModalThongTin';
import parkcar from '../../assets/parking.png'
import car from '../../assets/car.png'
import {readDsHienThi, updateLuotXem} from "../../services/parkingService";
import{Box,Button,ButtonGroup,Flex,HStack,IconButton,Input,List,ListItem,Text} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes} from "react-icons/fa";
import React, { useEffect, useState, useRef, useContext } from "react";
import {UserContext} from '../../context/UserContext'
import {  GoogleApiWrapper } from "google-maps-react";
import {Autocomplete,DirectionsRenderer,GoogleMap,Marker} from "@react-google-maps/api";
import "./Map.css";

const boxStyle = {
  width: "22%" ,
  height: "100vh",
};

const MapContainer = (props) => {
  const {user}= useContext(UserContext);
  const [isShowModalDatCho, setIsShowModalDatCho] = useState(false);
  const [isShowModalThongTin, setIsShowModalThongTin] = useState(false);
  const [dataModalThongtin, setDataModalThongtin] = useState({});
  const [latitude, setLatitude] = useState(10.73804145380962);
  const [longitude, setLongitude] = useState(106.67806202673555 );

  // const [map, setMap] = useState(/** @type google.maps.Map */ (null));
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
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()
  const [baiXe, setBaiXe] = useState([]); //khai bao danh sach bai xe de gim
  const [baiXeGanNhat, setBaiXeGanNhat] = useState([]);
  const [dataBooking, setDataBooking] = useState({});
  const [parkingData,setParkingData] = useState({});
  // const [luotViewTT, setLuotViewTT] = useState();
  const getMarkersFromLocalStorage = () => {
    const storedMarkers = localStorage.getItem("markers");
    return storedMarkers ? JSON.parse(storedMarkers) : [];
  };

  useEffect(() => {
    const storedMarkers = getMarkersFromLocalStorage();
    setBaiXe(storedMarkers);
  }, []);


  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  const vitrihientai = () => {
    // if(!position){
    //   console.log('dsfdsfsdfd>>>>',position);
    //   alert('hãy bật vị trí')
    // } else {
        navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    // }
  };
  const handleChiDuong = async(marker) =>{
    // eslint-disable-next-line no-undef
    let a = await vitrihientai();
    if(a && latitude===10.73804145380962)
    {
      return(alert('Hãy bật vị trí'))
    } else {
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: { lat: latitude, lng: longitude },
      destination: { lat: Number(marker.lat), lng: Number(marker.lng) },
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    }
  }
  

  function xoasearch() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = '';
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);

  const [center, setCenter] = useState({ lat: latitude, lng: longitude });

  


  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Bán kính trái đất (đơn vị: km)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }

  useEffect(() => {
    if (latitude && longitude && baiXe.length > 0) {
      const nearest = baiXe
        .map((marker) => ({
          ...marker,
          distance: calculateDistance(
            latitude,
            longitude,
            marker.lat,
            marker.lng
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 4); 
      setBaiXeGanNhat(nearest);
    } else {
      setBaiXeGanNhat([]);
    }
  }, [latitude, longitude, baiXe]);

  const handleBooking = (marker) =>{
     setDataBooking(marker);
     setIsShowModalDatCho(true);
  }
  const handleThongTin = async (marker) =>{
    setDataModalThongtin(marker);
    setIsShowModalThongTin(true);
    setParkingData(marker);
    await updateLuotXem(marker)
    // console.log(baiXeGanNhat);
  }
  
  const onHideModalDatCho = async() =>{
        setIsShowModalDatCho(false);
        setDataModalThongtin({});
  }
  const onHideModalThongTin = async() =>{
        setIsShowModalThongTin(false);
  }

  
  async function reverseGeocode(lat, lng) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyArVizBbMBDY027MKq7kGrwuAPZB-am0oE`
      ).JSON();
      const data = await response.json();

      if (data.results.length > 0) {
        const address = data.results[0].formatted_address;
        console.log(address); // In địa chỉ tại đây hoặc xử lý theo yêu cầu của bạn
        return address;
      } else {
        console.log("Không tìm thấy địa chỉ.");
      }
    } catch {
      
    }
  }

  async function getAddress(lat, lng) {
    try {
      const address = await reverseGeocode(lat, lng);
      return address;
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  const [nearestAddresses, setNearestAddresses] = useState([]);

  useEffect(() => {
    const fetchNearestAddresses = async () => {
      const addresses = await Promise.all(
        baiXeGanNhat.map((marker) => getAddress(marker.lat, marker.lng))
      );
      setNearestAddresses(addresses);
    };

    fetchNearestAddresses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baiXeGanNhat]);


  const chiDuongfromModal =  async()=>{
        await handleChiDuong({...parkingData });
        setIsShowModalThongTin(false);
  }
  const createBooking =  async()=>{
      setDataBooking(parkingData);
      setDataModalThongtin(false);
      setIsShowModalDatCho(true);
  }
  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          // onLoad={map => setMap(map)}
        >
          {/* <Marker position={center} /> */}
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} 
            options={{
                    polylineOptions: {
                    strokeOpacity: 1.0,
                    strokeColor: '#F36629',
                    strokeWeight: 6,
                    // icon: {car}
                    }
                }}/>
          )}

          {latitude!==10.73804145380962 && longitude && (
          <Marker position={{ lat: latitude, lng: longitude }} 
            icon={car}
          />
        )}
        {baiXe.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: Number(marker.lat), lng: Number(marker.lng) }} 
            icon={parkcar}
            onClick={()=>handleThongTin(marker)}
          />
        ))}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Điểm xuất phát' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Điểm xuất phát'
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Tìm đường
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={xoasearch}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={2} mt={4} justifyContent='space-between'>
          <Text>Khoảng cách: {distance} </Text>
          <Text>Ước tính: {duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            onClick={vitrihientai}
          />
        </HStack>
      </Box>


      <Box
        className="box1"
        style={boxStyle}
        p={4}
        borderRadius="lg"
        bgColor="white"
        shadow="base"
        zIndex="1"
      >      
        <Box mt={3}>
          <h1 className="tieude">GỢI Ý : NHỮNG BÃI ĐỖ GẦN BẠN </h1>
          <hr/>
          <List spacing={6}>
            {baiXeGanNhat.map((marker, index) => (
              <ListItem key={index}>
                <Text className='row'> 
                  <span className='text-white fw-normal fs-4 col-12 badge bg-primary ' > {`${marker.name}`} </span> 
                  <span className='mt-2 text-success fw-bolder fs-6 col-4'> {`${Math.round(marker.distance*100)/100} km`} </span> 
                  <span className='mt-2 text-danger fw-bolder fs-6 col-4'> {`${marker.price} đ/h`} </span>
                  <span className='mt-2 text-muted fw-bolder fs-6 col-4'> <i className="fa fa-eye" aria-hidden="true"></i> {`${marker.luotxem}`} </span>
                  <span className='col-12 mt-3'> {`Địa chỉ: ${marker.address}`} </span> 
                </Text>

                <Button 
                  className='btn btn-success'
                  onClick={() => handleThongTin(marker)}>Thông tin</Button>
                <Button
                  className={ user.isAuthenticated===true ? 'btn btn-info ms-2' : 'btn btn-info ms-2 d-none'} onClick={()  => handleBooking(marker)}>Đặt chỗ</Button> 

                <Button
                  className='btn btn-warning ms-2' onClick={()  => handleChiDuong(marker)}>Chỉ đường</Button> 
                  <hr/>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      <ModalDatCho
        onHide={onHideModalDatCho}
        show={isShowModalDatCho}
        dataBooking={dataBooking}
      />
      <ModalThongTin
        onHide={onHideModalThongTin}
        show={isShowModalThongTin}
        dataBooking={dataModalThongtin}
        chiDuongfromModal={chiDuongfromModal}
        createBooking={createBooking}
      />
    </Flex>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOONG_API_KEY,
})(MapContainer);
