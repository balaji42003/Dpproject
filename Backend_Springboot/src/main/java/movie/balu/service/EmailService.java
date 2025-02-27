package movie.balu.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter; // Imported for formatting the date
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import movie.balu.model.DealerProduct;
import movie.balu.repository.DealerProductRepo;

@Service
public class EmailService {

    @Autowired
    private DealerProductRepo dealerProductRepo;

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendExpiryReminderEmails() {
        // Format the current date as a string in 'yyyy-MM-dd' format
        String currentDateString = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")); // Changed from LocalDate to formatted String

        // Pass the formatted date string to the repository
        List<DealerProduct> expiredProducts = dealerProductRepo.findExpiredProducts(currentDateString); // Updated to pass a String instead of LocalDate

        for (DealerProduct product : expiredProducts) {
            String customerEmail = product.getCustomerEmail();
            if (customerEmail != null && !customerEmail.isEmpty()) {
                sendEmail(customerEmail, "Expiry Reminder", "Your product '" + product.getName() + "' has expired.");
            }
        }
    }

    private void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        javaMailSender.send(message);
    }
}