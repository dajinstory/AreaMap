package bnn.areamap.demo.repository

import bnn.areamap.demo.model.Bike
import org.springframework.data.repository.CrudRepository

interface BikeRepository : CrudRepository<Bike, Long> {
    override fun findAll(): List<Bike>
    fun findBikesByLatitudeGreaterThanAndLatitudeLessThanAndLongitudeGreaterThanAndLongitudeLessThan(
        latitude1: Double,
        latitude2: Double,
        longitude1: Double,
        longitude2: Double
    ): List<Bike>
}
