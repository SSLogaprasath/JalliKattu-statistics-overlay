-- Migration v4: News articles table
-- Run this against the `mydb` schema

USE `mydb`;

CREATE TABLE IF NOT EXISTS `news_article` (
  `article_id`     INT          NOT NULL AUTO_INCREMENT,
  `title`          VARCHAR(200) NOT NULL,
  `snippet`        TEXT         NULL,
  `image_url`      VARCHAR(500) NULL,
  `source_name`    VARCHAR(100) NULL       COMMENT 'e.g. The Hindu, NDTV',
  `source_url`     VARCHAR(500) NULL       COMMENT 'Link to original article',
  `category`       ENUM('Latest News','Match Reports','History & Culture',
                        'Rules & Regulations','Player/Bull Spotlights',
                        'Event Announcements')
                   NOT NULL DEFAULT 'Latest News',
  `is_featured`    TINYINT(1)   NOT NULL DEFAULT 0,
  `published_date` DATE         NULL,
  `created_by`     INT          NULL       COMMENT 'FK to app_user.user_id',
  `created_at`     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`article_id`),
  INDEX `idx_category` (`category`),
  INDEX `idx_featured` (`is_featured`),
  INDEX `idx_published` (`published_date` DESC)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- Sample articles
INSERT INTO `news_article` (`title`, `snippet`, `image_url`, `source_name`, `source_url`, `category`, `is_featured`, `published_date`) VALUES
('Jallikattu 2026: Madurai Alanganallur Gears Up for Grand Event',
 'The iconic Alanganallur village in Madurai district is set to host this year''s biggest Jallikattu event with over 1,200 bulls and 800 tamers registered.',
 'https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=600',
 'The Hindu', 'https://www.thehindu.com', 'Latest News', 1, '2026-02-08'),

('Top 10 Bull Tamers of 2025 Season: Where Are They Now?',
 'We catch up with last season''s champion tamers to see how they''re preparing for the upcoming events.',
 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=600',
 'Dinamalar', 'https://www.dinamalar.com', 'Player/Bull Spotlights', 0, '2026-02-05'),

('Understanding Jallikattu Rules: A Complete Guide for New Viewers',
 'From the vaadi vaasal to the scoring system, here''s everything you need to know about the rules of Jallikattu.',
 NULL, 'JallikattuStats', NULL, 'Rules & Regulations', 0, '2026-02-01'),

('Palamedu Jallikattu 2026 Results: Record-Breaking Performances',
 'This year''s Palamedu event saw unprecedented participation with 3 bulls remaining uncaught through all rounds.',
 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600',
 'Times of India', 'https://timesofindia.com', 'Match Reports', 1, '2026-01-28'),

('The Ancient Origins of Jallikattu: 2,000 Years of Tradition',
 'Archaeological evidence from the Indus Valley civilization suggests bull-taming sports have been part of South Asian culture for millennia.',
 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600',
 'JallikattuStats', NULL, 'History & Culture', 0, '2026-01-20'),

('Animal Welfare Board Approves New Safety Protocols for 2026 Season',
 'Enhanced veterinary checkups and mandatory fitness certificates for all participating bulls have been announced.',
 NULL, 'NDTV', 'https://www.ndtv.com', 'Rules & Regulations', 0, '2026-01-15');
