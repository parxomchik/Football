package com.websolutions.football3x3.rest;

import com.websolutions.football3x3.dao.news.NewsDao;
import com.websolutions.football3x3.entity.News;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by Владислав on 06.06.2015.
 */
@RestController
@Path("news")
public class NewsResource {

    @Inject
    private NewsDao newsDao;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<News> getAllNews() {
        return newsDao.findAll();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public News getNewsById(@PathParam("id") Integer id) {
        return newsDao.find(id);
    }

}
