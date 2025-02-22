package com.restapiexample.SpringRest3.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.restapiexample.SpringRest3.model.Account;
import com.restapiexample.SpringRest3.model.Album;
import com.restapiexample.SpringRest3.service.AccountService;
import com.restapiexample.SpringRest3.service.AlbumService;
import com.restapiexample.SpringRest3.util.constants.Authority;

@Component
public class SeedData implements CommandLineRunner {

    @Autowired
    private AccountService accountService;

    @Autowired
    private AlbumService albumService;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {

        Account account01 = new Account();
        account01.setEmail("user@gmail.com");
        account01.setPassword(encoder.encode("password"));
        account01.setFirstName("User1");
        account01.setLastName("LastName");
        accountService.save(account01);

        Account account02 = new Account();
        account02.setEmail("admin@admin.com");
        account02.setPassword(encoder.encode("password"));
        account02.setFirstName("Admin");
        account02.setLastName("Lastname");
        account02.setAuthorities(Authority.ADMIN.toString() + " " + Authority.USER.toString());
        accountService.save(account02);

        Album album1 = new Album();
        album1.setAccount(account02);
        album1.setName("Travel1");
        album1.setDescription("Description 1");
        albumService.save(album1);
    }

}
