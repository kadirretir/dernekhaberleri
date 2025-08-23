package com.dernek.repository;

import com.dernek.entity.Etkinlik;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EtkinlikRepository extends JpaRepository<Etkinlik, Long> {

    @Query("SELECT e FROM Etkinlik e WHERE e.class = :clazz")
    List<Etkinlik> findByClass(@Param("clazz") Class<? extends Etkinlik> clazz);

    // Alternatif: Discriminator column ile 
    @Query(value = "SELECT * FROM Etkinlik WHERE etkinlik = :type", nativeQuery = true)
    List<Etkinlik> findByDiscriminator(@Param("type") String type);
}
