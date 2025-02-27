package movie.balu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import movie.balu.model.Product;

@Repository
public interface ProductRepo  extends JpaRepository<Product, Integer>{

}
