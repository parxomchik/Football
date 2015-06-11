package com.websolutions.football3x3.util;

import org.apache.commons.mail.HtmlEmail;

import javax.inject.Named;
import java.util.Collections;
import java.util.List;

/**
 * Created by Владислав on 11.06.2015.
 */
@Named
public class EmailService {
    private static final String GMAIL_LOGIN = "itfootball3x3@gmail.com";
    private static final String GMAIL_PASSWORD = "blablabla32";


    public void sendNotificationAboutNewTeam(String managerEmail) {
        String text = "<html>Hey, new team created</html>";
        sendEmail(text, "New team", Collections.singletonList(managerEmail));
    }

    private void sendEmail(String content, String subject, List<String> sendTos) {
        try {
            // Create the email message
            HtmlEmail email = new HtmlEmail();
            email.setAuthentication(GMAIL_LOGIN, GMAIL_PASSWORD);
            email.setHostName("smtp.gmail.com");
            email.setSmtpPort(587);
            email.setStartTLSEnabled(true);
            for (String sendTo : sendTos) {
                email.addTo(sendTo, "");
            }
            email.setFrom(GMAIL_LOGIN, "football3x3.ua");
            email.setSubject(subject);

            // set the html message
            email.setHtmlMsg(content);

            // set the alternative message
            email.setTextMsg("Your email client does not support HTML messages");

            // send the email
            email.send();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
