import react from 'react'

function Navigation(){

  return(
    <nav style={{
      "boxSizing": "border-box",
      "margin": "0px",
      "padding": "0px",
      "border": "0px",
      "font": "inherit",
      "verticalAlign": "baseline",
      "display": "block",
      "flex": "0 0 auto",
      "width": "100%",
      "height": "70px",
      "zIndex": "900"
      }}>
      <div style={{
        "boxSizing": "border-box",
        "margin": "0px",
        "border": "0px",
        "font": "inherit",
        "verticalAlign": "baseline",
        "display": "flex",
        "WebkitBoxAlign": "center",
        "alignItems": "center",
        "WebkitBoxPack": "justify",
        "justifyContent": "space-between",
        "width": "100%",
        "minWidth": "1280px",
        "height": "70px",
        "padding": "0px 30px",
        "borderBottom": "1px solid rgb(237, 237, 237)",
        "backgroundColor": "rgb(255, 255, 255)"
    }}>
        <nav style={{
          "boxSizing": "border-box",
          "margin": "0px",
          "padding": "0px",
          "border": "0px",
          "font": "inherit",
          "verticalAlign": "baseline",
          "display": "flex",
          "WebkitBoxAlign": "center",
          "alignItems": "center"
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="61" height="27" viewBox="0 0 36 33">
          <g id="Icon_feather-map" data-name="Icon feather-map" transform="translate(0 -1.5)">
            <path id="패스_3" data-name="패스 3" d="M1.5,9V33L12,27l12,6,10.5-6V3L24,9,12,3Z" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
            <path id="패스_4" data-name="패스 4" d="M12,3V27" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
            <path id="패스_5" data-name="패스 5" d="M24,9V33" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
          </g>
        </svg>
        <div style={{
          "boxSizing": "border-box",
          "margin": "0px",
          "padding": "0px",
          "border": "0px",
          "font": "inherit",
          "verticalAlign": "baseline",
          "display": "flex",
          "WebkitBoxAlign": "center",
          "alignItems": "center",
          "marginLeft": "20px"
        }}>
        <a 
          href="https://www.naver.com"
          style={{
            "boxSizing": "border-box",
            "margin": "0px",
            "padding": "0px",
            "border": "0px",
            "font": "inherit",
            "verticalAlign": "baseline",
            "textDecoration": "none",
            "cursor": "pointer",
            "outline": "none",
            "fontFamily": "\"Spoqa Han Sans\", \"Nanum Gothic\", -apple-system, sans-serif",
            "color": "rgb(136, 136, 136)",
            "fontSize": "13px",
            "letterSpacing": "-0.5px"
          }}>링크1</a>
        <span style={{
          "boxSizing": "border-box",
          "padding": "0px",
          "border": "0px",
          "font": "inherit",
          "verticalAlign": "baseline",
          "fontFamily": "\"Spoqa Han Sans\", \"Nanum Gothic\", -apple-system, sans-serif",
          "width": "1px",
          "height": "15px",
          "margin": "1px 12px 0px",
          "backgroundColor": "rgb(221, 221, 221)"
        }}></span>
        <a
          href="https://google.co.kr"
          style={{
            "boxSizing": "border-box",
            "margin": "0px",
            "padding": "0px",
            "border": "0px",
            "font": "inherit",
            "verticalAlign": "baseline",
            "textDecoration": "none",
            "cursor": "pointer",
            "outline": "none",
            "fontFamily": "\"Spoqa Han Sans\", \"Nanum Gothic\", -apple-system, sans-serif",
            "color": "rgb(136, 136, 136)",
            "fontSize": "13px",
            "letterSpacing": "-0.5px"
        }}>링크2</a>

        </div>


        </nav>
        <nav style={{
          "boxSizing": "border-box",
          "margin": "0px",
          "padding": "0px",
          "border": "0px",
          "font": "inherit",
          "verticalAlign": "baseline",
          "display": "flex",
          "WebkitBoxAlign": "center",
          "alignItems": "center"
        }}>
          <a href="https://portal.hanyang.ac.kr/sso/lgin.do" style={{
            "boxSizing": "border-box",
            "margin": "0px",
            "border": "0px",
            "font": "inherit",
            "verticalAlign": "baseline",
            "textDecoration": "none",
            "outline": "none",
            "fontFamily": "\"Spoqa Han Sans\", \"Nanum Gothic\", -apple-system, sans-serif",
            "display": "inline-block",
            "padding": "5px 0px",
            "color": "rgb(21, 100, 249)",
            "fontSize": "15px",
            "lineHeight": "27px",
            "position": "relative",
            "cursor": "pointer"
        }}>따세권</a>
         <a href="https://portal.hanyang.ac.kr/sso/lgin.do" style={{
            "boxSizing": "border-box",
            "margin": "0px",
            "border": "0px",
            "font": "inherit",
            "verticalAlign": "baseline",
            "textDecoration": "none",
            "outline": "none",
            "fontFamily": "\"Spoqa Han Sans\", \"Nanum Gothic\", -apple-system, sans-serif",
            "display": "inline-block",
            "padding": "5px 0px",
            "color": "rgb(34, 34, 34)",
            "fontSize": "15px",
            "lineHeight": "27px",
            "position": "relative",
            "cursor": "pointer",
            "marginLeft": "35px"
      }}>편세권</a>
        </nav>

      </div>
    </nav>
  )
}

export default Navigation;