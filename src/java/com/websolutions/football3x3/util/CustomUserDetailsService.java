package com.websolutions.football3x3.util;

import com.websolutions.football3x3.dao.user.UserDao;
import com.websolutions.football3x3.entity.User;
import com.websolutions.football3x3.entity.enums.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by Владислав on 10.06.2015.
 */
@Named
public class CustomUserDetailsService implements UserDetailsService {

    @Inject
    private UserDao userDao;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        User user = userDao.findByName(username);
        if (null == user) {
            throw new UsernameNotFoundException("The user with name " + username + " was not found");
        }
        return user;
    }

    /**
     * Retrieves the correct ROLE type depending on the access level, where access level is an Integer.
     * Basically, this interprets the access value whether it's for a regular user or admin.
     *
     * @param access an integer value representing the access of the user
     * @return collection of granted authorities
     */
    public Collection<GrantedAuthority> getAuthorities(Integer access) {
        // Create a list of grants for this user
        List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();

        // All users are granted with ROLE_USER access
        // Therefore this user gets a ROLE_USER by default
//			logger.debug("Grant ROLE_USER to this user");
//			authList.add(new GrantedAuthorityImpl("ROLE_USER"));
//
//			// Check if this user has admin access
//			// We interpret Integer(1) as an admin user
//			if ( access.compareTo(1) == 0) {
//				// User has admin access
//				logger.debug("Grant ROLE_ADMIN to this user");
//				authList.add(new GrantedAuthorityImpl("ROLE_ADMIN"));
//			}
//
//			// Return list of granted authorities

        Role role = Role.values()[access];
        if(role != null)
            authList.add(new GrantedAuthorityImpl(role.name()));

        return authList;
    }
}
