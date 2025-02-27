package movie.balu.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import movie.balu.model.CustomerProduct;
import movie.balu.model.DealerLogin;
import movie.balu.model.DealerProduct;
import movie.balu.model.Product;
import movie.balu.model.Review;
import movie.balu.model.User;
import movie.balu.repository.CustomerProductRepo;
import movie.balu.repository.DealerInfo;
import movie.balu.repository.DealerProductRepo;
import movie.balu.repository.ProductRepo;
import movie.balu.repository.Reposirory;
import movie.balu.repository.Reviews;

@Service
public class UserService {

	
	@Autowired
	private Reposirory repo;
	@Autowired
	private Reviews revrepo;
	@Autowired
	private DealerProductRepo drepo;
	@Autowired
	private CustomerProductRepo crepo;
	@Autowired
	private DealerInfo dlrepo;
	@Autowired
	private ProductRepo pdrepo;
	

	public User SaveUser(User user) {
        
        return repo.save(user);
	}
	public DealerLogin SaveDealer(DealerLogin dealer) {
		// TODO Auto-generated method stub
		return dlrepo.save(dealer);
	}

	public User validate(User user) {
	    User existingUser = repo.findByUsername(user.getUsername());
	    if( existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
	    	return existingUser;
	    }
	    
	    return null;
	}
	public DealerLogin validateDealer(DealerLogin dealer) {
		DealerLogin existingUser = dlrepo.findByUsername(dealer.getUsername());
	    if( existingUser != null && existingUser.getPassword().equals(dealer.getPassword())) {
	    	return existingUser;
	    }
	    
	    return null;
	}
	
	public DealerProduct saveDealerProduct(DealerProduct dealerproduct) {
		// TODO Auto-generated method stub
		return drepo.save(dealerproduct);
	}

	public boolean deleteProduct(int id) {
		if(drepo.existsById(id)) {
			drepo.deleteById(id);
			return true;
		}
		return false;
	}

	public CustomerProduct CustomerProduct(CustomerProduct customerproduct) {
		// TODO Auto-generated method stub
		return crepo.save(customerproduct);
	}

	public List<CustomerProduct> getProductByCustid(int custid) {
		// TODO Auto-generated method stub
		return crepo.findByCustid(custid);
	}

	public List<CustomerProduct> getAllCustomerProducts() {
		// TODO Auto-generated method stub
		return crepo.findAll();
	}
	public List<DealerProduct> getAllProducts(int dealerId) {
		// TODO Auto-generated method stub
		return drepo.findByDealerId(dealerId);
	}
	public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageDate(imageFile.getBytes());
        return pdrepo.save(product);
    }
	public List<Product> getAllProducts() {
		// TODO Auto-generated method stub
		return pdrepo.findAll();
	}
	public Product getProductById(int productId) {
		// TODO Auto-generated method stub
		return pdrepo.findById(productId).orElse(null);
	}
	

	

//	public List<Review> getAllReviews() {
//		return revrepo.findAll();
//		
//	}
//
//	public Review updateReview(Integer id, Review review) {
//		Review existingReview = revrepo.findById(id).orElse(null);
//
//        if (existingReview != null) {
//            // If review is found, update its fields
//            existingReview.setMovieName(review.getMovieName());
//            existingReview.setMovieGenre(review.getMovieGenre());
//            existingReview.setMoviePoints(review.getMoviePoints());
//
//            // Save the updated review
//            return revrepo.save(existingReview);
//        }
//		return null;
//	}
//
//	public boolean deleteReview(Integer id) {
//	    if (revrepo.existsById(id)) {
//	        revrepo.deleteById(id);
//	        return true; // User successfully deleted
//	    } else {
//	        return false; // User with ID not found
//	    }
//	}

	

	

}
