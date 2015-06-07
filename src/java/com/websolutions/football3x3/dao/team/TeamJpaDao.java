package com.websolutions.football3x3.dao.team;

import com.websolutions.football3x3.dao.JpaDao;
import com.websolutions.football3x3.entity.Team;
import com.websolutions.football3x3.entity.enums.League;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Владислав on 07.06.2015.
 */
public class TeamJpaDao extends JpaDao<Team, Integer> implements TeamDao {
    public TeamJpaDao() {
        super(Team.class);
    }


    @Override
    @Transactional
    public List<Team> findByLeague(League league) {
        return getEntityManager().createQuery("select t from Team t where t.league = :league").setParameter("league",league).getResultList();
    }


    @Override
    @Transactional
    public Team findByName(String name) {
        return (Team)getEntityManager().createQuery("select t from Team t where t.name = :name").setParameter("name",name).getSingleResult();
    }
}
