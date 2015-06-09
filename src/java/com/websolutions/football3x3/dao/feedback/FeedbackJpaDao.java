package com.websolutions.football3x3.dao.feedback;

import com.websolutions.football3x3.dao.JpaDao;
import com.websolutions.football3x3.entity.Feedback;
import org.springframework.stereotype.Repository;

/**
 * Created by Владислав on 09.06.2015.
 */
@Repository
public class FeedbackJpaDao extends JpaDao<Feedback,Integer> implements FeedbackDao {
    public FeedbackJpaDao() {
        super(Feedback.class);
    }
}
