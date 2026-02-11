-- ============================================================
-- RESET TEST DATA (preserving all app_user rows)
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Clean up everything for matches 3+
DELETE FROM foul;
DELETE FROM spot_prize_award WHERE spot_prize_id IN (SELECT spot_prize_id FROM spot_prize WHERE match_id > 2);
DELETE FROM spot_prize WHERE match_id > 2;
DELETE FROM match_round_config WHERE match_id > 2;
DELETE FROM bull_match_history WHERE match_id > 2;
DELETE FROM player_match_history WHERE match_id > 2;
DELETE FROM `match` WHERE match_id > 2;

SET FOREIGN_KEY_CHECKS = 1;

-- 2. Add 15 new players (IDs 11-25) - explicit IDs since not auto_increment
INSERT INTO player (player_id, player_name, DOB, Aadhaar, Phone_number) VALUES
(11, 'Rajesh Kumar',    '1996-05-10', '123456789011', '9876543220'),
(12, 'Arun Prasad',     '1998-03-22', '123456789012', '9876543221'),
(13, 'Bala Murugan',    '1994-11-08', '123456789013', '9876543222'),
(14, 'Chandra Sekar',   '1997-07-15', '123456789014', '9876543223'),
(15, 'Dinesh Kumar',    '1995-09-28', '123456789015', '9876543224'),
(16, 'Ezhil Arasan',    '1999-01-05', '123456789016', '9876543225'),
(17, 'Ganesh Babu',     '1993-06-18', '123456789017', '9876543226'),
(18, 'Hari Krishnan',   '1998-12-03', '123456789018', '9876543227'),
(19, 'Ilango Vel',      '1996-04-25', '123456789019', '9876543228'),
(20, 'Jayaraj Pandian', '2000-08-12', '123456789020', '9876543229'),
(21, 'Kumaran Selvam',  '1994-02-14', '123456789021', '9876543230'),
(22, 'Lingam Thevar',   '1997-10-30', '123456789022', '9876543231'),
(23, 'Mani Kandan',     '1995-07-07', '123456789023', '9876543232'),
(24, 'Naveen Raj',      '1999-05-19', '123456789024', '9876543233'),
(25, 'Om Prakash',      '1993-03-01', '123456789025', '9876543234');

-- 3. Add 2 more owners + 8 more bulls - explicit IDs
INSERT INTO owner (owner_id, name, Aadhaar) VALUES
(7, 'Sundar Rajan',   '987654321007'),
(8, 'Velan Gounder',  '987654321008');

INSERT INTO bull_table (bull_id, bull_name, age, owner_id, breed_id, fitness_certificate) VALUES
(13, 'Iron Horn',     4, 7, 1, 'FIT-2026-013'),
(14, 'Golden Bull',   5, 7, 3, 'FIT-2026-014'),
(15, 'Silver Streak', 3, 7, 2, 'FIT-2026-015'),
(16, 'Dark Knight',   6, 8, 4, 'FIT-2026-016'),
(17, 'Wild Thunder',  4, 8, 5, 'FIT-2026-017'),
(18, 'Fire Storm',    5, 8, 1, 'FIT-2026-018'),
(19, 'Stone Bull',    7, 1, 3, 'FIT-2026-019'),
(20, 'Flash Point',   3, 2, 2, 'FIT-2026-020');

-- ============================================================
-- MATCH 3: Pudukottai Pongal Jallikattu (capacity 20, 25 players → 2 batches)
-- ============================================================
INSERT INTO `match` (match_id, match_name, location_id, match_date, registration_deadline, player_limit, bull_limit, registered_player_count, registered_bull_count, organizer_id, status) VALUES
(3, 'Pudukottai Pongal Jallikattu', 5, '2026-02-25', '2026-02-20 18:00:00', 50, 30, 25, 18, 4, 'Scheduled');

