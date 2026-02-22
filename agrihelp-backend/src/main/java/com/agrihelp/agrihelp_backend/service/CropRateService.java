package com.agrihelp.agrihelp_backend.service;

import com.agrihelp.agrihelp_backend.model.CropRate;
import com.agrihelp.agrihelp_backend.repository.CropRateRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CropRateService {

    private final CropRateRepository repository;

    public CropRateService(CropRateRepository repository) {
        this.repository = repository;
    }

    // Admin add crop rate
    public CropRate addCropRate(CropRate rate) {
        return repository.save(rate);
    }

    // Farmer view crop rate by market
    public List<CropRate> getCropRatesByMarket(String market) {
        return repository.findByMarket(market);
    }

    // ADMIN → ALL RATES
    public List<CropRate> getAllRates() {
        return repository.findAll();
    }

    // ADMIN → UPDATE
    public CropRate updateCropRate(Long id, CropRate updated) {
        CropRate rate = repository.findById(id).orElseThrow();

        rate.setCropName(updated.getCropName());
        rate.setHighPrice(updated.getHighPrice());
        rate.setLowPrice(updated.getLowPrice());
        rate.setMarket(updated.getMarket());
        rate.setRateDate(updated.getRateDate());

        return repository.save(rate);
    }

}
