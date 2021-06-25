package bnn.areamap.demo.model

import bnn.areamap.demo.dto.ShopDTO
import com.opencsv.bean.CsvBindByName
import javax.persistence.*

@Entity
data class Shop(
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

    ) {
    fun toDTO(): ShopDTO {
        return ShopDTO(
            id = id,
            place_name = place_name,
            city_name = city_name,
            road_address_name = road_address_name,
            latitude = latitude,
            longitude = longitude
        )
    }
}
