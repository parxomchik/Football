package com.websolutions.football3x3.entity;

import javax.persistence.*;

/**
 * Created by Владислав on 06.06.2015.
 */
@Entity
@Table(name = "FEEDBACKS")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String email;
    private String subject;
    private String message;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Feedback feedback = (Feedback) o;

        if (id != feedback.id) return false;
        if (!email.equals(feedback.email)) return false;
        if (!message.equals(feedback.message)) return false;
        if (!name.equals(feedback.name)) return false;
        if (subject != null ? !subject.equals(feedback.subject) : feedback.subject != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + name.hashCode();
        result = 31 * result + email.hashCode();
        result = 31 * result + (subject != null ? subject.hashCode() : 0);
        result = 31 * result + message.hashCode();
        return result;
    }
}
