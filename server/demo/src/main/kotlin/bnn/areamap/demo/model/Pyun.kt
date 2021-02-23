package bnn.areamap.demo.model

import bnn.areamap.demo.dto.PyunCreateDTO
import bnn.areamap.demo.dto.PyunReadDTO
import javax.persistence.*

@Entity
data class Pyun (
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    val name: String = "None",
    val latitude: Double,
    val longitude: Double
) {
    fun toReadDTO() : PyunReadDTO {
        return PyunReadDTO(
            id = id,
            name = name,
            latitude = latitude,
            longitude = longitude
        )
    }
    fun toCreateDTO() : PyunCreateDTO {
        return PyunCreateDTO(
            name = name,
            latitude = latitude,
            longitude = longitude
        )
    }
}
