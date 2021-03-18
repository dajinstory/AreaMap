package bnn.areamap.demo.repository

import bnn.areamap.demo.model.Shop
import org.springframework.data.repository.CrudRepository

interface ShopRepository : CrudRepository<Shop, Long> {
    override fun findAll(): List<Shop>
    fun findAllByLatitudeGreaterThanAndLatitudeLessThanAndLongitudeGreaterThanAndLongitudeLessThan(
        latitude1: Double,
        latitude2: Double,
        longitude1: Double,
        longitude2: Double
    ): List<Shop>
}
