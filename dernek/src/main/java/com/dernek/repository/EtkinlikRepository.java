package com.dernek.repository;

import com.dernek.entity.Etkinlik;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EtkinlikRepository extends JpaRepository<Etkinlik, Long> {
}