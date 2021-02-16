package bnn.areamap.demo.repository

import lombok.AllArgsConstructor
import lombok.Getter
import lombok.NoArgsConstructor
import lombok.Setter
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Setter
class Ddr {
    @Id
    @GeneratedValue
    private val id: Long? = null

    @Column(nullable = false, length = 100)
    private val name: String? = null

    @Column(nullable = false)
    private val amount: Long? = null
}
