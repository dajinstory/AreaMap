package bnn.areamap.demo.controller

import bnn.areamap.demo.repository.DdrResponseDto
import bnn.areamap.demo.repository.DdrRepository
import lombok.RequiredArgsConstructor
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RequiredArgsConstructor
@RestController
class APIController {
    private final DdrRepository ddrRepository

    @GetMapping("/ddr")
    public DdrResponseDto ddr(String name, int amount)
    {
        return DdrResponseDto (name, amount)
    }
}
