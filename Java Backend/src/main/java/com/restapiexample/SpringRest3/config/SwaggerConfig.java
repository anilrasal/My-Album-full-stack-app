package com.restapiexample.SpringRest3.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;

@Configuration
@OpenAPIDefinition(
    info = @Info(title = "User API", 
    version = "Version 0.1", 
    contact = @Contact(
        name = "AnilR", email = "annurasal123@gmail.com", url = "https://google.com"), 
    license = @License(
        name="Apache 2.0", url = "https://www.apache.org/licenses/LICENSE-2.0"
    ),
    termsOfService = "https://google.com",
    description = "Demo restfuil API by Anil"))
public class SwaggerConfig {

}
