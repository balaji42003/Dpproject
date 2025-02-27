package movie.balu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import movie.balu.model.Review;

public interface Reviews extends JpaRepository<Review, Integer> {

}
