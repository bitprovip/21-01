import Map from "../../Map/Map";
import HowWorks from "../../Show/HowWorks";
import Footer from "../../Show/Footer";
import NavHeader from "../Navigation/NavHeader";
const HomePage= (props) => {

  return(
    <>
      <div >
        <NavHeader/>
      </div>
      <div>
        <Map />
        <HowWorks/>
        <Footer/>
      </div>
      
    </>
  )
}


export default HomePage