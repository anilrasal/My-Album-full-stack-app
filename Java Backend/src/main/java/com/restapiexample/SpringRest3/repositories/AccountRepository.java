package com.restapiexample.SpringRest3.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.restapiexample.SpringRest3.model.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long>{
    
    public Optional<Account> findByEmail(String email);
}
