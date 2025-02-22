package com.restapiexample.SpringRest3.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.restapiexample.SpringRest3.model.Account;
import com.restapiexample.SpringRest3.model.Album;
import com.restapiexample.SpringRest3.payload.auth.AccountDTO;
import com.restapiexample.SpringRest3.payload.auth.AccountViewDTO;
import com.restapiexample.SpringRest3.payload.auth.AuthoritiesDTO;
import com.restapiexample.SpringRest3.payload.auth.PasswordDTO;
import com.restapiexample.SpringRest3.payload.auth.ProfileDTO;
import com.restapiexample.SpringRest3.payload.auth.TokenDTO;
import com.restapiexample.SpringRest3.payload.auth.UserLoginDTO;
import com.restapiexample.SpringRest3.service.AccountService;
import com.restapiexample.SpringRest3.service.AlbumService;
import com.restapiexample.SpringRest3.service.TokenService;
import com.restapiexample.SpringRest3.util.constants.AccountError;
import com.restapiexample.SpringRest3.util.constants.AccountSuccess;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Auth Controller", description = "Controller for Account managerment")
@Slf4j
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private AlbumService albumService;

    @Autowired
    private AlbumController albumController;

    @PostMapping("/token")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<TokenDTO> token(@RequestBody UserLoginDTO userLogin) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(userLogin.getEmail(), userLogin.getPassword()));
            return ResponseEntity.ok(new TokenDTO(tokenService.generateToken(authentication)));
        } catch (Exception e) {
            log.debug(AccountError.TOKEN_GENERATION_ERROR.toString() + ": " + e.getMessage());
            return new ResponseEntity<>(new TokenDTO(null), HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping(value = "/users/add", consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponse(responseCode = "400", description = "Please enter valid email and password length between 6-20 characters")
    @ApiResponse(responseCode = "201", description = "Account Added")
    @Operation(summary = "Add a new user")
    public ResponseEntity<String> addUser(@RequestBody AccountDTO accountDTO) {
        try {
            Optional<Account> optionalAccount = accountService.findByEmail(accountDTO.getEmail());
            if (optionalAccount.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("User Already exists with this email address");
            } else {
                Account account = new Account();
                account.setEmail(accountDTO.getEmail());
                account.setFirstName(accountDTO.getFirstName());
                account.setLastName(accountDTO.getLastName());
                account.setPassword(encoder.encode(accountDTO.getPassword()));
                accountService.save(account);
                return ResponseEntity.ok(AccountSuccess.ACCOUNT_ADDED.toString());
            }

        } catch (Exception e) {
            log.debug(AccountError.ADD_ACCOUNT_ERROR.toString() + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping(value = "/users", produces = "application/json")
    @ApiResponse(responseCode = "200", description = "List of users")
    @ApiResponse(responseCode = "401", description = "Token is missing")
    @ApiResponse(responseCode = "403", description = "Token error")
    @Operation(summary = "List user Api")
    @SecurityRequirement(name = "anil-demo-api")
    public List<AccountViewDTO> users() {
        List<AccountViewDTO> accounts = new ArrayList<>();
        for (Account account : accountService.findAll()) {
            accounts.add(new AccountViewDTO(account.getId(), account.getFirstName(), account.getLastName(),
                    account.getEmail(), account.getAuthorities()));
        }
        return accounts;
    }

    @GetMapping(value = "/profile", produces = "application/json")
    @ApiResponse(responseCode = "200", description = "View Profile")
    @ApiResponse(responseCode = "401", description = "Token missing")
    @ApiResponse(responseCode = "403", description = "Token error")
    @Operation(summary = "View profile")
    @SecurityRequirement(name = "anil-demo-api")
    public ProfileDTO proflie(Authentication authentication) {
        String email = authentication.getName();
        Optional<Account> optionalAccount = accountService.findByEmail(email);
        Account account = optionalAccount.get();
        ProfileDTO profileDTO = new ProfileDTO(account.getId(), account.getFirstName(), account.getLastName(),
                account.getEmail(), account.getAuthorities());
        return profileDTO;
    }

    @PutMapping(value = "/profile/update-password", produces = "application/json", consumes = "application/json")
    @ApiResponse(responseCode = "200", description = "Update Password")
    @ApiResponse(responseCode = "401", description = "Token missing")
    @ApiResponse(responseCode = "403", description = "Token error")
    @Operation(summary = "Update password")
    @SecurityRequirement(name = "anil-demo-api")
    public AccountViewDTO updatePassword(@Valid @RequestBody PasswordDTO passwordDTO, Authentication authentication) {
        String email = authentication.getName();
        Optional<Account> optionalAccount = accountService.findByEmail(email);
        Account account = optionalAccount.get();
        account.setPassword(encoder.encode(passwordDTO.getPassword()));
        accountService.save(account);
        AccountViewDTO accountViewDTO = new AccountViewDTO(account.getId(), account.getFirstName(),
                account.getLastName(), account.getEmail(),
                account.getAuthorities());
        return accountViewDTO;
    }

    @PutMapping(value = "/user/{user_id}/update-authorities", produces = "application/json", consumes = "application/json")
    @ApiResponse(responseCode = "200", description = "Update Authorities")
    @ApiResponse(responseCode = "400", description = "Invalid user ID")
    @ApiResponse(responseCode = "401", description = "Token missing")
    @ApiResponse(responseCode = "403", description = "Token error")
    @Operation(summary = "Update Authorities")
    @SecurityRequirement(name = "anil-demo-api")
    public ResponseEntity<AccountViewDTO> updateAuthorities(@Valid @RequestBody AuthoritiesDTO authoritiesDTO,
            @PathVariable long user_id) {
        Optional<Account> optionalAccount = accountService.findById(user_id);
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            account.setAuthorities(authoritiesDTO.getAuthorities());
            accountService.save(account);
            AccountViewDTO accountViewDTO = new AccountViewDTO(account.getId(), account.getFirstName(),
                    account.getLastName(), account.getEmail(),
                    account.getAuthorities());
            return ResponseEntity.ok(accountViewDTO);
        }
        return new ResponseEntity<AccountViewDTO>(new AccountViewDTO(), HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/profile/delete")
    @ApiResponse(responseCode = "201", description = "Delete User")
    @ApiResponse(responseCode = "401", description = "Token missing")
    @ApiResponse(responseCode = "403", description = "Token error")
    @Operation(summary = "Delete user")
    @SecurityRequirement(name = "anil-demo-api")
    @CrossOrigin(origins = "http://localhost:300", maxAge = 3600)
    public ResponseEntity<String> deleteProfile(Authentication authentication) {
        String email = authentication.getName();
        Optional<Account> optionalAccount = accountService.findByEmail(email);
        if (optionalAccount.isPresent()) {
            List<Album> albums = albumService.findAll();
            for (Album album : albums) {
                albumController.delete_album(album.getId(), authentication);
            }
            accountService.delteById(optionalAccount.get().getId());
            return ResponseEntity.ok("User deleted");
        }
        return new ResponseEntity<String>("Bad request", HttpStatus.BAD_REQUEST);
    }

}
