package movie.balu.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name="DealerProduct")
public class DealerProduct {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int dealerId;
	private String name;
	private String type;
	private String expiryDate;
	private String description;
	private Double price;
	private String customerName;
	private String customerPhone;
	private String customerEmail;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getDealerId() {
		return dealerId;
	}
	public void setDealerId(int dealerId) {
		this.dealerId = dealerId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getCustomerPhone() {
		return customerPhone;
	}
	public void setCustomerPhone(String customerPhone) {
		this.customerPhone = customerPhone;
	}
	public String getCustomerEmail() {
		return customerEmail;
	}
	public void setCustomerEmail(String customerEmail) {
		this.customerEmail = customerEmail;
	}
	public DealerProduct(int id, int dealerId, String name, String type, String expiryDate, String description,
			Double price, String customerName, String customerPhone, String customerEmail) {
		super();
		this.id = id;
		this.dealerId = dealerId;
		this.name = name;
		this.type = type;
		this.expiryDate = expiryDate;
		this.description = description;
		this.price = price;
		this.customerName = customerName;
		this.customerPhone = customerPhone;
		this.customerEmail = customerEmail;
	}
	public DealerProduct() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "DealerProduct [id=" + id + ", dealerId=" + dealerId + ", name=" + name + ", type=" + type
				+ ", expiryDate=" + expiryDate + ", description=" + description + ", price=" + price + ", customerName="
				+ customerName + ", customerPhone=" + customerPhone + ", customerEmail=" + customerEmail + "]";
	}
	
	
}
