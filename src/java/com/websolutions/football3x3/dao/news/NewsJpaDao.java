package com.websolutions.football3x3.dao.news;

import com.websolutions.football3x3.dao.JpaDao;
import com.websolutions.football3x3.entity.News;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Владислав on 06.06.2015.
 */
@Repository
public class NewsJpaDao extends JpaDao<News,Integer> implements NewsDao {
    public NewsJpaDao() {
        super(News.class);
    }

    @Override
    public List<News> findActive() {
        return getEntityManager().createQuery("SELECT n from News n where n.active=true order by n.date desc").getResultList();
    }

    @Override
    public News findActiveById(int id) {
        return (News)getEntityManager().createQuery("select n from News n where n.active=true and n.id=:id").setParameter("id",id).getSingleResult();
    }
}
