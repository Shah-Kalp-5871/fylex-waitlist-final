-- Run this in your MySQL console or a client like phpMyAdmin/DBeaver

CREATE DATABASE IF NOT EXISTS fylex_waitlist;
USE fylex_waitlist;

CREATE TABLE IF NOT EXISTS waitlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone VARCHAR(20) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
