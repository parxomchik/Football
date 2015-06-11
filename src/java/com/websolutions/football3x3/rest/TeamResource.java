package com.websolutions.football3x3.rest;

import com.websolutions.football3x3.dao.player.PlayerDao;
import com.websolutions.football3x3.dao.team.TeamDao;
import com.websolutions.football3x3.entity.Player;
import com.websolutions.football3x3.entity.Team;
import com.websolutions.football3x3.entity.enums.League;
import com.websolutions.football3x3.util.EmailService;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
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

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Team createTeam(Team team) {
        Team t = teamDao.save(team);
        for (Player p : team.getPlayers()) {
            p.setTeam(t);
            playerDao.save(p);
        }
        emailService.sendNotificationAboutNewTeam("vladik.kopilash@gmail.com");

        return teamDao.find(t.getId());
    }

    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Team updateTeam(@PathParam("id") Integer id, Team team) {
        return teamDao.save(team);
    }

    @DELETE
    @Path("{id}")
    public void deleteTeam(@PathParam("id") Integer id) {
        teamDao.delete(id);
    }



}
