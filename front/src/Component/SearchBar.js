import react,{useState} from 'react'
import Select from 'react-select';

const options = [
  { value: '200', label: '200M' },
  { value: '500', label: '500M' },
  { value: '1KM', label: '1KM' },
  { value: '2KM', label: '2KM' },
];


function SearchBar(){
  
  const [selectedOption,SetSelectedOption] = useState(options[1])
  
  const handleChange= (e) => {
    console.log(selectedOption)
    console.log(e);
    SetSelectedOption(e)
  };

  const style = {
    option:(provided, state)=>({
      ...provided,
      width:"200px",
    }),
    container:(provided, state)=>({
      ...provided,
      width:"200px",
    }),
  }

  const resetOption = () =>{
    SetSelectedOption(options[1])
  }

  return(
    <div style={{"boxSizing":"border-box","margin":"0px","padding":"0px","border":"0px","font":"inherit","verticalAlign":"baseline","flex":"0 0 auto","display":"flex","width":"100%","minWidth":"1280px","height":"64px","borderBottom":"1px solid rgb(205, 205, 205)","backgroundColor":"rgb(255, 255, 255)","boxShadow":"rgba(0, 0, 0, 0.07) 0px 1px 3px 0px","zIndex":"900"}}>
      {/* 검색바 */}
      <div style={{"boxSizing":"border-box","margin":"0px","padding":"0px","border":"0px","font":"inherit","verticalAlign":"baseline","flex":"0 0 auto","width":"240px","height":"100%","borderRight":"1px solid rgb(235, 235, 235)","position":"relative"}}>
        <input 
        style={{"fontFamily":"\"Spoqa Han Sans\", Sans-serif","boxSizing":"border-box","margin":"0px","appearance":"none","userSelect":"text","outline":"none","width":"100%","height":"100%","padding":"0px 50px 0px 30px","color":"rgb(34, 34, 34)","fontSize":"16px","border":"none","backgroundColor":"transparent"}}
        placeholder="신림동 원룸"
        type="text"
        autoComplete="off"
        >
        </input>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style={{"font":"inherit","width":"18","height":"18","fontFamily":"\"Spoqa Han Sans\", Sans-serif","boxSizing":"border-box","margin":"0px","padding":"0px","position":"absolute","top":"50%","right":"20px","transform":"translateY(-50%)"}}>
          <path id="Icon_awesome-search" data-name="Icon awesome-search" d="M17.755,15.562l-3.505-3.5a.843.843,0,0,0-.6-.246h-.573a7.31,7.31,0,1,0-1.266,1.266v.573a.843.843,0,0,0,.246.6l3.505,3.5a.84.84,0,0,0,1.192,0l.995-.995a.848.848,0,0,0,0-1.2ZM7.313,11.811a4.5,4.5,0,1,1,4.5-4.5A4.5,4.5,0,0,1,7.313,11.811Z"/>
        </svg>
      </div>
      {/* 필터 */}
      <div style={{"boxSizing":"border-box","margin":"0px","border":"0px","font":"inherit","verticalAlign":"baseline","WebkitBoxFlex":"1","flexGrow":"1","display":"flex","WebkitBoxAlign":"center","alignItems":"center","width":"0px","height":"100%","padding":"0px 12px"}}>
      <Select 
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={style}
      ></Select>
      </div>

      {/* 초기화버튼 */}
      <div style={{"boxSizing":"border-box","margin":"0px","padding":"0px","border":"0px","font":"inherit","verticalAlign":"baseline","flex":"0 0 auto","display":"flex","WebkitBoxAlign":"center","alignItems":"center","height":"100%","marginLeft":"auto","marginRight":"15px"}}>
        <button onClick={resetOption} style={{"fontFamily":"\"Spoqa Han Sans\", Sans-serif","boxSizing":"border-box","margin":"0px","padding":"0px","cursor":"pointer","outline":"none","touchAction":"manipulation","WebkitTapHighlightColor":"transparent","display":"flex","WebkitBoxAlign":"center","alignItems":"center","WebkitBoxPack":"center","justifyContent":"center","width":"36px","height":"36px","color":"rgb(34, 34, 34)","border":"1px solid rgb(223, 223, 223)","borderRadius":"2px","backgroundColor":"rgb(255, 255, 255)"}}> 
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#222222" fillRule="evenodd" clipRule="evenodd" d="M11 6.33201C9.657 6.33201 8.448 6.92701 7.613 7.88301C7.401 8.12301 7.033 8.15201 6.789 7.93601C6.547 7.72601 6.523 7.35801 6.735 7.11301C7.779 5.92301 9.302 5.16501 11 5.16501C14.13 5.16501 16.654 7.72501 16.716 10.882L17 10.59C17.225 10.363 17.594 10.357 17.824 10.584C18.054 10.806 18.059 11.174 17.834 11.407L16.55 12.719C16.44 12.83 16.29 12.894 16.133 12.894C15.976 12.894 15.826 12.83 15.716 12.719L14.433 11.407C14.208 11.173 14.212 10.806 14.443 10.584C14.673 10.357 15.042 10.363 15.267 10.59L15.548 10.876C15.486 8.34401 13.462 6.33201 11 6.33201ZM5.867 9.10201C6.024 9.10201 6.174 9.16701 6.284 9.27801L7.567 10.59C7.792 10.823 7.788 11.19 7.557 11.413C7.327 11.64 6.958 11.634 6.733 11.407L6.452 11.121C6.514 13.653 8.538 15.665 11 15.665C12.343 15.665 13.552 15.07 14.387 14.113C14.599 13.874 14.967 13.845 15.211 14.061C15.453 14.271 15.477 14.638 15.265 14.883C14.221 16.073 12.698 16.832 11 16.832C7.87 16.832 5.346 14.271 5.284 11.115L5 11.407C4.775 11.634 4.406 11.64 4.176 11.413C3.946 11.191 3.941 10.823 4.166 10.59L5.45 9.27801C5.56 9.16701 5.71 9.10301 5.867 9.10301V9.10201Z">
            </path>
          </svg>
        </button>
      </div>
    </div>
  )

}

export default SearchBar;