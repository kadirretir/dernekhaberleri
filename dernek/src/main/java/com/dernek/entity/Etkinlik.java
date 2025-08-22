package com.dernek.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "etkinlik")
@Getter
@Setter
public abstract class Etkinlik {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String konu;
    private String icerik;
    private String gecerliliktarihi;
}