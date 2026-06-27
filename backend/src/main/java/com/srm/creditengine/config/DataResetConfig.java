package com.srm.creditengine.config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

@Configuration
public class DataResetConfig {

    @PersistenceContext
    private EntityManager entityManager;

    @Bean
    @Transactional
    public ApplicationRunner resetDataOnStartup() {
        return args -> {
            entityManager.createNativeQuery("TRUNCATE TABLE settlements RESTART IDENTITY CASCADE").executeUpdate();
            entityManager.createNativeQuery("TRUNCATE TABLE receivables RESTART IDENTITY CASCADE").executeUpdate();
            entityManager.createNativeQuery("TRUNCATE TABLE cedents RESTART IDENTITY CASCADE").executeUpdate();
        };
    }
}
