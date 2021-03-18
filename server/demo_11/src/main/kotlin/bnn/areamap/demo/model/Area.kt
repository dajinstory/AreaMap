package bnn.areamap.demo.model

import bnn.areamap.demo.dto.AreaDTO

data class Area(
    val latitude: Double,
    val longitude: Double,
    val dist_w: Double,
    val dist_h: Double
) {
    fun toDTO(): AreaDTO {
        return AreaDTO(
            latitude = latitude,
            longitude = longitude,
            dist_w = dist_w,
            dist_h = dist_h
        )
    }
}
