package com.websolutions.football3x3.dao.feedback;

import com.websolutions.football3x3.dao.JpaDao;
import com.websolutions.football3x3.entity.Feedback;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Владислав on 09.06.2015.
 */
@Repository
public class FeedbackJpaDao extends JpaDao<Feedback,Integer> implements FeedbackDao {
    public FeedbackJpaDao() {
        super(Feedback.class);
    }

    @Override
    public List<Feedback> findFeedbacksByProcessedStatus(boolean status) {
        return getEntityManager().createQuery("select f from Feedback f where f.processed=:status").setParameter("status",status).getResultList();
    }
}
