package bnn.areamap.demo.controller

import bnn.areamap.demo.dto.PyunCreateDTO
import bnn.areamap.demo.service.PyunService
import lombok.RequiredArgsConstructor
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RequiredArgsConstructor
@RestController
class PyunController {
    @Autowired
    private lateinit var pyunService: PyunService

    @GetMapping("/test")
    fun test(text1:String, text2:String):String
    {
        //http://localhost:8080/test?text1=hello&text2=world
        return text1 + " and " + text2
    }

    
    @GetMapping("/pyuns", produces = ["application/json"])
    fun getPyuns(): ResponseEntity<Any> {
        return ResponseEntity
            .ok()
            .body(pyunService.getPyuns())
    }

    @PostMapping("/pyun")
    fun createPyun(@RequestBody pyunCreateDTO: PyunCreateDTO): ResponseEntity<Any> {
        pyunService.createPyun(pyunCreateDTO)
        return ResponseEntity
            .ok()
            .body(true)
    }
}
