package com.agrihelp.agrihelp_backend.repository;

import com.agrihelp.agrihelp_backend.model.CropRate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CropRateRepository extends JpaRepository<CropRate, Long> {

    List<CropRate> findByMarket(String market);
}
