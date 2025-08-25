package com.dernek.controller;

import com.dernek.entity.Announcement;
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
public List<Etkinlik> getAllEtkinlikler(@RequestParam(required = false) String type) {
    if (type != null) {
        return etkinlikService.getEtkinliklerByType(type);
    }
    return etkinlikService.getAllEtkinlikler();
}
    @GetMapping("/{id}")
    public Optional<Etkinlik> getEtkinlikById(@PathVariable Long id) {
        return etkinlikService.getEtkinlikById(id);
    }

    @PostMapping
    public Etkinlik createEtkinlik(@RequestBody Etkinlik etkinlik) {
        System.out.println("Gelen etkinlik: " + etkinlik);
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
    Path uploadDir = Paths.get("uploads");

    // Eğer klasör yoksa oluştur
    if (!Files.exists(uploadDir)) {
        Files.createDirectories(uploadDir);
    }

    Path path = uploadDir.resolve(fileName);
    Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

    Optional<Etkinlik> etkinlikOpt = etkinlikService.getEtkinlikById(etkinlikId);
    if (etkinlikOpt.isPresent()) {
        Etkinlik etkinlik = etkinlikOpt.get();

        // Sadece Announcement için resim set et
        if (etkinlik instanceof Announcement announcement) {
            announcement.setResim(path.toString());
            return etkinlikService.saveEtkinlik(announcement);
        }
        throw new RuntimeException("Sadece Announcement için resim yüklenebilir.");
    }
    throw new RuntimeException("Etkinlik bulunamadı");
}

    @DeleteMapping("/{id}")
    public void deleteEtkinlik(@PathVariable Long id) {
        etkinlikService.deleteEtkinlik(id);
    }
}