package com.websolutions.football3x3.util;

import com.websolutions.football3x3.entity.Player;
import com.websolutions.football3x3.entity.Team;
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


    public void sendNotificationAboutNewTeam(Team team,String managerEmail) {
       StringBuilder text = new StringBuilder("<html lang=\"en\">\n").append(
               "  <head>\n<meta charset=\"utf-8\">\n<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n</head>\n")
               .append("<body>Господин!\n")
               .append("<h3>В лиге " + team.getLeague() +" зарегистрирована новая команда.</h3>\n")
               .append("<table>\n<tr>\n<td style=\"font-weight: bold;\">Имя:</td>\n")
               .append("<td>"+team.getName()+"</td>\n</tr>\n")
               .append("<tr>\n<td style=\"font-weight: bold;\">Компания:</td>\n")
               .append("<td>"+team.getCompany()+"</td>\n</tr>\n")
               .append("<tr>\n<td style=\"font-weight: bold;\">Сайт:</td>\n")
               .append("<td>"+ team.getWebsite() +"</td>\n</tr>\n")
               .append("<tr>\n<td style=\"font-weight: bold;\">Тел.:</td>\n")
               .append("<td>"+team.getTelephone()+"</td>\n</tr>\n")
               .append("<tr>\n<td style=\"font-weight: bold;\">email:</td>\n")
               .append("<td>" +team.getEmail()+ "</td>\n</tr>\n</table>")
               .append("<h4>Игроки:</h4>\n<ul>\n");
                for (Player p:team.getPlayers()) {
                    text.append("<li>");
                    text.append(p.getName() + " ");
                    text.append(p.getSurname() + "     ");
                    text.append(p.getRole() + " ");
                    if (p.isCaptain()) {
                        text.append("(капитан)");
                    }
                    text.append("</li>");
                }
                text.append("</ul></body></html>");


        sendEmail(text.toString(), "New team", Collections.singletonList(managerEmail));



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
