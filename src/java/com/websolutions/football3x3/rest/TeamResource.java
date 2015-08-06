package com.websolutions.football3x3.rest;

import com.websolutions.football3x3.dao.player.PlayerDao;
import com.websolutions.football3x3.dao.team.TeamDao;
import com.websolutions.football3x3.entity.Player;
import com.websolutions.football3x3.entity.Team;
import com.websolutions.football3x3.entity.enums.League;
import com.websolutions.football3x3.util.EmailService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import javax.persistence.PersistenceException;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by Владислав on 08.06.2015.
 */
@RestController
@Path("teams")
public class TeamResource {

    @Inject
    private TeamDao teamDao;

    @Inject
    private PlayerDao playerDao;

    @Inject
    private EmailService emailService;


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Team> getAllTeams() {
        return teamDao.findAll();
    }

    @GET
    @Path("leagues/{leagueName}")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Team> getTeamsByLeague(@PathParam("leagueName") String league) {
        return teamDao.findByLeague(League.valueOf(league.toUpperCase()));
    }


    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Team getTeamById(@PathParam("id") Integer id) {
        Team team = teamDao.find(id);
        if (team == null) {
            throw new WebApplicationException(404);
        }
        return team;
    }

    @GET
    @Path("{id}/players")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Player> getTeamPlayers(@PathParam("id") Integer id) {
        Team team = teamDao.find(id);
        if (team == null) {
            throw new WebApplicationException(404);
        }
        return team.getPlayers();
    }

    /**
     * Creates new Team and persists it to DB.
     *
     * @param team new entry
     * @return merged Team entity
     * @throws WebApplicationException with status code 403 - Forbidden
     */

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional(rollbackFor = PersistenceException.class)
    public Team createTeam(Team team) throws WebApplicationException {
        try {
            Team t = teamDao.save(team);
            for (Player p : team.getPlayers()) {
                p.setTeam(t);
                playerDao.save(p);
            }
            emailService.sendManagerNotificationAboutNewTeam(team, "itfootball3x3@gmail.com");
            emailService.sendNotificationToCaptain(team);
            return team;
        } catch (PersistenceException e) {
            throw new WebApplicationException(e, 403);
        }
    }

    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Team updateTeam(@PathParam("id") Integer id, Team team) {
        for (Player p: team.getPlayers()) {
            p.setTeam(team);
            playerDao.save(p);
        }
        teamDao.save(team);
        return teamDao.find(id);
    }

    @DELETE
    @Path("{id}")
    public void deleteTeam(@PathParam("id") Integer id) {
        teamDao.delete(id);
    }

    @PUT
    @Path("/payment/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Team setPaymentStatus(@PathParam("id") Integer id, Boolean paymentStatus) {
        try {
            Team team = teamDao.find(id);
            team.setPayed(paymentStatus);
            teamDao.save(team);
            if (paymentStatus==true) {
                emailService.sendManagerPaymentNotification(team, "itfootball3x3@gmail.com");
            }
            return team;
        } catch (PersistenceException e) {
            throw new WebApplicationException(404);
        }

    }

}
