/* global kakao*/
import React, {useState, useEffect } from "react";
import { Polyline, withLeaflet } from "react-leaflet";

function MapComponent({searchMapValue,selectedOption, lat, lng}) {
  const [mapi,setMapi] = useState(0);
  useEffect(() => {
      setMapi(mapmake());
  }, []);
  useEffect(() => {
    mapscript();
  }, [searchMapValue, selectedOption]);
  const mapData = [{ name: "현대 고등학교 건너편", lat: "127.066933", lng: "37.623417", address: "서울특별시 강남구 압구정로 134", dist : "200"},
                   { name: "논현역 7번 출구", lat: "127.021477", lng: "37.511517", address: "서울특별시 강남구 학동로 지하 102", dist : "200"},
                   { name: "신영 로열플레이스 앞", lat: "127.035835", lng: "37.512527", address: "서울특별시 강남구 언주로 626", dist : "200"},
                   { name: "MCM본사 직영점 앞", lat: "127.0345508", lng: "37.520641", address: "서울특별시 강남구 언주로 734", dist : "200"}]
  var centerX = 37.624915253753194;
  var centerY = 127.15122688059974;
  var radius = selectedOption.value;
  var mapCenter;
  var infowindow = new kakao.maps.InfoWindow({zIndex:1, removable: true});
  var ps;
  var searchCSList;

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
    console.log("mapscript");
    //장소 검색용 객체 생성
    ps = new kakao.maps.services.Places(mapi);
     //주소를 입력했을 때 마커를 생성하고 해당 좌표로 이동
    var geocoder = new kakao.maps.services.Geocoder();
    await geocoder.addressSearch(searchMapValue, searchingCS);
  };

  async function searchingCS(result, status){
    if (status === kakao.maps.services.Status.OK){
      var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
      var searchedCenter = {x: coords.La, y: coords.Ma, place_name : '우리집'};
      centerX = coords.Ma;
      centerY = coords.La;
      mapi.setCenter(coords);
      mapCenter = mapi.getCenter();
      //해당 좌표를 중심으로 편의점 찾기
      ps.categorySearch('CS2', placesSearchWithCategory, {useMapBounds:true, location: coords,radius: radius}); 
      
      
      displayMarker(searchedCenter);
      makeCircle(coords.Ma, coords.La);
    }
  }

  //편의점 찾는 함수 (카테고리 검색)
  function placesSearchWithCategory (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        for (var i=0; i<data.length; i++) {
          displayMarker(data[i]);    
        }
    }
  }



  // 지도에 마커를 표시하는 함수입니다
  function displayMarker(place) {
      var markerPosition = new kakao.maps.LatLng(place.y, place.x);
      var poly = new kakao.maps.Polyline({
        path : [mapCenter, markerPosition]
      });
      var dist = poly.getLength();
      console.log(place);
      console.log(dist);
      if(dist <= radius){
          var marker = new kakao.maps.Marker({
            map: mapi,
            position: markerPosition
        });
        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            console.log(place.place_name);
            infowindow.open(mapi, marker);
        });
      }
  }


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
  }

  return <div id="map" style={{ width: "100vw", height: "100vh" }}></div>;
}

export default MapComponent;