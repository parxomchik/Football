package com.websolutions.football3x3.dao;

import java.util.List;

public interface Dao<T, I>
{

    List<T> findAll();


    T find(I id);


    T save(T newsEntry);


    void delete(I id);

}