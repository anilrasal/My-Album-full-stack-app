package com.restapiexample.SpringRest3.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restapiexample.SpringRest3.model.Album;

@Repository
public interface AlbumRepository extends JpaRepository<Album,Long>{
    public List<Album> findByAccount_id(long id);
}
