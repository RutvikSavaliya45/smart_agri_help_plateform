package com.agrihelp.agrihelp_backend.repository;

import com.agrihelp.agrihelp_backend.model.CropInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropInfoRepository extends JpaRepository<CropInfo, Long> {
}
