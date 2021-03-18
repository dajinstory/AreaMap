package bnn.areamap.demo.dto

import bnn.areamap.demo.model.Bike
import org.springframework.beans.factory.annotation.Autowired

data class BikeDTO @Autowired constructor(
    val id: Long? = null,
    val place_name: String,
    val city_name: String,
    val road_address_name: String,
    val latitude: Double,
    val longitude: Double,
    val date: String,
    val lcd: Long? = null,
    val qr: Long? = null,
    val type: String
) {
    fun toEntity(): Bike {
        return Bike(
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