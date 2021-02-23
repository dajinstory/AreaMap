package bnn.areamap.demo.service

import bnn.areamap.demo.dto.PyunCreateDTO
import bnn.areamap.demo.dto.PyunReadDTO
import bnn.areamap.demo.repository.PyunRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional

@Component
class PyunService {
    @Autowired
    lateinit var pyunRepository: PyunRepository

    fun getPyuns(): List<PyunReadDTO> {
        val pyuns = pyunRepository.findAll()
        return pyuns.map { it.toReadDTO() }
    }

    @Transactional
    fun createPyun(pyunCreateDTO: PyunCreateDTO) : PyunCreateDTO {
        val pyun = pyunRepository.save(pyunCreateDTO.toEntity())
        return pyun.toCreateDTO()
    }
}