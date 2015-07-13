package com.websolutions.football3x3.dao.news;

import com.websolutions.football3x3.dao.Dao;
import com.websolutions.football3x3.entity.News;

import java.util.List;

/**
 * Created by Владислав on 06.06.2015.
 */
public interface NewsDao extends Dao<News,Integer> {
    public List<News> findActive();
    public News findActiveById(int id);
    public List<Integer> findActiveNewsIds();
}
