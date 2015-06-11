package com.websolutions.football3x3.rest;

import com.websolutions.football3x3.dao.news.NewsDao;
import com.websolutions.football3x3.entity.News;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import javax.ws.rs.*;
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
    @Path("active")
    @Produces(MediaType.APPLICATION_JSON)
    public List<News> getActiveNews() {
        return newsDao.findActive();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public News getNewsById(@PathParam("id") Integer id) {
        News news = newsDao.find(id);
        if (news==null) {
            throw new WebApplicationException(404);
        }
        return news;
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public News createNews(News newsEntry) {
        return newsDao.save(newsEntry);
    }

    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public News updateNews(@PathParam("id") Integer id, News newsEntry) {
        return newsDao.save(newsEntry);
    }

    @DELETE
    @Path("{id}")
    public void deleteNews(@PathParam("id") Integer id) {
        newsDao.delete(id);
    }

}
