package com.websolutions.football3x3.dao.feedback;

import com.websolutions.football3x3.dao.Dao;
import com.websolutions.football3x3.entity.Feedback;

import java.util.List;

/**
 * Created by Владислав on 09.06.2015.
 */
public interface FeedbackDao extends Dao<Feedback,Integer> {
    public List<Feedback> findFeedbacksByProcessedStatus(boolean status);
}
