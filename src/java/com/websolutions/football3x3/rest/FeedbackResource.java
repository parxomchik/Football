package com.websolutions.football3x3.rest;

import com.websolutions.football3x3.dao.feedback.FeedbackDao;
import com.websolutions.football3x3.entity.Feedback;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by Владислав on 09.06.2015.
 */
@RestController
@Path("feedbacks")
public class FeedbackResource {

    @Inject
    private FeedbackDao feedbackDao;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Feedback> getAllFeedbacks() {
        return feedbackDao.findAll();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Feedback getFeedbackById(@PathParam("id") Integer id) {
        return feedbackDao.find(id);
    }


}
