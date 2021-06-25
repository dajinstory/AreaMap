/* global kakao*/
import { Circle, circle } from "leaflet";
import React, {useState, useEffect } from "react";
import { Polyline, withLeaflet } from "react-leaflet";
import axios from 'axios';

function MapComponent({searchMapValue,selectedOption, lat, lng, setList,type,openModal}) {
  //map 객체
  const [mapi,setMapi] = useState(0);
  //마커 저장하는 배열
  const [markerArr, setmarkerArr] = useState([]);
  //원 저장하는 배열
  const [circleArr, setcircleArr] = useState([]);
  //type
  const [mapType, setmapType] = useState(type);

  useEffect(() => {
      console.log(searchMapValue)
      setMapi(mapmake());
  }, []);
  useEffect(() => {
    mapscript();
  }, [searchMapValue, selectedOption]);

  var mapData = [];
  
  //처음 default 중심 좌표 (서울 시청)
  var centerX = 37.566826;
  var centerY = 126.9786567;
  //설정된 반경
  var radius = selectedOption.value;
  var mapCenter;
  var infowindow = new kakao.maps.InfoWindow({zIndex:1});
  //장소 검색 객체
  var ps;
  var firstDataId = 0;
  //왼쪽에 표시될 마커 정보 배열
  var searchCSList =[];
  //임시 마커 배열
  const tmpMarkerArr = [];

  //map객체 생성
  const mapmake = () => {
    console.log("mapmake");
    let container = document.getElementById("map");
    let options = {
        center: new kakao.maps.LatLng(centerX, centerY),
        level: 5,
    };
    const map = new kakao.maps.Map(container, options);
    return map;
  }

  //생성된 맵 객체 사용
  const mapscript = async () => {
    setmarkerArr([]);
    setList([]);
    console.log("mapscript");
    //장소 검색용 객체 생성
    ps = new kakao.maps.services.Places(mapi);
     //주소를 입력했을 때 마커를 생성하고 해당 좌표로 이동
    deleteMarker();
    deleteCircle();
    var geocoder = new kakao.maps.services.Geocoder();
    await geocoder.addressSearch(searchMapValue, searchingHome);
  };
  //지도에 그려지는 마커와 원 초기화
  const deleteMarker = () => markerArr.forEach(e => e.setMap(null));
  const deleteCircle = () => circleArr.forEach(e => e.setMap(null));
  //입력된 주소를 지도의 center로 정하고 반경 내의 편의점, 따릉이를 검색
  async function searchingHome(result, status){
    if (status === kakao.maps.services.Status.OK){
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      var searchedCenter = {x: coords.La, y: coords.Ma, place_name : '우리집'};
      centerX = coords.Ma;
      centerY = coords.La;
      mapi.setCenter(coords);
      mapCenter = mapi.getCenter();
      //따세권인 경우
      if(mapType === 'bike'){
        await postPlace(centerY, centerX);
        await placeSearchForBike(mapData);  
      }
      //편세권인 경우
      else if(mapType === 'store'){
        //해당 좌표를 중심으로 편의점 찾기 (page마다 15개의 data, 4개의 page)
        for(var i=1;i<=4;i++){
          await ps.categorySearch('CS2', placesSearchWithCategory, {location: coords,radius: radius, page:i}); 
        }   
      }
      //반경내의 따릉이, 편의점을 나타낸 마커 배열 저장
      setmarkerArr(tmpMarkerArr);
      //입력된 주소의 마커(집)를 지도에 표시
      displayMarker(searchedCenter);
      //반경에 맞추어 지도에 원 표시
      makeCircle(coords.Ma, coords.La);

      //모달 표시
    }
  }

  //편의점 찾는 함수 (카테고리 검색)
  async function placesSearchWithCategory (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
      //firstDataId : 각 page마다 처음 data 
      //api가 더 이상 검색결과가 없으면 반복해서 data를 제공하기에 firstDataId를 통해 그 전 page와 data가 겹치는지 확인
      for (var i=0; i<data.length; i++) {
          if(data[i].id == firstDataId){
            break;
          }
          else{
            displayMarker(data[i]);    
          }
      }
      firstDataId = data[0].id;
    }
    //마지막 page에 도달했을 경우 마커 배열에 그동안 찾아낸 위치들을 추가 + 길이별 정렬
    if(pagination.current === 4){
      searchCSList.sort(function (a, b){
        return a.distance < b.distance ? -1 : a.distance > b.distance ? 1: 0;
      });
      setList(searchCSList);
      //모달
      if (searchCSList.length>0){
        openModal(true);
      }else{
        openModal(false);
      }
    }
  }

  //따릉이 찾는 함수
  function placeSearchForBike (data){
    for(var i=0; i<data.length; i++){
      displayMarker(data[i]);
    }
    //마커 배열에 그동안 찾아낸 위치들을 추가
    setList(searchCSList);
    //모달
     if (searchCSList.length>0){
      openModal(true);
    }else{
      openModal(false);
    }
  }


  // 지도에 마커를 표시하는 함수
  function displayMarker(place) {
      var markerPosition = new kakao.maps.LatLng(place.y, place.x);
      //지도 중심과 마커간의 거리를 구합니다
      var poly = new kakao.maps.Polyline({
        path : [mapCenter, markerPosition]
      });
      var dist = poly.getLength();
      console.log(mapCenter);
      console.log(place.y, place.x);
      console.log(dist);
      //둘 사이의 거리가 설정한 반경보다 작을 때에만 추가해줌
      if(dist <= radius){
        //마커가 검색된 좌표(집)인 경우는 마커를 따로 생성
        if(place.place_name == '우리집'){
          var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
          var imageSize = new kakao.maps.Size(24,35); 
          var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
          var marker = new kakao.maps.Marker({
            map: mapi,
            position: markerPosition,
            image : markerImage
          });
        }
        //
        else{
            marker = new kakao.maps.Marker({
            map: mapi,
            position: markerPosition
          });
        }
          
        //마커에 마우스를 갖다대면 infowindow 출력
        kakao.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            console.log(place.place_name);  
            infowindow.open(mapi, marker);
        });
        //떼면 infowindow가 사라짐
        kakao.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
        });
        marker.setMap(mapi);
        //검색된 좌표(집)가 아닌 경우에만 장소 배열에 추가해줍니다.
        if(place.place_name != '우리집'){
          searchCSList.push({name: place.place_name, distance : Math.floor(dist), roadAddress: place.road_address_name, placeNumber : place.id});
        }
        //임시 마커 배열에 추가
        tmpMarkerArr.push(marker);
      }
  }

  //반경에 따른 원을 그리는 함수
  function makeCircle(x, y) {
    var circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(x, y),
      radius: radius,
      strokeWeight: 5, // 선의 두께입니다 
      strokeColor: '#75B8FA', // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'dashed', // 선의 스타일 입니다
      fillColor: '#CFE7FF', // 채우기 색깔입니다
      fillOpacity: 0.7  // 채우기 불투명도 입니다
    });
    circle.setMap(mapi);
    const tmpCircleArr = [];
    tmpCircleArr.push(circle);
    setcircleArr(tmpCircleArr);
  }

  //서버와의 통신
  async function postPlace(x, y){
    const posting = {x: x, y: y, radius: radius};
    let form = new FormData();
    form.append('latitude', x);
    form.append('longitude', y);
    form.append('dist_w', 0.0001);
    form.append('dist_h', 0.0001);
    await axios.get('http://3.37.97.136:47000/bike',{
      data:{
        latitude:x,
        longitude:y,
        dist_w:0.01,
        dist_h:0.01
      }
    })
    .then((response)=> {
      var res = JSON.stringify(dummydata);
      console.log(res);
      for(var i=0;i<res.length;i++){
        const postingData = { place_name: res[i].place_name, x: res[i].longitude, y: res[i].latitude, road_address_name: res[i].road_address_name, dist : "200"}
        mapData.push(postingData);
      }
    })
    .catch((response) => { console.log('Error!')});
    
  }

  return <div id="map" style={{ width: "100vw", height: "87vh", zIndex:"0"}}></div>;
}

export default MapComponent;