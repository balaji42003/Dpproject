package movie.balu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import movie.balu.model.User;

public interface Reposirory extends JpaRepository<User, Integer>{

	User findByUsername(String username);



}
