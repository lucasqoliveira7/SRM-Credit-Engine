package com.srm.creditengine.config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

@Configuration
public class DataResetConfig {

    @PersistenceContext
    private EntityManager entityManager;

    @Bean
    public ApplicationRunner resetDataOnStartup(PlatformTransactionManager transactionManager) {
        return args -> {
            TransactionTemplate tx = new TransactionTemplate(transactionManager);
            tx.execute(status -> {
                entityManager.createNativeQuery("TRUNCATE TABLE settlements RESTART IDENTITY CASCADE").executeUpdate();
                entityManager.createNativeQuery("TRUNCATE TABLE receivables RESTART IDENTITY CASCADE").executeUpdate();
                entityManager.createNativeQuery("TRUNCATE TABLE cedents RESTART IDENTITY CASCADE").executeUpdate();
                return null;
            });
        };
    }
}
