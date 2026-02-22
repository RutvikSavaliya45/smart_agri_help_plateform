package com.agrihelp.agrihelp_backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "crop_info")
public class CropInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cropName;
    private String season;
    private String soilType;
    private String irrigation;
    private String fertilizer;
    private String diseaseControl;
}
