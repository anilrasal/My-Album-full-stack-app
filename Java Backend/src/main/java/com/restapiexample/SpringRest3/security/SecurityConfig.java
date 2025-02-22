package com.restapiexample.SpringRest3.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

@Configuration
public class SecurityConfig {

    private RSAKey rsaKeys;

    // @Bean
    // public InMemoryUserDetailsManager users(){
    // return new InMemoryUserDetailsManager(
    // User.withUsername("Anil")
    // .password("{noop}password")
    // .authorities("read")
    // .build()
    // );
    // }

    @Bean
    public JWKSource<SecurityContext> jwkSource() {
        rsaKeys = Jwks.generateRsa();
        JWKSet jwkSet = new JWKSet(rsaKeys);
        return (jwkSelector, securityContext) -> jwkSelector.select(jwkSet);
    }

    @Bean
    public JwtDecoder decoder() throws JOSEException {
        return NimbusJwtDecoder.withPublicKey(rsaKeys.toRSAPublicKey()).build();
    }

    @Bean
    JwtEncoder encoder(JWKSource<SecurityContext> jwks) {
        return new NimbusJwtEncoder(jwks);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authManager(UserDetailsService userDetailsService) {
        var authProvider = new DaoAuthenticationProvider();
        authProvider.setPasswordEncoder(passwordEncoder());
        authProvider.setUserDetailsService(userDetailsService);
        return new ProviderManager(authProvider);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/api/v1").permitAll()
                        .requestMatchers("/api/v1/auth/token").permitAll()
                        .requestMatchers("/api/v1/auth/users/add").permitAll()
                        .requestMatchers("/api/v1/auth/users").hasAuthority("SCOPE_ADMIN")
                        .requestMatchers("/api/v1/auth/profile").authenticated()
                        .requestMatchers("/api/v1/auth/profile/update-password").authenticated()
                        .requestMatchers("/api/v1/auth/user/{user_id}/update-authorities")
                        .hasAnyAuthority("SCOPE_ADMIN")
                        .requestMatchers("/api/v1/auth/profile/delete").authenticated()

                        .requestMatchers("/api/v1/albums/add").authenticated()
                        .requestMatchers("/api/v1/albums").authenticated()
                        .requestMatchers("/api/v1/albums/{album_id}/upload-photos").authenticated()
                        .requestMatchers("/api/v1/albums/{album_id}/photos/{photo_id}/download-photo").authenticated()
                        .requestMatchers("/api/v1/albums/{album_id}/photos/{photo_id}/download-thumbnail")
                        .authenticated()
                        .requestMatchers("/api/v1/albums/{album_id}/update").authenticated()
                        .requestMatchers("/api/v1/albums/{album_id}").authenticated()
                        .requestMatchers("/api/v1/albums/{album_id}/photos/{photo_id}/update").authenticated()
                        .requestMatchers("/api/v1/albums/{album_id}/delete").authenticated()
                        .requestMatchers("/api/v1/albums/{album_id}/photos/{photo_id}/delete").authenticated()

                        .requestMatchers("/test").authenticated()
                        .requestMatchers("/test2").permitAll()
                        .requestMatchers("/swagger-ui/**").permitAll()
                        .requestMatchers("/v3/api-docs/**").permitAll()
                        .requestMatchers("/db-console/**").permitAll())
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.csrf(csrf -> csrf.disable());
        http.headers(header -> header.frameOptions(frame -> frame.disable()));

        return http.build();
    }

}
