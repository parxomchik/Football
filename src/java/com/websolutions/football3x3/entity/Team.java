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
        if (company != null ? !company.equals(team.company) : team.company != null) return false;
        if (email != null ? !email.equals(team.email) : team.email != null) return false;
        if (league != team.league) return false;
        if (!Arrays.equals(logo, team.logo)) return false;
        if (name != null ? !name.equals(team.name) : team.name != null) return false;
        if (players != null ? !players.equals(team.players) : team.players != null) return false;
        if (telephone != null ? !telephone.equals(team.telephone) : team.telephone != null) return false;
        if (website != null ? !website.equals(team.website) : team.website != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id;
        result = 31 * result + (league != null ? league.hashCode() : 0);
        result = 31 * result + (company != null ? company.hashCode() : 0);
        result = 31 * result + (website != null ? website.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (telephone != null ? telephone.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (payed ? 1 : 0);
        result = 31 * result + (logo != null ? Arrays.hashCode(logo) : 0);
        result = 31 * result + (players != null ? players.hashCode() : 0);
        return result;
    }
}
