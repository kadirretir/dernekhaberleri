package com.dernek.controller;

import com.dernek.entity.Etkinlik;
import com.dernek.service.EtkinlikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/etkinlikler")
public class EtkinlikController {

    @Autowired
    private EtkinlikService etkinlikService;

    @GetMapping
    public List<Etkinlik> getAllEtkinlikler() {
        return etkinlikService.getAllEtkinlikler();
    }

    @GetMapping("/{id}")
    public Optional<Etkinlik> getEtkinlikById(@PathVariable Long id) {
        return etkinlikService.getEtkinlikById(id);
    }

    @PostMapping
    public Etkinlik createEtkinlik(@RequestBody Etkinlik etkinlik) {
        return etkinlikService.saveEtkinlik(etkinlik);
    }

    @PutMapping("/{id}")
    public Etkinlik updateEtkinlik(@PathVariable Long id, @RequestBody Etkinlik etkinlik) {
        etkinlik.setId(id);
        return etkinlikService.saveEtkinlik(etkinlik);
    }

@PostMapping("/upload")
public Etkinlik uploadFile(
    @RequestParam("file") MultipartFile file,
    @RequestParam("etkinlikId") Long etkinlikId
) throws IOException {
    String fileName = file.getOriginalFilename();
    Path path = Paths.get("uploads/" + fileName);
    Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

    Optional<Etkinlik> etkinlikOpt = etkinlikService.getEtkinlikById(etkinlikId);
    if (etkinlikOpt.isPresent()) {
        Etkinlik etkinlik = etkinlikOpt.get();
        etkinlik.setImagePath(path.toString()); // Etkinlik entity'de imagePath alanı olmalı
        return etkinlikService.saveEtkinlik(etkinlik);
    }
    throw new RuntimeException("Etkinlik bulunamadı");
}

    @DeleteMapping("/{id}")
    public void deleteEtkinlik(@PathVariable Long id) {
        etkinlikService.deleteEtkinlik(id);
    }
}