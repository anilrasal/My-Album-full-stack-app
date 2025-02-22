package com.restapiexample.SpringRest3.payload.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDTO {
    private long id;

    private String firstName;

    private String lastName;

    private String email;

    private String authorities;
}
