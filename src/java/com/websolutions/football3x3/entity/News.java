package com.websolutions.football3x3.entity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Arrays;

/**
 * Created by Владислав on 05.06.2015.
 */
@Entity
@Table(name="news")
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String author;
    private String titleTags;
    private String descriptionTags;
    private String keywords;
    private String header;
    private String shortDescription;
    private String text;
    private boolean active;
    private Timestamp date;
    @Lob
    private byte[] picture;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitleTags() {
        return titleTags;
    }

    public void setTitleTags(String titleTags) {
        this.titleTags = titleTags;
    }

    public String getDescriptionTags() {
        return descriptionTags;
    }

    public void setDescriptionTags(String descriptionTags) {
        this.descriptionTags = descriptionTags;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        News news = (News) o;

        if (active != news.active) return false;
        if (id != news.id) return false;
        if (author != null ? !author.equals(news.author) : news.author != null) return false;
        if (date != null ? !date.equals(news.date) : news.date != null) return false;
        if (descriptionTags != null ? !descriptionTags.equals(news.descriptionTags) : news.descriptionTags != null)
            return false;
        if (header != null ? !header.equals(news.header) : news.header != null) return false;
        if (keywords != null ? !keywords.equals(news.keywords) : news.keywords != null) return false;
        if (!Arrays.equals(picture, news.picture)) return false;
        if (shortDescription != null ? !shortDescription.equals(news.shortDescription) : news.shortDescription != null)
            return false;
        if (text != null ? !text.equals(news.text) : news.text != null) return false;
        if (titleTags != null ? !titleTags.equals(news.titleTags) : news.titleTags != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (author != null ? author.hashCode() : 0);
        result = 31 * result + (titleTags != null ? titleTags.hashCode() : 0);
        result = 31 * result + (descriptionTags != null ? descriptionTags.hashCode() : 0);
        result = 31 * result + (keywords != null ? keywords.hashCode() : 0);
        result = 31 * result + (header != null ? header.hashCode() : 0);
        result = 31 * result + (shortDescription != null ? shortDescription.hashCode() : 0);
        result = 31 * result + (text != null ? text.hashCode() : 0);
        result = 31 * result + (active ? 1 : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (picture != null ? Arrays.hashCode(picture) : 0);
        return result;
    }
}
