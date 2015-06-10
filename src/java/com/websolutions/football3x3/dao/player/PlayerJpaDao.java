package com.websolutions.football3x3.dao.player;

import com.websolutions.football3x3.dao.JpaDao;
import com.websolutions.football3x3.entity.Player;
import org.springframework.stereotype.Repository;

/**
 * Created by Владислав on 10.06.2015.
 */
@Repository
public class PlayerJpaDao extends JpaDao<Player,Integer> implements PlayerDao {
    public PlayerJpaDao() {
        super(Player.class);
    }
}
