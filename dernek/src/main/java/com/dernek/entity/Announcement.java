package com.dernek.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@DiscriminatorValue("ANNOUNCEMENT")
@Getter
@Setter
public class Announcement extends Etkinlik {

    // Resim dosya yolu, frontend için URL oluşturulabilir
    @Column(length = 500, nullable = false)
    private String resim;
}