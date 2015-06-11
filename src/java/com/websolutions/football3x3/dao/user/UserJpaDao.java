package com.websolutions.football3x3.dao.user;

import com.websolutions.football3x3.dao.JpaDao;
import com.websolutions.football3x3.entity.User;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Named;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;
import java.util.List;

/**
 * Created by Владислав on 10.06.2015.
 */
@Repository
public class UserJpaDao extends JpaDao<User,String> implements UserDao {

    public UserJpaDao() {
        super(User.class);
    }

    @Override
    @Transactional(readOnly = true)
    public User findByName(String name)
    {
        final CriteriaBuilder builder = this.getEntityManager().getCriteriaBuilder();
        final CriteriaQuery<User> criteriaQuery = builder.createQuery(this.entityClass);

        Root<User> root = criteriaQuery.from(this.entityClass);
        Path<String> namePath = root.get("username");
        criteriaQuery.where(builder.equal(namePath, name));

        TypedQuery<User> typedQuery = this.getEntityManager().createQuery(criteriaQuery);
        List<User> users = typedQuery.getResultList();

        if (users.isEmpty()) {
            return null;
        }

        return users.iterator().next();
    }
}
