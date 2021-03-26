
import {useEffect, useState} from 'react'
import ReactList from 'react-list';

function SearchResult({searchedData}){

  const [searchList,setSearchList] = useState([])

  useEffect(() => {
    setSearchList(searchedData);
  }, [searchedData])

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
    <div style={{"boxSizing":"border-box","margin":"0px","padding":"0px","border":"0px","font":"inherit","verticalAlign":"baseline","flex":"0 0 auto","display":"flex","flexDirection":"column","width":"350px","height":"87vh","borderRight":"1px solid rgb(205, 205, 205)","position":"relative","overflow":"auto",color:"rgb(34,34,34)"}}>
          <ReactList
            itemRenderer={renderItem}
            length={searchList.length}
            type='uniform'
          />
      </div>
  )
}

export default SearchResult;