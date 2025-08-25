package com.dernek.service;

import com.dernek.entity.Announcement;
import com.dernek.entity.Etkinlik;
import com.dernek.repository.EtkinlikRepository;
import com.dernek.websocket.AnnouncementWebSocketHandler;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EtkinlikService {

    @Autowired
    private EtkinlikRepository etkinlikRepository;

   @Autowired
    public EtkinlikService(AnnouncementWebSocketHandler wsHandler, EtkinlikRepository etkinlikRepository) {
        this.wsHandler = wsHandler;
        this.etkinlikRepository = etkinlikRepository;
    }

        @Autowired
    private AnnouncementWebSocketHandler wsHandler; 

    public List<Etkinlik> getAllEtkinlikler() {
        return etkinlikRepository.findAll();
    }

    public List<Etkinlik> getEtkinliklerByType(String type) {
        if ("NEWS".equalsIgnoreCase(type)) {
            return etkinlikRepository.findByDiscriminator("NEWS");
        } else if ("ANNOUNCEMENT".equalsIgnoreCase(type)) {
            return etkinlikRepository.findByDiscriminator("ANNOUNCEMENT");
        } else {
            return etkinlikRepository.findAll();
        }
    }

    public Optional<Etkinlik> getEtkinlikById(Long id) {
        return etkinlikRepository.findById(id);
    }

    public Etkinlik saveEtkinlik(Etkinlik etkinlik) {
        Etkinlik saved = etkinlikRepository.save(etkinlik);

     if (saved instanceof Announcement) {
        wsHandler.broadcast("Yeni duyurunuz var!"); // Plain WebSocket üzerinden gönder
    }

    return saved;

}

    public void deleteEtkinlik(Long id) {
        etkinlikRepository.deleteById(id);
    }
}
