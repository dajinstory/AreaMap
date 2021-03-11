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
      await displayMarker(searchedCenter);
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
  return <div id="map" style={{ width: "100vw", height: "100vh" }}></div>;
}

export default MapComponent;