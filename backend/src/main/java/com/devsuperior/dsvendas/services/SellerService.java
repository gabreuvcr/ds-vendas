package com.devsuperior.dsvendas.services;

import com.devsuperior.dsvendas.dto.SellerDTO;
import com.devsuperior.dsvendas.entities.Seller;
import com.devsuperior.dsvendas.repositories.SellerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SellerService {
    private final SellerRepository repository;

    public SellerService(SellerRepository repository) {
        this.repository = repository;
    }

    public List<SellerDTO> findAll() {
        List<Seller> sellers = repository.findAll();
        return sellers.stream().map(seller -> new SellerDTO(seller)).collect(Collectors.toList());
    }
}
