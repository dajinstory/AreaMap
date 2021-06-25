package bnn.areamap.demo.model

import bnn.areamap.demo.dto.BikeDTO
import com.opencsv.bean.CsvBindByName
import javax.persistence.*

@Entity
data class Bike(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @CsvBindByName(column = "id")
    val id: Long? = null,
    @CsvBindByName(column = "place_name")
    val place_name: String,
    @CsvBindByName(column = "city_name")
    val city_name: String,
    @CsvBindByName(column = "road_address_name")
    val road_address_name: String,
    @CsvBindByName(column = "latitude")
    val latitude: Double,
    @CsvBindByName(column = "longitude")
    val longitude: Double,
    @CsvBindByName(column = "date")
    val date: String,
    @CsvBindByName(column = "lcd")
    val lcd: Long? = null,
    @CsvBindByName(column = "qr")
    val qr: Long? = null,
    @CsvBindByName(column = "type")
    val type: String
) {
    fun toDTO(): BikeDTO {
        return BikeDTO(
            id = id,
            place_name = place_name,
            city_name = city_name,
            road_address_name = road_address_name,
            latitude = latitude,
            longitude = longitude,
            date = date,
            lcd = lcd,
            qr = qr,
            type = type
        )
    }
}
