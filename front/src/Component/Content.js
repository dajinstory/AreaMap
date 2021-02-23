import MapComponent from './MapComponent';

function Content(){


  return (
    <div style={{"boxSizing":"border-box","margin":"0px","padding":"0px","border":"0px","font":"inherit","verticalAlign":"baseline","display":"flex","minWidth":"1280px","height":"1000px","position":"relative"}}>
      {/* 좌측 검색 결과 */}
      
      <div style={{"boxSizing":"border-box","margin":"0px","padding":"0px","border":"0px","font":"inherit","verticalAlign":"baseline","flex":"0 0 auto","display":"flex","flexDirection":"column","width":"512px","height":"100%","borderRight":"1px solid rgb(205, 205, 205)","position":"relative","overflow":"hidden"}}></div>

      {/* 카카오맵 - 세진 여기 div에서 작업해면 돼*/}
      <div style={{"boxSizing":"border-box","margin":"0px","padding":"0px","border":"0px","font":"inherit","verticalAlign":"baseline","WebkitBoxFlex":"1","flexGrow":"1","height":"100%","position":"relative","zIndex":"10"}}> </div>
        <MapComponent></MapComponent>
    </div>
  )
}
export default Content;