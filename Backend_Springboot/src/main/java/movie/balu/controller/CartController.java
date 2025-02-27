package movie.balu.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import movie.balu.model.Cart;
import movie.balu.service.CartService;

@CrossOrigin(origins = "*")
@RestController
public class CartController {
	 @Autowired
	    private CartService cartService;

	    @GetMapping("/{customerId}")
	    public List<Cart> getCartItems(@PathVariable Long customerId) {
	        return cartService.getCartItems(customerId);
	    }

	    @PostMapping("/add")
	    public Cart addCartItem(@RequestBody Cart cart) {
	        return cartService.addCartItem(cart);
	    }

	    @DeleteMapping("/remove")
	    public void removeCartItem(@RequestParam Long customerId, @RequestParam Long productId) {
	        cartService.removeCartItem(customerId, productId);
	    }

	    @DeleteMapping("/clear/{customerId}")
	    public void clearCart(@PathVariable Long customerId) {
	        cartService.clearCart(customerId);
	    }
}
