package com.agrihelp.agrihelp_backend.controller;

import com.agrihelp.agrihelp_backend.model.CropRate;
import com.agrihelp.agrihelp_backend.service.CropRateService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/crop-rates")
@CrossOrigin(origins = "http://localhost:5173")
public class CropRateController {

    private final CropRateService service;

    public CropRateController(CropRateService service) {
        this.service = service;
    }

    // ADMIN → Add Crop Rate
    @PostMapping("/add")
    public CropRate addCropRate(@RequestBody CropRate rate) {
        return service.addCropRate(rate);
    }

    // ADMIN → VIEW ALL
    @GetMapping("/all")
    public List<CropRate> getAll() {
        return service.getAllRates();
    }

    // FARMER → BY MARKET
    @GetMapping("/{market}")
    public List<CropRate> getByMarket(@PathVariable String market) {
        return service.getCropRatesByMarket(market);
    }

    // ADMIN → UPDATE
    @PutMapping("/update/{id}")
    public CropRate update(@PathVariable Long id, @RequestBody CropRate rate) {
        return service.updateCropRate(id, rate);
    }
}