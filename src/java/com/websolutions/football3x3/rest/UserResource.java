package com.websolutions.football3x3.rest;

import com.websolutions.football3x3.dao.user.UserDao;
import com.websolutions.football3x3.entity.User;
import com.websolutions.football3x3.entity.enums.Role;
import com.websolutions.football3x3.util.CustomUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Created by Владислав on 10.06.2015.
 */
@RestController
@Path("user")
public class UserResource {

    @Inject
    private UserDao userDao;

    @Inject
    private UserDetailsService userDetailsService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public void getCurrentUser() {
        User user = new User("admin","admin", Role.ADMIN);

    }

}
