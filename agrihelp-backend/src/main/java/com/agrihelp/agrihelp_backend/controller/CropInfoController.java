package com.agrihelp.agrihelp_backend.controller;

import com.agrihelp.agrihelp_backend.model.CropInfo;
import com.agrihelp.agrihelp_backend.service.CropInfoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crop-info")
@CrossOrigin(origins = "http://localhost:5173")
public class CropInfoController {

    private final CropInfoService service;

    public CropInfoController(CropInfoService service) {
        this.service = service;
    }

    // ADMIN → Add crop info
    @PostMapping("/add")
    public CropInfo addCrop(@RequestBody CropInfo crop) {
        return service.addCropInfo(crop);
    }
    // ADMIN → Update crop info
    @PutMapping("/update/{id}")
    public CropInfo updateCrop(
            @PathVariable Long id,
            @RequestBody CropInfo crop) {
        return service.updateCropInfo(id, crop);
    }

    // ADMIN → Delete crop info
    @DeleteMapping("/delete/{id}")
    public void deleteCrop(@PathVariable Long id) {
        service.deleteCropInfo(id);
    }

    // FARMER → View crop info
    @GetMapping("/all")
    public List<CropInfo> getAll() {
        return service.getAllCropInfo();
    }
}