-- Register all 25 players for match 3 (round 1, batch 1 default, approved, pending draw)
INSERT INTO player_match_history (match_id, round_type_id, batch_id, bull_caught, penalties, player_id, status, advancement_status) VALUES
(3, 1, 1, 0, 0,  1, 'approved', 'pending'),
(3, 1, 1, 0, 0,  2, 'approved', 'pending'),
(3, 1, 1, 0, 0,  3, 'approved', 'pending'),
(3, 1, 1, 0, 0,  4, 'approved', 'pending'),
(3, 1, 1, 0, 0,  5, 'approved', 'pending'),
(3, 1, 1, 0, 0,  6, 'approved', 'pending'),
(3, 1, 1, 0, 0,  7, 'approved', 'pending'),
(3, 1, 1, 0, 0,  8, 'approved', 'pending'),
(3, 1, 1, 0, 0,  9, 'approved', 'pending'),
(3, 1, 1, 0, 0, 10, 'approved', 'pending'),
(3, 1, 1, 0, 0, 11, 'approved', 'pending'),
(3, 1, 1, 0, 0, 12, 'approved', 'pending'),
(3, 1, 1, 0, 0, 13, 'approved', 'pending'),
(3, 1, 1, 0, 0, 14, 'approved', 'pending'),
(3, 1, 1, 0, 0, 15, 'approved', 'pending'),
(3, 1, 1, 0, 0, 16, 'approved', 'pending'),
(3, 1, 1, 0, 0, 17, 'approved', 'pending'),
(3, 1, 1, 0, 0, 18, 'approved', 'pending'),
(3, 1, 1, 0, 0, 19, 'approved', 'pending'),
(3, 1, 1, 0, 0, 20, 'approved', 'pending'),
(3, 1, 1, 0, 0, 21, 'approved', 'pending'),
(3, 1, 1, 0, 0, 22, 'approved', 'pending'),
(3, 1, 1, 0, 0, 23, 'approved', 'pending'),
(3, 1, 1, 0, 0, 24, 'approved', 'pending'),
(3, 1, 1, 0, 0, 25, 'approved', 'pending');

-- Register 18 bulls for match 3 (approved, ready for queue assignment)
INSERT INTO bull_match_history (match_id, bull_id, player_id, aggression, play_area, difficulty, penalties, release_order, prize_id, round_type_id, winner, status, batch_id) VALUES
(3,  1, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3,  2, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3,  3, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3,  4, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3,  5, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3,  6, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3,  7, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3,  8, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3,  9, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3, 10, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3, 11, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3, 12, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3, 13, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3, 14, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3, 15, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3, 16, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3, 17, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(3, 18, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL);

-- ============================================================
-- MATCH 4: Alanganallur Summer Jallikattu (capacity 40, 15 players → 1 batch)
-- ============================================================
INSERT INTO `match` (match_id, match_name, location_id, match_date, registration_deadline, player_limit, bull_limit, registered_player_count, registered_bull_count, organizer_id, status) VALUES
(4, 'Alanganallur Summer Jallikattu', 1, '2026-03-10', '2026-03-05 18:00:00', 40, 30, 15, 12, 1, 'Scheduled');

-- Register 15 players for match 4
INSERT INTO player_match_history (match_id, round_type_id, batch_id, bull_caught, penalties, player_id, status, advancement_status) VALUES
(4, 1, 1, 0, 0,  1, 'approved', 'pending'),
(4, 1, 1, 0, 0,  2, 'approved', 'pending'),
(4, 1, 1, 0, 0,  3, 'approved', 'pending'),
(4, 1, 1, 0, 0,  4, 'approved', 'pending'),
(4, 1, 1, 0, 0,  5, 'approved', 'pending'),
(4, 1, 1, 0, 0,  6, 'approved', 'pending'),
(4, 1, 1, 0, 0,  7, 'approved', 'pending'),
(4, 1, 1, 0, 0,  8, 'approved', 'pending'),
(4, 1, 1, 0, 0,  9, 'approved', 'pending'),
(4, 1, 1, 0, 0, 10, 'approved', 'pending'),
(4, 1, 1, 0, 0, 11, 'approved', 'pending'),
(4, 1, 1, 0, 0, 13, 'approved', 'pending'),
(4, 1, 1, 0, 0, 15, 'approved', 'pending'),
(4, 1, 1, 0, 0, 17, 'approved', 'pending'),
(4, 1, 1, 0, 0, 19, 'approved', 'pending');

-- Register 12 bulls for match 4
INSERT INTO bull_match_history (match_id, bull_id, player_id, aggression, play_area, difficulty, penalties, release_order, prize_id, round_type_id, winner, status, batch_id) VALUES
(4,  1, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(4,  2, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(4,  3, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(4,  5, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(4,  7, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(4,  9, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(4, 11, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(4, 13, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(4, 14, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(4, 16, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(4, 18, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL),
(4, 20, NULL, 0, 0, 0, 0, 0, NULL, 1, 0, 'approved', NULL);

-- ============================================================
-- Add spot prizes for match 3 (so the prizes page has data too)
-- ============================================================
INSERT INTO spot_prize (match_id, spot_type_id, sponsor_name, prize_title, quantity, created_time) VALUES
(3, 1, 'Kumaran Jewellery', 'Gold Chain 5g', 1, '2026-02-25 10:00:00'),
(3, 2, 'Ramraj Cotton', 'Premium Dhoti Set', 2, '2026-02-25 10:30:00'),
(3, 3, 'Local Panchayat', 'Cash Rs.10,000', 1, '2026-02-25 11:00:00'),
(3, 5, 'District Collector Office', 'Valor Shield', 1, '2026-02-25 11:30:00');

SELECT 'Test data reset complete!' AS result;
