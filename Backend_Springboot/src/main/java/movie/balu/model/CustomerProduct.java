package movie.balu.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="CustomerProduct")
public class CustomerProduct {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private int custid;
	private String name;
	private String type;
	private String expiryDate;
	private String description;
	private String custname;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCustid() {
		return custid;
	}
	public void setCustid(int custid) {
		this.custid = custid;
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
	public String getCustname() {
		return custname;
	}
	public void setCustname(String custname) {
		this.custname = custname;
	}
	public CustomerProduct(int id, int custid, String name, String type, String expiryDate, String description,
			String custname) {
		super();
		this.id = id;
		this.custid = custid;
		this.name = name;
		this.type = type;
		this.expiryDate = expiryDate;
		this.description = description;
		this.custname = custname;
	}
	public CustomerProduct() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Override
	public String toString() {
		return "CustomerProduct [id=" + id + ", custid=" + custid + ", name=" + name + ", type=" + type
				+ ", expiryDate=" + expiryDate + ", description=" + description + ", custname=" + custname + "]";
	}
	
	
}
