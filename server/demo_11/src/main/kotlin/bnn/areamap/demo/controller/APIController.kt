package bnn.areamap.demo.controller

import bnn.areamap.demo.dto.AreaDTO
import bnn.areamap.demo.dto.BikeDTO
import bnn.areamap.demo.dto.ShopDTO
import bnn.areamap.demo.service.BikeService
import bnn.areamap.demo.service.ShopService
import lombok.RequiredArgsConstructor
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RequiredArgsConstructor
@RestController
class APIController {
    @Autowired
    private lateinit var shopService: ShopService

    @Autowired
    private lateinit var bikeService: BikeService

    //////////
    // Bike //
    //////////
    @GetMapping("/bike", produces = ["application/json"])
    fun getBikes(@RequestBody areaDTO: AreaDTO?): ResponseEntity<Any> {
        // Get All
        if (areaDTO == null) {
            return ResponseEntity
                .ok()
                .header("Access-Control-Allow-Origin", "*")
                .body(bikeService.getBikes())
        }
        // Get Conditional
        else {
            return ResponseEntity
                .ok()
                .header("Access-Control-Allow-Origin", "*")
                .body(bikeService.getBikesByArea(areaDTO))
        }
    }

    @PostMapping("/bike")
    fun createBike(@RequestBody bikeDTO: BikeDTO): ResponseEntity<Any> {
        bikeService.createBike(bikeDTO)
        return ResponseEntity
            .ok()
            .header("Access-Control-Allow-Origin", "*")
            .body(true)
    }

    @PostMapping("/init-bikes", produces = ["application/json"])
    fun initBikes(@RequestParam("csv") file: MultipartFile): ResponseEntity<List<Any>> {
        val importedEntries = bikeService.uploadCsvFile(file)
        return ResponseEntity.ok(importedEntries)
    }


    //////////
    // Shop //
    //////////
    @GetMapping("/shop", produces = ["application/json"])
    fun getShops(@RequestBody areaDTO: AreaDTO?): ResponseEntity<Any> {
        // Get All
        if (areaDTO == null) {
            return ResponseEntity
                .ok()
                .body(shopService.getShops())
        }
        // Get Conditional
        else {
            return ResponseEntity
                .ok()
                .body(shopService.getShopsByArea(areaDTO))
        }
    }

    @PostMapping("/shop")
    fun createShop(@RequestBody shopDTO: ShopDTO): ResponseEntity<Any> {
        shopService.createShop(shopDTO)
        return ResponseEntity
            .ok()
            .body(true)
    }

    @PostMapping("/init-shops", produces = ["application/json"])
    fun initShops(@RequestParam("csv") file: MultipartFile): ResponseEntity<List<Any>> {
        val importedEntries = shopService.uploadCsvFile(file)
        return ResponseEntity.ok(importedEntries)
    }
}

// http --form --compress POST https://localhost/upload csv@./very-big.csv
