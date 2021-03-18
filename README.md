# AreaMap
- Advanced Map API
- X-area

### Server
- kotlin
- spring
- command
```
./gradlew bootRun
```
- 따릉이 초기화
```
http -f post localhost:47000/init_bikes csv@./bikes.csv
```
- 따릉이 추가
```
http -v post localhost:47000/bike latitude=1.0 longitude=1.0 place_name=집건너편 city_name=서울시 road_address_name=도로명주소 date=1997/04/07  lcd=1 qr=1 type=lcd
```
- 따릉이 조회
```
http -v get localhost:47000/bike
http -v get localhost:47000/bike latitude=1.0 longitude=1.0 dist_w=1.0 dist_h=1.0
```


- 편의점 추가
```
http -v post localhost:47000/shop latitude=1.0 longitude=1.0 place_name=집건너편 city_name=서울시 road_address_name=도로명주소
```
- 편의점 조회
```
http -v get localhost:47000/shop
http -v get localhost:47000/shop latitude=1.0 longitude=1.0 dist_w=1.0 dist_h=1.0
```
