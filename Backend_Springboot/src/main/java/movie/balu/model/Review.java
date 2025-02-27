package movie.balu.model;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@Component
public class Review {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private int id;
	private String movieName;
	private String movieGenre;
	private int moviePoints;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMovieName() {
		return movieName;
	}
	public void setMovieName(String movieName) {
		this.movieName = movieName;
	}
	public String getMovieGenre() {
		return movieGenre;
	}
	public void setMovieGenre(String movieGenre) {
		this.movieGenre = movieGenre;
	}
	public int getMoviePoints() {
		return moviePoints;
	}
	public void setMoviePoints(int moviePoints) {
		this.moviePoints = moviePoints;
	}
	public Review(int id, String movieName, String movieGenre, int moviePoints) {
		super();
		this.id = id;
		this.movieName = movieName;
		this.movieGenre = movieGenre;
		this.moviePoints = moviePoints;
	}
	public Review() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "Review [id=" + id + ", movieName=" + movieName + ", movieGenre=" + movieGenre + ", moviePoints="
				+ moviePoints + "]";
	}
	

}
