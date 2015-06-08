package com.websolutions.football3x3.rest;

import com.websolutions.football3x3.dao.team.TeamDao;
import com.websolutions.football3x3.entity.Player;
import com.websolutions.football3x3.entity.Team;
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


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Team> getAllTeams() {
        return teamDao.findAll();
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
        return null;
    }


}
