package bnn.areamap.demo.dto

import bnn.areamap.demo.model.Area
import org.springframework.beans.factory.annotation.Autowired

data class AreaDTO @Autowired constructor(
    val latitude: Double,
    val longitude: Double,
    val dist_w: Double,
    val dist_h: Double
) {
    fun toEntity(): Area {
        return Area(
            latitude = latitude,
            longitude = longitude,
            dist_w = dist_w,
            dist_h = dist_h
        )
    }
}
