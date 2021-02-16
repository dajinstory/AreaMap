package bnn.areamap.demo.repository

import lombok.Getter
import lombok.RequiredArgsConstructor

@Getter
@RequiredArgsConstructor
class DdrResponseDto {
    private val name: String = "NONE"
    private val amount = 0
}