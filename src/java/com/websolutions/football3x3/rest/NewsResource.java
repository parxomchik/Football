package com.websolutions.football3x3.rest;

import com.websolutions.football3x3.dao.news.NewsDao;
import com.websolutions.football3x3.entity.News;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.sql.Timestamp;
import java.util.List;

/**
 * Created by Владислав on 06.06.2015.
 */
@RestController
@Path("news")
public class NewsResource {

    @Inject
    private NewsDao newsDao;

    /**
     * Method to get all news, both active and inactive.
     * @return list of news in JSON format
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<News> getAllNews() {
        return newsDao.findAll();
    }

    /**
     * Method to get all active news, list is ordered by date desc.
     * @param count number of news from list
     * @return list of news in JSON format
     */
    @GET
    @Path("active")
    @Produces(MediaType.APPLICATION_JSON)
    public List<News> getActiveNews(@QueryParam("count") final Integer count) {
        List<News> resultList = newsDao.findActive();
        try {
            if (count != null && !count.equals(Integer.valueOf(0))) {
                return resultList.subList(0, count);
            }
        } catch (IndexOutOfBoundsException e) {
            return newsDao.findActive();
        }
        return newsDao.findActive();

    }

    /**
     * Get News entity by id.
     * @param id news identifier
     * @return single News in JSON format
     * @throws javax.ws.rs.WebApplicationException 404
     */
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

    /**
     * Saves new entity to database.
     * @param newsEntry new News object
     * @return merged entity
     */

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public News createNews(News newsEntry) {
        newsEntry.setDate(new Timestamp(new java.util.Date().getTime()));
        return newsDao.save(newsEntry);
    }

    /**
     * Updates News entity with certain id.
     * @param id id of entity to update
     * @param newsEntry changed entity
     * @return merged entity
     */
    @PUT
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public News updateNews(@PathParam("id") Integer id, News newsEntry) {
        return newsDao.save(newsEntry);
    }

    /**
     * Deletes News entity with certain id.
     * @param id id of entity to delete
     */
    @DELETE
    @Path("{id}")
    public void deleteNews(@PathParam("id") Integer id) {
        newsDao.delete(id);
    }

}
