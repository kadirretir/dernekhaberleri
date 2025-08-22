package com.dernek.service;

import com.dernek.entity.Etkinlik;
import com.dernek.repository.EtkinlikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EtkinlikService {

    @Autowired
    private EtkinlikRepository etkinlikRepository;

    public List<Etkinlik> getAllEtkinlikler() {
        return etkinlikRepository.findAll();
    }

    public Optional<Etkinlik> getEtkinlikById(Long id) {
        return etkinlikRepository.findById(id);
    }

    public Etkinlik saveEtkinlik(Etkinlik etkinlik) {
        return etkinlikRepository.save(etkinlik);
    }

    public void deleteEtkinlik(Long id) {
        etkinlikRepository.deleteById(id);
    }
}
