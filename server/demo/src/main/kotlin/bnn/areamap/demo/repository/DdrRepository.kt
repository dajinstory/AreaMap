package bnn.areamap.demo.repository

import org.springframework.data.jpa.repository.JpaRepository

interface DdrRepository : JpaRepository<Ddr?, Long?> {
    override fun findAll(): List<Ddr?>
}
