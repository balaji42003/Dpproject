package movie.balu.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import movie.balu.service.EmailService;

@Component
public class EmailScheduler {

    @Autowired
    private EmailService emailService;

    @Scheduled(cron = "0 */2 * * * ?")// Runs daily at midnight
    public void scheduleEmailSending() {
        System.out.println("Scheduler triggered: Sending expiry reminder emails...");
        emailService.sendExpiryReminderEmails();
    }
}
