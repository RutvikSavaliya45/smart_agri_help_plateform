package com.agrihelp.agrihelp_backend.service;

import com.agrihelp.agrihelp_backend.model.CropInfo;
import com.agrihelp.agrihelp_backend.repository.CropInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CropInfoService {

    private final CropInfoRepository repo;

    public CropInfoService(CropInfoRepository repo) {
        this.repo = repo;
    }

    public CropInfo addCropInfo(CropInfo crop) {
        return repo.save(crop);
    }

    public List<CropInfo> getAllCropInfo() {
        return repo.findAll();
    }
    public CropInfo updateCropInfo(Long id, CropInfo crop) {
        CropInfo existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Crop not found"));

        existing.setCropName(crop.getCropName());
        existing.setSeason(crop.getSeason());
        existing.setSoilType(crop.getSoilType());
        existing.setIrrigation(crop.getIrrigation());
        existing.setFertilizer(crop.getFertilizer());
        existing.setDiseaseControl(crop.getDiseaseControl());

        return repo.save(existing);
    }

    public void deleteCropInfo(Long id) {
        repo.deleteById(id);
    }
}
