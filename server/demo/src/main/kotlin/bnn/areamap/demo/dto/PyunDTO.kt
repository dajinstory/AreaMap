package bnn.areamap.demo.dto

import bnn.areamap.demo.model.Pyun
import lombok.Getter
import org.springframework.beans.factory.annotation.Autowired

data class PyunReadDTO @Autowired constructor(
    val id: Long? = null,
    val name: String,
    val latitude: Double,
    val longitude: Double
)

data class PyunCreateDTO @Autowired constructor(
    val name: String,
    val latitude: Double,
    val longitude: Double
) {
    fun toEntity(): Pyun {
        return Pyun(
            name = name,
            latitude = latitude,
            longitude = longitude
        )
    }
}

