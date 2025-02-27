package movie.balu.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import movie.balu.model.Cart;
import movie.balu.repository.CartRepository;

@Service
public class CartService {
	
	 @Autowired
	    private CartRepository cartRepository;

	    public List<Cart> getCartItems(Long customerId) {
	        return cartRepository.findByCustomerId(customerId);
	    }

	    public Cart addCartItem(Cart cart) {
	        return cartRepository.save(cart);
	    }

	    public void removeCartItem(Long customerId, Long productId) {
	        cartRepository.deleteByCustomerIdAndProductId(customerId, productId);
	    }

	    public void clearCart(Long customerId) {
	        List<Cart> cartItems = cartRepository.findByCustomerId(customerId);
	        cartRepository.deleteAll(cartItems);
	    }

}
