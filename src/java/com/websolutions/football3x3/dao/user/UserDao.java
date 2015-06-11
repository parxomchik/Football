package com.websolutions.football3x3.dao.user;

import com.websolutions.football3x3.dao.Dao;
import com.websolutions.football3x3.entity.User;


/**
 * Created by Владислав on 10.06.2015.
 */
public interface UserDao extends Dao<User,String> {
    public User findByName(String name);
}
