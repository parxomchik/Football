package com.websolutions.football3x3.dao.news;

import com.websolutions.football3x3.dao.JpaDao;
import com.websolutions.football3x3.entity.News;
import org.springframework.stereotype.Repository;

/**
 * Created by Владислав on 06.06.2015.
 */
@Repository
public class NewsJpaDao extends JpaDao<News,Integer> implements NewsDao {
    public NewsJpaDao() {
        super(News.class);
    }
}
