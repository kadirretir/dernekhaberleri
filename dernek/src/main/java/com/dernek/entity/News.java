package com.dernek.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("NEWS")
@Getter
@Setter
public class News extends Etkinlik {
    private String haberLinki;
}