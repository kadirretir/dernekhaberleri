package com.dernek.entity;

import jakarta.persistence.*;

@Entity
@DiscriminatorValue("ANNOUNCEMENT")
public class Announcement extends Etkinlik {
    private String resim; // Dosya yolu tutulur
    // getter/setter
}