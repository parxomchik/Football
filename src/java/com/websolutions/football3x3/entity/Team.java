package com.websolutions.football3x3.entity;

import com.websolutions.football3x3.entity.enums.League;
import org.codehaus.jackson.annotate.JsonBackReference;
import org.codehaus.jackson.annotate.JsonManagedReference;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;

/**
 * Created by Владислав on 06.06.2015.
 */
@Entity
@Table(name = "teams")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Enumerated(EnumType.STRING)
    private League league;
    private String company;
    private String website;
    @Column(unique = true)
    private String name;
    private String telephone;
    private String email;
    private boolean payed;
    @Lob
    private byte[] logo;

    @OneToMany(mappedBy = "team",fetch = FetchType.EAGER)
    //@JsonBackReference
    private List<Player> players;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public League getLeague() {
        return league;
    }

    public void setLeague(League league) {
        this.league = league;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isPayed() {
        return payed;
    }

    public void setPayed(boolean payed) {
        this.payed = payed;
    }

    public byte[] getLogo() {
        return logo;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Team team = (Team) o;

        if (id != team.id) return false;
        if (payed != team.payed) return false;
        if (!company.equals(team.company)) return false;
        if (!email.equals(team.email)) return false;
        if (league != team.league) return false;
        if (!name.equals(team.name)) return false;
        if (!telephone.equals(team.telephone)) return false;
        if (!website.equals(team.website)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + league.hashCode();
        result = 31 * result + company.hashCode();
        result = 31 * result + website.hashCode();
        result = 31 * result + name.hashCode();
        result = 31 * result + telephone.hashCode();
        result = 31 * result + email.hashCode();
        result = 31 * result + (payed ? 1 : 0);
        return result;
    }
}
