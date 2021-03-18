package bnn.areamap.demo.service

import bnn.areamap.demo.dto.AreaDTO
import bnn.areamap.demo.dto.ShopDTO
import bnn.areamap.demo.model.Shop

import bnn.areamap.demo.repository.ShopRepository
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
class ShopService {
    @Autowired
    lateinit var shopRepository: ShopRepository


    // GET Shop
    fun getShops(): List<ShopDTO> {
        val shops = shopRepository.findAll()
        return shops.map { it.toDTO() }
    }

    fun getShopsByArea(areaDTO: AreaDTO): List<ShopDTO> {
        val area = areaDTO.toEntity()
        val latitude = area.latitude
        val longitude = area.longitude
        val dist_w = area.dist_w
        val dist_h = area.dist_h
        val shops =
            shopRepository.findAllByLatitudeGreaterThanAndLatitudeLessThanAndLongitudeGreaterThanAndLongitudeLessThan(
                latitude - dist_h,
                latitude + dist_h,
                longitude - dist_w,
                longitude + dist_w
            )
        return shops.map { it.toDTO() }
    }

    // POST Shop
    @Transactional
    fun createShop(shopDTO: ShopDTO): ShopDTO {
        val shop = shopRepository.save(shopDTO.toEntity())
        return shop.toDTO()
    }

    // INIT Shop
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    class BadRequestException(msg: String) : RuntimeException(msg)

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    class CsvImportException(msg: String) : RuntimeException(msg)

    private fun throwIfFileEmpty(file: MultipartFile) {
        if (file.isEmpty)
            throw BadRequestException("Empty file")
    }

    private fun createCSVToBean(fileReader: BufferedReader?): CsvToBean<Shop> =
        CsvToBeanBuilder<Shop>(fileReader)
            .withType(Shop::class.java)
            .withIgnoreLeadingWhiteSpace(true)
            .build()

    private fun closeFileReader(fileReader: BufferedReader?) {
        try {
            fileReader!!.close()
        } catch (ex: IOException) {
            throw CsvImportException("Error during csv import")
        }
    }

    fun uploadCsvFile(file: MultipartFile): List<Shop> {
        throwIfFileEmpty(file)
        var fileReader: BufferedReader? = null
        try {
            fileReader = BufferedReader(InputStreamReader(file.inputStream))
            val csvToBean = createCSVToBean(fileReader)
            val shops: List<Shop> = csvToBean.parse()
            shops.map { shopRepository.save(it) }
            return shops
        } catch (ex: Exception) {
            throw CsvImportException("Error during csv import")
        } finally {
            closeFileReader(fileReader)
        }
    }
}