/* global kakao*/
import React, { useEffect } from "react";
import { Polyline, withLeaflet } from "react-leaflet";

function MapComponent() {
  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
      level: 5,
    };

    const infowindow = new kakao.maps.InfoWindow({zIndex:1});

    //map
    const map = new kakao.maps.Map(container, options);
    var mapCenter = map.getCenter();
    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places(map); 

    var radius = 1000;

    ps.categorySearch('CS2', placesSearchCB, {useMapBounds:true}); 

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            for (var i=0; i<data.length; i++) {
              displayMarker(data[i]);    
            }       
        }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
        // 마커를 생성하고 지도에 표시합니다

        var markerPosition = new kakao.maps.LatLng(place.y, place.x);

        var poly = new kakao.maps.Polyline({
          path : [mapCenter, markerPosition]
        });
        var dist = poly.getLength();

        if(dist<radius){
            var marker = new kakao.maps.Marker({
              map: map,
              position: markerPosition
          });

          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'click', function() {
              // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
              infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
              infowindow.open(map, marker);
          });
        }
    }
    kakao.maps.event.addListener(map, 'center_changed', function() {
      mapCenter = map.getCenter();
      ps.categorySearch('CS2', placesSearchCB, {useMapBounds:true}); 

    });

    kakao.maps.event.addListener(map, 'zoom_changed', function() {        
      
    });
    // //마커가 표시 될 위치
    // let markerPosition = new kakao.maps.LatLng(
    //   37.62197524055062,
    //   127.16017523675508
    // );

    // // 마커를 생성
    // let marker = new kakao.maps.Marker({
    //   position: markerPosition,
    // });

    // // 마커를 지도 위에 표시
    // marker.setMap(map);
  };

  return <div id="map" style={{ width: "100vw", height: "100vh" }}></div>;
}

export default MapComponent;