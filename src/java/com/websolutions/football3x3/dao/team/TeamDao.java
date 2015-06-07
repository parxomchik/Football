package com.websolutions.football3x3.dao.team;

import com.websolutions.football3x3.dao.Dao;
import com.websolutions.football3x3.entity.Team;
import com.websolutions.football3x3.entity.enums.League;

import java.util.List;

/**
 * Created by Владислав on 07.06.2015.
 */
public interface TeamDao extends Dao<Team,Integer> {

    public List<Team> findByLeague(League league);

    public Team findByName(String name);

}
