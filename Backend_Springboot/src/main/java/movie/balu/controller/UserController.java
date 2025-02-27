package movie.balu.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import movie.balu.model.CustomerProduct;
import movie.balu.model.DealerLogin;
import movie.balu.model.DealerProduct;
import movie.balu.model.Product;
import movie.balu.model.User;
import movie.balu.service.UserService;

@CrossOrigin(origins = "*")
@RestController
public class UserController {

	@Autowired
	private UserService service;
	@PostMapping("/register")
	public ResponseEntity<?> saveuser(@RequestBody User user){
		User saved = service.SaveUser(user);
		if(saved != null) {
			return new ResponseEntity<>("User Registerd Successfully",HttpStatus.CREATED);
		}
		
		else {
			return new ResponseEntity<>("some error",HttpStatus.BAD_REQUEST);
		}
	}
	@PostMapping("/registerdealer")
	public ResponseEntity<?> saveDealer(@RequestBody DealerLogin dealer){
		DealerLogin saved = service.SaveDealer(dealer);
		if(saved != null) {
			return new ResponseEntity<>("Dealer Registerd Successfully",HttpStatus.CREATED);
		}
		
		else {
			return new ResponseEntity<>("some error",HttpStatus.BAD_REQUEST);
		}
	}
	
//	public String Login(@RequestBody User user) {
//		return service.validate(user);
//	}
	@PostMapping("/login")
	public ResponseEntity<?> Login(@RequestBody User user){
		User isvalid = service.validate(user);
		if(isvalid != null) {
			return ResponseEntity.ok(Collections.singletonMap("id", isvalid.getId()));
		}else {
			return new ResponseEntity<>("no user found",HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@PostMapping("/logindealer")
	public ResponseEntity<?> LoginDealer(@RequestBody DealerLogin dealer){
		DealerLogin isvalid = service.validateDealer(dealer);
		if(isvalid != null) {
			return ResponseEntity.ok(Collections.singletonMap("dealerid", isvalid.getId()));
		}else {
			return new ResponseEntity<>("no user found",HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@PostMapping("/addDealerProduct")
	public ResponseEntity<?> SaveReviewApi(@RequestBody DealerProduct dealerproduct){
		
		DealerProduct rev1 = service.saveDealerProduct(dealerproduct);
		if(rev1 != null) {
			return new ResponseEntity<>("Review Saved",HttpStatus.ACCEPTED);
		}else {
			return new ResponseEntity<>("Not saved",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	
	@GetMapping("/getdealerproduct/{dealerId}")
	public ResponseEntity<List<DealerProduct>> getAllProducts(@PathVariable("dealerId") int dealerid){
		List<DealerProduct> products = service.getAllProducts(dealerid);
		if(!products.isEmpty()) {
			return new ResponseEntity<>(products,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable("id") int id){
		
		boolean deleted = service.deleteProduct(id);
		if(deleted) {
			return new ResponseEntity<>("Deleted Successfully",HttpStatus.OK);
		}else {
			return new  ResponseEntity<>("product not found",HttpStatus.NOT_FOUND);
		}
		
	}
	
	
	@PostMapping("/addCustomerProduct")
	public ResponseEntity<?> SaveCustomerProduct(@RequestBody CustomerProduct customerproduct){
		
		CustomerProduct rev1 = service.CustomerProduct(customerproduct);
		if(rev1 != null) {
			return new ResponseEntity<>("Review Saved",HttpStatus.ACCEPTED);
		}else {
			return new ResponseEntity<>("Not saved",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@GetMapping("/getcustomerproduct/{custid}")
	public ResponseEntity <List<CustomerProduct>> sendCustomerData( @PathVariable("custid") int custid){
		List<CustomerProduct> prod = service.getProductByCustid(custid);
		if(prod != null) {
			return new ResponseEntity<>(prod,HttpStatus.ACCEPTED);
		}else {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/getcustomerproducts")
	public ResponseEntity<List<CustomerProduct>> getAllCustomerProducts(){
		List<CustomerProduct> products = service.getAllCustomerProducts();
		if(!products.isEmpty()) {
			return new ResponseEntity<>(products,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
	}
	
	 @PostMapping("/sellproduct")
	    public ResponseEntity<?> addProduct(@RequestPart Product product, @RequestPart MultipartFile imageFile) {

	        try {
	            System.out.println(product);
	            Product product1 = service.addProduct(product, imageFile);
	            return new ResponseEntity<>(product1, HttpStatus.CREATED);
	        }
	        catch (Exception e) {
	            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	 
	 @GetMapping("/api/products")
	    public ResponseEntity<List<Product>> getAllProducts(){
	        return new ResponseEntity<List<Product>>(service.getAllProducts(),HttpStatus.OK);
	    }
	 @GetMapping("/product/{productId}/image")
	    public ResponseEntity<byte[]> getImageByProductId(@PathVariable int productId){

	        Product product = service.getProductById(productId);
	        byte[] imageFile = product.getImageDate();

	        return ResponseEntity.ok()
	                .contentType(MediaType.valueOf(product.getImageType("")))
	                .body(imageFile);
	    }
	
//	@GetMapping("/reviews")
//	public ResponseEntity<List<Review>> getAllReviews(){
//		List<Review> reviews = service.getAllReviews();
//		if(!reviews.isEmpty()) {
//			return new ResponseEntity<>(reviews,HttpStatus.OK);
//		} else {
//			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//		}
//	}
//	@PutMapping("/reviews/{id}")
//	public ResponseEntity<Review> updateReview(@PathVariable Integer id, @RequestBody Review review) {
//	    Review updatedReview = service.updateReview(id, review);
//	    return updatedReview != null ? ResponseEntity.ok(updatedReview)
//	            : ResponseEntity.notFound().build();
//	}
//	
//	
//	@DeleteMapping("/delete/{id}")
//	public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
//	    boolean isDeleted = service.deleteReview(id);
//	    
//	    if (isDeleted) {
//	        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
//	    } else {
//	        return new ResponseEntity<>("User not found with ID: " + id, HttpStatus.NOT_FOUND);
//	    }
//	}

	
}
