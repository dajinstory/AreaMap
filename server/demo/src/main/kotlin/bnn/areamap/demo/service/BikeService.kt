package bnn.areamap.demo.service

import bnn.areamap.demo.dto.AreaDTO
import bnn.areamap.demo.dto.BikeDTO
import bnn.areamap.demo.model.Bike
import bnn.areamap.demo.repository.BikeRepository

import com.opencsv.bean.CsvToBean
import com.opencsv.bean.CsvToBeanBuilder
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.multipart.MultipartFile
import java.io.BufferedReader
import java.io.IOException
import java.io.InputStreamReader

@Component
class BikeService {
    @Autowired
    lateinit var bikeRepository: BikeRepository


    // GET bike
    fun getBikes(): List<BikeDTO> {
        val bikes = bikeRepository.findAll()
        return bikes.map { it.toDTO() }
    }
    fun getBikesByArea(areaDTO: AreaDTO): List<BikeDTO> {
        val area = areaDTO.toEntity()
        val latitude = area.latitude.toDouble()
        val longitude = area.longitude.toDouble()
        val dist_w = area.dist_w.toDouble()
        val dist_h = area.dist_h.toDouble()
        val bikes = bikeRepository.findBikesByLatitudeGreaterThanAndLatitudeLessThanAndLongitudeGreaterThanAndLongitudeLessThan(latitude-dist_h, latitude+dist_h, longitude-dist_w, longitude+dist_w)
        return bikes.map { it.toDTO() }
    }

    // POST bike
    @Transactional
    fun createBike(bikeDTO: BikeDTO) : BikeDTO {
        val bike = bikeRepository.save(bikeDTO.toEntity())
        return bike.toDTO()
    }

    // INIT bike
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    class BadRequestException(msg: String) : RuntimeException(msg)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    class CsvImportException(msg: String) : RuntimeException(msg)

    private fun throwIfFileEmpty(file: MultipartFile) {
        if (file.isEmpty)
            throw BadRequestException("Empty file")
    }
    private fun createCSVToBean(fileReader: BufferedReader?): CsvToBean<Bike> =
        CsvToBeanBuilder<Bike>(fileReader)
            .withType(Bike::class.java)
            .withIgnoreLeadingWhiteSpace(true)
            .build()
    private fun closeFileReader(fileReader: BufferedReader?) {
        try {
            fileReader!!.close()
        } catch (ex: IOException) {
            throw CsvImportException("Error during csv import")
        }
    }
    fun uploadCsvFile(file: MultipartFile): List<Bike> {
        throwIfFileEmpty(file)
        var fileReader: BufferedReader? = null
        try {
            fileReader = BufferedReader(InputStreamReader(file.inputStream))
            val csvToBean = createCSVToBean(fileReader)
            val bikes: List<Bike> = csvToBean.parse()
            bikes.map { bikeRepository.save(it) }
            return bikes
        } catch (ex: Exception) {
            throw CsvImportException("Error during csv import")
        } finally {
            closeFileReader(fileReader)
        }
    }
}