import {useState,useEffect} from 'react'
import {options,geolocationOptions} from './Data/Data'
import Navigation from './Component/Navigation'
import SearchBar from './Component/SearchBar'
import SearchResult from './Component/SearchResult'
import MapComponent from './Component/MapComponent'
import Footer from './Component/Footer'
import ModalWindow from './Component/ModalWindow'
// import {usePosition} from './Component/Position'

function Bike() {

  const type = "bike";

  const [searchValue,setSearchValue] = useState('')
  const [searchMapValue,setSearchMapValue] = useState('')
  const [selectedOption,setSelectedOption] = useState(options[1])
  const [searchList,setSearchList] = useState([])

   // 검색창 값 변화
   const searchValueOnChangeHandler = (e)=>{
    const { value } = e.target;
    setSearchValue(value)
  }

  // 검색창 클릭시 값 지우기
  const searchValueFocusHandler = () =>{
    // setSearchValue("")
  }

  // 엔터 감지
  const searchValueEnterHandler = (e) =>{
    if (e.key === "Enter") {
      search(searchValue)
    }
  }

  // 검색 핸들러 함수
  const searchHandler =()=>{
    search(searchValue)
  }

  // 실제 검색
  const search = (text) =>{
    setSearchMapValue(text)
  }

  // react-select 상태 변화 함수
  const handleChange= (e) => {
    setSelectedOption(e)
  };

  // 리셋 버튼 클릭
  const resetOption = () =>{
    // console.log(latitude,longitude,error)
    setSearchValue('한양대학교')
    setSelectedOption(options[1])
  }

  const [modaldata,setModaldata] = useState({
    modal:false,
    success : false
  });
  const { modal, success } = modaldata


  const openModal = (success) => {
    setModaldata({
      modal:true,
      success : success
    })
  }

  const  closeModal = ()=> {
    setModaldata({
      modal:false,
      success : false
    })
  }


  return (
    <>
    <link href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css' rel='stylesheet' type='text/css'></link>
      <div style={{font:"Spoqa Han Sans, Sans-serif"}}>
        <div style={{width:"100vw",height:"100vh",minWidth:"1300px",overflow:"auto"}}>
          <Navigation type={type}></Navigation>
          <SearchBar
          searchValue={searchValue}
          selectedOption={selectedOption}
          searchValueOnChangeHandler={searchValueOnChangeHandler}
          searchValueFocusHandler={searchValueFocusHandler}
          searchValueEnterHandler={searchValueEnterHandler}
          searchHandler={searchHandler}
          handleChange={handleChange}
          resetOption={resetOption}
          ></SearchBar>
          <div style={{"boxSizing":"border-box","margin":"0px","padding":"0px","border":"0px","font":"inherit","verticalAlign":"baseline","WebkitBoxFlex":"1","flexGrow":"1","display":"flex","width":"100%","height":"calc(100% - 149px)","position":"relative"}}>
              <SearchResult searchedData={searchList}></SearchResult>
              { 
                <MapComponent
                    searchMapValue={searchMapValue}
                    selectedOption={selectedOption}
                    setList={setSearchList}
                    type={type}
                    openModal={openModal}
                ></MapComponent>
              }
          </div>
          <ModalWindow modalIsOpen={modal} adress={searchValue} closeModal={closeModal} type={type} success={success}></ModalWindow>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Bike;
