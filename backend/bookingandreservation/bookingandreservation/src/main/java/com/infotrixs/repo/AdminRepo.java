package com.infotrixs.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infotrixs.entities.Admin;

public interface AdminRepo extends JpaRepository<Admin, Integer> {

    Admin findByUsername(String username);

}
