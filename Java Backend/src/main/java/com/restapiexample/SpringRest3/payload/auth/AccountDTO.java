package com.restapiexample.SpringRest3.payload.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AccountDTO {

    @Email
    @Schema(description = "Email address", example = "admin@xyz.com", requiredMode = RequiredMode.REQUIRED)
    private String email;

    @Schema(description = "First Name", example = "Anil", requiredMode = RequiredMode.NOT_REQUIRED)
    private String firstName;

    @Schema(description = "Last Name", example = "Rasal", requiredMode = RequiredMode.NOT_REQUIRED)
    private String lastName;

    @Size(min = 6, max = 20)
    @Schema(description = "Password", example = "Password", requiredMode = RequiredMode.REQUIRED, maxLength = 20, minLength = 6)
    private String password;

}
