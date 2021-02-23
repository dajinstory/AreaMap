import './App.css';
import Navigation from './Component/Navigation';
import SearchBar from './Component/SearchBar'
import Content from './Component/Content'

function App() {
  return (
    <>
    <link href='//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css' rel='stylesheet' type='text/css'></link>
    <div style={{font:"Spoqa Han Sans, Sans-serif"}}>
      <Navigation></Navigation>
      <SearchBar></SearchBar>
      <Content></Content>
    </div>
    </>
  );
}

export default App;
