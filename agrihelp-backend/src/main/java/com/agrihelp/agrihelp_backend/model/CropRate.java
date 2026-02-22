package com.agrihelp.agrihelp_backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "crop_rates")
public class CropRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cropName;
    private double highPrice;
    private double lowPrice;
    private String market;
    private LocalDate rateDate;
}