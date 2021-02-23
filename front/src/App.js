import {useState,useEffect} from 'react'
import {options,geolocationOptions} from './Data/Data'
import Navigation from './Component/Navigation';
import SearchBar from './Component/SearchBar'
import Content from './Component/Content'
import {usePosition} from './Component/Position'

function App() {

  const [searchValue,setSearchValue] = useState('한양대학교')
  const [searchMapValue,setSearchMapValue] = useState('한양대학교')
  const [selectedOption,setSelectedOption] = useState(options[1])
  const {latitude, longitude, error} = usePosition();

   // 검색창 값 변화
   const searchValueOnChangeHandler = (e)=>{
    const { value } = e.target;
    setSearchValue(value)
  }

  // 검색창 클릭시 값 지우기
  const searchValueFocusHandler = () =>{
    setSearchValue("")
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
    console.log(latitude,longitude,error)
    setSearchValue('한양대학교')
    setSelectedOption(options[1])
  }

  return (
    <>
    <link href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css' rel='stylesheet' type='text/css'></link>
    <div style={{font:"Spoqa Han Sans, Sans-serif"}}>
      <Navigation></Navigation>
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
      <Content
      searchMapValue={searchMapValue}
      selectedOption={selectedOption}
      ></Content>
    </div>
    </>
  );
}

export default App;
