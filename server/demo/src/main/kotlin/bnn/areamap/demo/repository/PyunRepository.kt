package bnn.areamap.demo.repository

import bnn.areamap.demo.model.Pyun
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.CrudRepository

//interface PyunRepository : JpaRepository<Pyun, Long> {
interface PyunRepository : CrudRepository<Pyun, Long> {
    override fun findAll(): List<Pyun>
}
