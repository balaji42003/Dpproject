package movie.balu.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import movie.balu.model.CustomerProduct;

@Repository
public interface CustomerProductRepo  extends JpaRepository<CustomerProduct, Integer>{

	List<CustomerProduct> findByCustid( int custid);

}
