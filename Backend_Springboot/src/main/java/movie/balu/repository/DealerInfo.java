package movie.balu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import movie.balu.model.DealerLogin;

@Repository

public interface DealerInfo extends JpaRepository<DealerLogin, Integer>{

	DealerLogin findByUsername(String username);

}
