package bnn.areamap.demo.dto

import bnn.areamap.demo.model.Shop
import org.springframework.beans.factory.annotation.Autowired

data class ShopDTO @Autowired constructor(
    val id: Long? = null,
    val place_name: String,
    val city_name: String,
    val road_address_name: String,
    val latitude: Double,
    val longitude: Double
) {
    fun toEntity(): Shop {
        return Shop(
            place_name = place_name,
            city_name = city_name,
            road_address_name = road_address_name,
            latitude = latitude,
            longitude = longitude
        )
    }
}