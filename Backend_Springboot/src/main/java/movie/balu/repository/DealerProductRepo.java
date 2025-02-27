package movie.balu.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import movie.balu.model.DealerProduct;

@Repository
public interface DealerProductRepo extends JpaRepository<DealerProduct, Integer> {

	List<DealerProduct> findByDealerId(int dealerId);

	@Query("SELECT dp FROM DealerProduct dp WHERE dp.expiryDate < :currentDateString")
	List<DealerProduct> findExpiredProducts(@Param("currentDateString") String currentDateString);

}
