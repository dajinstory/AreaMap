import MapComponent from './MapComponent';
import react, {useEffect, useState} from 'react'
import ReactList from 'react-list';

function Content({searchMapValue,selectedOption}){

  const [searchList,setSearchList] = useState([
    {name:"사근동 대여소", distance:30, roadAddress:"도로명주소", address:"지번주소",placeNumber:19198950},
    {name:"사근동 대여소", distance:30, roadAddress:"도로명주소", address:"지번주소",placeNumber:19198950},
    {name:"사근동 대여소", distance:30, roadAddress:"도로명주소", address:"지번주소",placeNumber:19198950},
    {name:"사근동 대여소", distance:30, roadAddress:"도로명주소", address:"지번주소",placeNumber:19198950},
    {name:"사근동 대여소", distance:30, roadAddress:"도로명주소", address:"지번주소",placeNumber:19198950},
    {name:"사근동 대여소", distance:30, roadAddress:"도로명주소", address:"지번주소",placeNumber:19198950},
    {name:"사근동 대여소", distance:30, roadAddress:"도로명주소", address:"지번주소",placeNumber:19198950},
    {name:"사근동 대여소", distance:30, roadAddress:"도로명주소", address:"지번주소",placeNumber:19198950},
    {name:"사근동 대여소", distance:30, roadAddress:"도로명주소", address:"지번주소",placeNumber:19198950},
  ])

  function setList(data){
    setSearchList(data);
  }
 
  const renderItem = (index, key) =>{
      return ( 
      <div style={{padding:"10px", height:"auto","fontFamily": "AppleSDGothicNeo-Regular,'돋움',dotum,sans-serif", borderBottom:"1px solid rgb(231, 231, 231)"}} key={key}>
        <div style={{padding:"10px",paddingBottom:"0px"}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <div style={{font:"12px 'Malgun Gothic','돋움',dotum,sans-serif",fontWeight:"bold",fontSize:"17px",lineHeight:"1.5"}}>{searchList[index].name}</div>
            <div style={{font:"12px 'Malgun Gothic','돋움',dotum,sans-serif",fontWeight:"bold",fontSize:"20px",color:"rgb(21,100,200)"}}>{searchList[index].distance}M</div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}} >
            <div style={{marginTop:"10px"}}>{searchList[index].roadAddress}</div>
            <a style={{marginTop:"10px"}} href={"https://place.map.kakao.com/"+searchList[index].placeNumber}>상세보기</a>
          </div>
          {/* <div>{searchList[index].address}</div> */}
        </div>
      </div>);
  }


  return (
    <div style={{"boxSizing":"border-box","margin":"0px","padding":"0px","border":"0px","font":"inherit","verticalAlign":"baseline","WebkitBoxFlex":"1","flexGrow":"1","display":"flex","width":"100%","height":"calc(100% - 149px)","position":"relative"}}>
      {/* 좌측 검색 결과 */}
      
      <div style={{"boxSizing":"border-box","margin":"0px","padding":"0px","border":"0px","font":"inherit","verticalAlign":"baseline","flex":"0 0 auto","display":"flex","flexDirection":"column","width":"350px","height":"87vh","borderRight":"1px solid rgb(205, 205, 205)","position":"relative","overflow":"auto",color:"rgb(34,34,34)"}}>
          <ReactList
            itemRenderer={renderItem}
            length={searchList.length}
            type='uniform'
          />
      </div>

      {/* 카카오맵 - 세진 여기 div에서 작업해면 돼*/}
      {/* <div style={{"boxSizing":"border-box","margin":"0px","padding":"0px","border":"0px","font":"inherit","verticalAlign":"baseline","WebkitBoxFlex":"1","flexGrow":"1","height":"calc(100% - 149px)","position":"relative","zIndex":"10"}}> </div> */}
        <MapComponent
        searchMapValue={searchMapValue}
        selectedOption={selectedOption}
        setList={setList}
        ></MapComponent>
    </div>
  )
}
export default Content;