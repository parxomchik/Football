package com.websolutions.football3x3.util;

import com.websolutions.football3x3.entity.Feedback;
import com.websolutions.football3x3.entity.Player;
import com.websolutions.football3x3.entity.Team;
import org.apache.commons.mail.HtmlEmail;

import javax.inject.Named;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.List;

/**
 * Created by Владислав on 11.06.2015.
 */
@Named
public class EmailService {
    private static final String GMAIL_LOGIN = "itfootball3x3@gmail.com";
    private static final String GMAIL_PASSWORD = "rhzhmfutcuvjfyfr";


    public void sendManagerNotificationAboutNewTeam(Team team, String managerEmail) {
        StringBuilder text = new StringBuilder("<html lang=\"en\">\n").append(
                "  <head>\n<meta charset=\"utf-8\">\n<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n</head>\n")
                .append("<body>Господин!\n")
                .append("<h3>В лиге " + team.getLeague() + " зарегистрирована новая команда.</h3>\n")
                .append("<table>\n<tr>\n<td style=\"font-weight: bold;\">Имя:</td>\n")
                .append("<td>" + team.getName() + "</td>\n</tr>\n")
                .append("<tr>\n<td style=\"font-weight: bold;\">Компания:</td>\n")
                .append("<td>" + team.getCompany() + "</td>\n</tr>\n")
                .append("<tr>\n<td style=\"font-weight: bold;\">Сайт:</td>\n")
                .append("<td>" + team.getWebsite() + "</td>\n</tr>\n")
                .append("<tr>\n<td style=\"font-weight: bold;\">Тел.:</td>\n")
                .append("<td>" + team.getTelephone() + "</td>\n</tr>\n")
                .append("<tr>\n<td style=\"font-weight: bold;\">email:</td>\n")
                .append("<td>" + team.getEmail() + "</td>\n</tr>\n</table>")
                .append("<h4>Игроки:</h4>\n<ul>\n");
        for (Player p : team.getPlayers()) {
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

        sendEmail(text.toString(), "Новая команда", Collections.singletonList(managerEmail));
    }

    public void sendManagerPaymentNotification(Team team, String managerEmail) {
        StringBuilder text = new StringBuilder("<html lang=\"en\">\n").append(
                "  <head>\n<meta charset=\"utf-8\">\n<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n</head>\n")
                .append("<body>Господин! У нас пополнение в казне.<br/>")
                .append("Команда ").append("<b>" + team.getName() + "</b>").append(" из лиги ").append(team.getLeague().toString()).append(" оплатила участие в чемпионате.<br/>")
                .append("Да благословит их дух Футбольного Короля!")
                .append("</body></html>");

        sendEmail(text.toString(), "Оплата", Collections.singletonList(managerEmail));
    }

    public void sendManagerFeedbackNotification(Feedback feedback, String managerEmail) {
        StringBuilder text = new StringBuilder("<html lang=\"en\">\n").append(
                "  <head><meta charset=\"utf-8\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"></head>")
                .append("<body>Господин! У вас новое уведомление.<br/>")
                .append("<table><tr><td style=\"font-weight: bold;\">От кого:</td>")
                .append("<td>" + feedback.getName() + "</td></tr>");
        if (feedback.getSubject() != null && !("".equals(feedback.getSubject()))) {
            text.append("<tr><td style=\"font-weight: bold;\">Тема:</td>")
                    .append("<td>" + feedback.getSubject() + "</td></tr>");
        }
        text.append("<tr><td style=\"font-weight: bold;\">Дата:</td>")
                .append("<td>" + new SimpleDateFormat("dd.MM.yyyy hh:mm").format(feedback.getDate()) + "</td></tr>")
                .append("<tr><td style=\"font-weight: bold;\">email:</td>")
                .append("<td>" + feedback.getEmail() + "</td></tr></table>")
                .append("<br/>")
                .append(feedback.getMessage())
                .append("</body></html>");

        sendEmail(text.toString(), "Новое уведомление", Collections.singletonList(managerEmail));
    }

    public void sendNotificationToCaptain(Team team) {
        StringBuilder text = new StringBuilder("<html lang=\"en\">\n").append(
                "  <head>\n<meta charset=\"utf-8\">\n<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n</head>\n")
                .append("<body><table>")
                .append("<tr><td>")
                .append("Уважаемый ").append(team.getCaptain().getName()).append(" ").append(team.getCaptain().getSurname()).append(",</td></tr>")
                .append("<tr><td>")
                .append("Вы успешно прошли первые два этапа регистрации вашей команды на StartUpfootball3x3Cup.<br/>")
                .append("Ознакомьтесь с регламентом проведения чемпионата, схемой розыгрыша а также графиком дня в приложенных файлах.<br/>")
                .append("Наша добрая и дружелюбная команда из отдела продаж свяжется с Вами в ближайшее время и поможет пройти регистрацию до конца.<br/>")
                .append("Мы рады видеть Вас и Вашу команду среди наших участников!<br/>")
                .append("До связи в ближайшие 5 часов!</td></tr>")
                .append("<tr><td>")
                .append("С уважением, <br/> Оргкомитет</td></tr>")
                .append("</body></html>");
        sendEmail(text.toString(), "StartUpfootball3x3Cup", Collections.singletonList(team.getEmail()));
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
            email.setFrom(GMAIL_LOGIN, "3x3football.com");
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
