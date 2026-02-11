-- =====================================================
-- Jallikattu Sample Data
-- Run after jallikattudb.sql schema creation
-- =====================================================
USE `mydb`;
SET FOREIGN_KEY_CHECKS=0;

-- Clean existing data (order doesn't matter with FK checks off)
TRUNCATE TABLE `spot_prize_award`;
TRUNCATE TABLE `spot_prize`;
TRUNCATE TABLE `spot_prize_type`;
TRUNCATE TABLE `bull_player_interaction`;
TRUNCATE TABLE `bull_match_history`;
TRUNCATE TABLE `Player_Match_History`;
TRUNCATE TABLE `bull_table`;
TRUNCATE TABLE `owner`;
TRUNCATE TABLE `Match`;
TRUNCATE TABLE `player`;
TRUNCATE TABLE `prize`;
TRUNCATE TABLE `round_type`;
TRUNCATE TABLE `batch`;
TRUNCATE TABLE `bull_breed`;
TRUNCATE TABLE `organizer`;
TRUNCATE TABLE `location`;
TRUNCATE TABLE `app_user`;

-- =====================================================
-- 1. APP USERS (admin already inserted, add more roles)
-- =====================================================
-- Password: admin123 → SHA-256 hash
INSERT INTO `app_user` (`username`, `pass_hash`, `full_name`, `role`) VALUES
('superadmin',  SHA2('superadmin123', 256), 'Super Admin',       'super_admin'),
('admin',       SHA2('admin123', 256),      'Administrator',     'admin'),
('ravi_reg',    SHA2('ravi123', 256),       'Ravi Kumar',        'registrar'),
('scorer1',     SHA2('score123', 256),      'Murugan S',         'scorer'),
('sk_tamer',    SHA2('player123', 256),     'Senthil Kumar',     'player'),
('velu_bull',   SHA2('player123', 256),     'Velu Nachiyar',     'player'),
('muthu_king',  SHA2('player123', 256),     'Muthu Ramalingam',  'player'),
('kp_fighter',  SHA2('player123', 256),     'Karthik Pandian',   'player'),
('arjun_brave', SHA2('player123', 256),     'Arjun Thevar',      'player'),
('ramu_farm',   SHA2('owner123', 256),      'Ramu Thevar',       'owner'),
('selvam_bulls',SHA2('owner123', 256),      'Selvam Nadar',      'owner'),
('mpillai',     SHA2('owner123', 256),      'Murugesan Pillai',  'owner'),
('kannan_kc',   SHA2('owner123', 256),      'Kannan Chettiar',   'owner'),
('tg_gounder',  SHA2('owner123', 256),      'Thangavel Gounder', 'owner');

-- =====================================================
-- 2. LOOKUP TABLES
-- =====================================================

-- Locations (real Jallikattu towns in Tamil Nadu)
INSERT INTO `location` (`location_id`, `street`, `area`, `district`, `state`) VALUES
(1, 'Vadam Vaasal Road',   'Alanganallur',   'Madurai',      'Tamil Nadu'),
(2, 'Temple Street',       'Palamedu',       'Madurai',      'Tamil Nadu'),
(3, 'Main Road',           'Avaniapuram',    'Madurai',      'Tamil Nadu'),
(4, 'Bull Ring Arena',     'Suriyur',        'Trichy',       'Tamil Nadu'),
(5, 'Village Ground',      'Pudukottai',     'Pudukottai',   'Tamil Nadu');

-- Organizers
INSERT INTO `organizer` (`organizer_id`, `organizer_name`) VALUES
(1, 'Madurai Jallikattu Committee'),
(2, 'Palamedu Village Council'),
(3, 'Trichy Bulls Association'),
(4, 'Tamil Nadu Jallikattu Federation');

-- Bull Breeds (real Tamil Nadu native breeds)
INSERT INTO `bull_breed` (`bull_breed_id`, `bull_breed_name`) VALUES
(1, 'Kangayam'),
(2, 'Pulikulam'),
(3, 'Umbalachery'),
(4, 'Bargur'),
(5, 'Malai Maadu');

-- Batches
INSERT INTO `batch` (`batch_id`, `batch_name`) VALUES
(1, 'Batch A'),
(2, 'Batch B'),
(3, 'Batch C');

-- Round Types
INSERT INTO `round_type` (`round_type_id`, `round_name`) VALUES
(1, 'Round 1 - Qualifying'),
(2, 'Round 2 - Semi Final'),
(3, 'Round 3 - Final');

-- Prizes
INSERT INTO `prize` (`prize_id`, `prize`, `prize_provided_by`) VALUES
(1, 'Gold Medal + ₹50,000',     'Madurai District Admin'),
(2, 'Silver Medal + ₹25,000',   'Palamedu Panchayat'),
(3, 'Bronze Medal + ₹10,000',   'Trichy Bulls Association'),
(4, 'Best Bull Trophy + ₹1,00,000', 'Tamil Nadu Govt'),
(5, 'Best Tamer Trophy + ₹75,000',  'Jallikattu Federation');

-- =====================================================
-- 3. CORE TABLES
-- =====================================================

-- Players (10 players)
INSERT INTO `player` (`player_id`, `player_name`, `DOB`, `Aadhaar`, `Phone_number`) VALUES
(1,  'Senthil Kumar',   '1995-03-15', '123456789001', '9876543210'),
(2,  'Velu Nachiyar',   '1998-07-22', '123456789002', '9876543211'),
(3,  'Muthu Ramalingam','1993-11-05', '123456789003', '9876543212'),
(4,  'Karthik Pandian', '1997-01-18', '123456789004', '9876543213'),
(5,  'Arjun Thevar',    '1996-09-30', '123456789005', '9876543214'),
(6,  'Dhanush Raja',    '1999-04-12', '123456789006', '9876543215'),
(7,  'Manikandan V',    '1994-06-25', '123456789007', '9876543216'),
(8,  'Surya Prakash',   '2000-02-08', '123456789008', '9876543217'),
(9,  'Gowtham Raj',     '1997-12-01', '123456789009', '9876543218'),
(10, 'Vijay Anand',     '1995-08-20', '123456789010', '9876543219');

-- Owners (6 owners)
INSERT INTO `owner` (`owner_id`, `name`, `Aadhaar`) VALUES
(1, 'Ramu Thevar',        '987654321001'),
(2, 'Selvam Nadar',       '987654321002'),
(3, 'Murugesan Pillai',   '987654321003'),
(4, 'Kannan Chettiar',    '987654321004'),
(5, 'Thangavel Gounder',  '987654321005'),
(6, 'Balamurali Reddy',   '987654321006');

-- Bulls (12 bulls)
INSERT INTO `bull_table` (`bull_id`, `bull_name`, `age`, `owner_id`, `breed_id`, `fitness_certificate`) VALUES
(1,  'Veera Maadan',    5, 1, 1, 'FIT-2026-001'),
(2,  'Karuppu Raja',    4, 1, 2, 'FIT-2026-002'),
(3,  'Semma Bull',      6, 2, 1, 'FIT-2026-003'),
(4,  'Thangam',         3, 2, 3, 'FIT-2026-004'),
(5,  'Kodai Maan',      5, 3, 4, 'FIT-2026-005'),
(6,  'Vettri Raja',     4, 3, 2, 'FIT-2026-006'),
(7,  'Mega Star',       7, 4, 1, 'FIT-2026-007'),
(8,  'Thunder Bull',    4, 4, 5, 'FIT-2026-008'),
(9,  'Red Devil',       5, 5, 4, 'FIT-2026-009'),
(10, 'King Cobra',      6, 5, 2, 'FIT-2026-010'),
(11, 'Black Panther',   3, 6, 3, 'FIT-2026-011'),
(12, 'Storm Breaker',   5, 6, 1, 'FIT-2026-012');

-- =====================================================
-- 4. MATCHES (3 matches in different states)
-- =====================================================
INSERT INTO `match` (`match_id`, `match_name`, `location_id`, `match_date`, `player_limit`, `bull_limit`, `registered_player_count`, `registered_bull_count`, `organizer_id`, `status`) VALUES
(1, 'Alanganallur Pongal 2026',   1, '2026-01-15', 20, 30, 8, 10, 1, 'Completed'),
(2, 'Palamedu Championship 2026', 2, '2026-01-17', 15, 20, 6, 8,  2, 'Live'),
(3, 'Suriyur Grand Jallikattu',   4, '2026-02-20', 25, 35, 0, 0,  3, 'Scheduled');

-- =====================================================
-- 5. MATCH 1 (Completed) - PLAYER MATCH HISTORY
--    8 players × 3 rounds = 24 records, all approved
-- =====================================================

-- Round 1 - Qualifying
INSERT INTO `Player_Match_History` (`match_id`, `round_type_id`, `batch_id`, `bull_caught`, `penalties`, `player_id`, `status`) VALUES
(1, 1, 1, 5, 1, 1, 'approved'),
(1, 1, 1, 3, 0, 2, 'approved'),
(1, 1, 2, 6, 2, 3, 'approved'),
(1, 1, 2, 4, 1, 4, 'approved'),
(1, 1, 3, 7, 1, 5, 'approved'),
(1, 1, 3, 2, 0, 6, 'approved'),
(1, 1, 1, 5, 2, 7, 'approved'),
(1, 1, 2, 3, 1, 8, 'approved');

-- Round 2 - Semi Final
INSERT INTO `Player_Match_History` (`match_id`, `round_type_id`, `batch_id`, `bull_caught`, `penalties`, `player_id`, `status`) VALUES
(1, 2, 1, 4, 0, 1, 'approved'),
(1, 2, 1, 5, 1, 2, 'approved'),
(1, 2, 2, 3, 1, 3, 'approved'),
(1, 2, 2, 6, 0, 4, 'approved'),
(1, 2, 3, 5, 2, 5, 'approved'),
(1, 2, 3, 4, 1, 6, 'approved'),
(1, 2, 1, 3, 0, 7, 'approved'),
(1, 2, 2, 2, 1, 8, 'approved');

-- Round 3 - Final
INSERT INTO `Player_Match_History` (`match_id`, `round_type_id`, `batch_id`, `bull_caught`, `penalties`, `player_id`, `status`) VALUES
(1, 3, 1, 6, 1, 1, 'approved'),
(1, 3, 1, 4, 0, 2, 'approved'),
(1, 3, 2, 5, 2, 3, 'approved'),
(1, 3, 2, 7, 1, 4, 'approved'),
(1, 3, 3, 8, 0, 5, 'approved'),
(1, 3, 3, 3, 1, 6, 'approved'),
(1, 3, 1, 4, 1, 7, 'approved'),
(1, 3, 2, 5, 0, 8, 'approved');

-- =====================================================
-- 6. MATCH 1 (Completed) - BULL MATCH HISTORY
--    10 bulls × 3 rounds = 30 records, all approved
-- =====================================================

-- Round 1
INSERT INTO `bull_match_history` (`match_id`, `bull_id`, `player_id`, `aggression`, `play_area`, `difficulty`, `penalties`, `release_count`, `prize_id`, `round_type_id`, `winner`, `status`) VALUES
(1, 1,  1, 9, 8, 9, 0, 2, 1, 1, 1, 'approved'),
(1, 2,  2, 7, 6, 7, 1, 3, 2, 1, 0, 'approved'),
(1, 3,  3, 8, 7, 8, 0, 1, 3, 1, 0, 'approved'),
(1, 4,  4, 6, 5, 6, 0, 4, 2, 1, 0, 'approved'),
(1, 5,  5, 8, 9, 8, 1, 2, 1, 1, 0, 'approved'),
(1, 6,  6, 5, 4, 5, 0, 5, 3, 1, 0, 'approved'),
(1, 7,  7, 7, 6, 7, 0, 3, 2, 1, 0, 'approved'),
(1, 8,  8, 9, 8, 9, 0, 1, 1, 1, 0, 'approved'),
(1, 9,  1, 6, 7, 6, 1, 4, 3, 1, 0, 'approved'),
(1, 10, 2, 4, 5, 5, 0, 6, 2, 1, 0, 'approved');

-- Round 2
INSERT INTO `bull_match_history` (`match_id`, `bull_id`, `player_id`, `aggression`, `play_area`, `difficulty`, `penalties`, `release_count`, `prize_id`, `round_type_id`, `winner`, `status`) VALUES
(1, 1,  3, 8, 7, 8, 0, 2, 1, 2, 0, 'approved'),
(1, 2,  4, 6, 5, 6, 0, 3, 2, 2, 0, 'approved'),
(1, 3,  5, 9, 8, 9, 0, 1, 1, 2, 1, 'approved'),
(1, 4,  6, 5, 4, 5, 1, 5, 3, 2, 0, 'approved'),
(1, 5,  7, 7, 8, 7, 0, 2, 2, 2, 0, 'approved'),
(1, 6,  8, 4, 3, 4, 0, 6, 3, 2, 0, 'approved'),
(1, 7,  1, 8, 7, 8, 0, 2, 1, 2, 0, 'approved'),
(1, 8,  2, 7, 6, 7, 0, 3, 2, 2, 0, 'approved'),
(1, 9,  3, 5, 6, 5, 1, 4, 3, 2, 0, 'approved'),
(1, 10, 4, 6, 5, 6, 0, 4, 2, 2, 0, 'approved');

-- Round 3 (Final)
INSERT INTO `bull_match_history` (`match_id`, `bull_id`, `player_id`, `aggression`, `play_area`, `difficulty`, `penalties`, `release_count`, `prize_id`, `round_type_id`, `winner`, `status`) VALUES
(1, 1,  5, 9, 9, 10, 0, 1, 4, 3, 1, 'approved'),
(1, 2,  6, 7, 6, 7,  0, 3, 2, 3, 0, 'approved'),
(1, 3,  7, 8, 8, 9,  0, 1, 1, 3, 0, 'approved'),
(1, 4,  8, 5, 4, 5,  1, 5, 3, 3, 0, 'approved'),
(1, 5,  1, 8, 7, 8,  0, 2, 2, 3, 0, 'approved'),
(1, 6,  2, 3, 3, 4,  0, 7, 3, 3, 0, 'approved'),
(1, 7,  3, 7, 7, 8,  0, 2, 1, 3, 0, 'approved'),
(1, 8,  4, 8, 8, 9,  0, 1, 1, 3, 0, 'approved'),
(1, 9,  5, 6, 5, 6,  1, 4, 3, 3, 0, 'approved'),
(1, 10, 6, 5, 4, 5,  0, 5, 2, 3, 0, 'approved');

-- =====================================================
-- 7. MATCH 1 (Completed) - BULL PLAYER INTERACTIONS
--    Detailed hold data for key matchups
-- =====================================================
INSERT INTO `bull_player_interaction` (`match_id`, `round_type_id`, `player_id`, `bull_id`, `hold_sequence`, `hold_duration`) VALUES
-- Round 1 interactions
(1, 1, 1, 1, 1, 18),
(1, 1, 5, 5, 1, 22),
(1, 1, 3, 3, 1, 15),
(1, 1, 7, 7, 1, 12),
(1, 1, 8, 8, 1, 25),
-- Round 2 interactions
(1, 2, 5, 3, 1, 28),
(1, 2, 1, 7, 1, 20),
(1, 2, 3, 1, 1, 16),
(1, 2, 4, 10,1, 10),
-- Round 3 interactions
(1, 3, 5, 1, 1, 35),
(1, 3, 1, 5, 1, 19),
(1, 3, 3, 7, 1, 14),
(1, 3, 4, 8, 1, 30),
(1, 3, 7, 3, 1, 17);

-- =====================================================
-- 8. MATCH 2 (Live) - Partial scoring in progress
-- =====================================================

-- Player registrations: 6 players, approved for round 1, some for round 2
INSERT INTO `Player_Match_History` (`match_id`, `round_type_id`, `batch_id`, `bull_caught`, `penalties`, `player_id`, `status`) VALUES
-- Round 1 (scored)
(2, 1, 1, 4, 0, 1,  'approved'),
(2, 1, 1, 6, 1, 3,  'approved'),
(2, 1, 2, 3, 0, 5,  'approved'),
(2, 1, 2, 5, 1, 6,  'approved'),
(2, 1, 3, 7, 0, 9,  'approved'),
(2, 1, 3, 2, 1, 10, 'approved'),
-- Round 2 (in progress, partial scores)
(2, 2, 1, 3, 0, 1,  'approved'),
(2, 2, 1, 4, 0, 3,  'approved'),
(2, 2, 2, 5, 1, 5,  'approved'),
(2, 2, 2, 0, 0, 6,  'approved'),
(2, 2, 3, 0, 0, 9,  'approved'),
(2, 2, 3, 0, 0, 10, 'approved');

-- Bull registrations for Match 2
INSERT INTO `bull_match_history` (`match_id`, `bull_id`, `player_id`, `aggression`, `play_area`, `difficulty`, `penalties`, `release_count`, `prize_id`, `round_type_id`, `winner`, `status`) VALUES
-- Round 1 (scored)
(2, 1,  1, 8, 7, 8, 0, 2, 1, 1, 0, 'approved'),
(2, 3,  3, 7, 8, 7, 0, 1, 2, 1, 1, 'approved'),
(2, 5,  5, 9, 9, 9, 0, 1, 1, 1, 0, 'approved'),
(2, 7,  6, 6, 5, 6, 1, 4, 3, 1, 0, 'approved'),
(2, 9,  9, 5, 6, 5, 0, 3, 2, 1, 0, 'approved'),
(2, 11, 10,7, 7, 7, 0, 2, 2, 1, 0, 'approved'),
-- Round 2 (partial)
(2, 1,  3, 7, 6, 7, 0, 3, 2, 2, 0, 'approved'),
(2, 3,  5, 8, 7, 8, 0, 2, 1, 2, 0, 'approved'),
(2, 5,  1, 0, 0, 0, 0, 0, 1, 2, 0, 'approved'),
(2, 7,  9, 0, 0, 0, 0, 0, 1, 2, 0, 'approved');

-- Match 2 interactions (Round 1 only so far)
INSERT INTO `bull_player_interaction` (`match_id`, `round_type_id`, `player_id`, `bull_id`, `hold_sequence`, `hold_duration`) VALUES
(2, 1, 1, 1, 1, 20),
(2, 1, 3, 3, 1, 12),
(2, 1, 5, 5, 1, 30),
(2, 1, 9, 9, 1, 8);

-- =====================================================
-- 9. MATCH 3 (Scheduled) - Only future registrations
--    Some pending (registered), none approved yet
-- =====================================================

-- Pending player registrations
INSERT INTO `Player_Match_History` (`match_id`, `round_type_id`, `batch_id`, `bull_caught`, `penalties`, `player_id`, `status`) VALUES
(3, 1, 1, 0, 0, 2,  'registered'),
(3, 1, 1, 0, 0, 4,  'registered'),
(3, 1, 2, 0, 0, 6,  'registered'),
(3, 1, 2, 0, 0, 8,  'registered'),
(3, 1, 3, 0, 0, 10, 'registered');

-- Pending bull registrations
INSERT INTO `bull_match_history` (`match_id`, `bull_id`, `player_id`, `aggression`, `play_area`, `difficulty`, `penalties`, `release_count`, `prize_id`, `round_type_id`, `winner`, `status`) VALUES
(3, 2,  2, 0, 0, 0, 0, 0, 1, 1, 0, 'registered'),
(3, 4,  4, 0, 0, 0, 0, 0, 1, 1, 0, 'registered'),
(3, 6,  6, 0, 0, 0, 0, 0, 1, 1, 0, 'registered'),
(3, 8,  8, 0, 0, 0, 0, 0, 1, 1, 0, 'registered'),
(3, 10, 10,0, 0, 0, 0, 0, 1, 1, 0, 'registered'),
(3, 12, 10,0, 0, 0, 0, 0, 1, 1, 0, 'registered');

-- =====================================================
-- 10. SPOT PRIZES
-- =====================================================

-- Spot Prize Types
INSERT INTO `spot_prize_type` (`spot_prize_type_id`, `spot_prize_type_name`) VALUES
(1, 'Best Tamer'),
(2, 'Longest Hold'),
(3, 'Most Aggressive Bull'),
(4, 'Crowd Favourite'),
(5, 'Bravery Award');

-- Spot Prizes for Match 1 (Completed)
INSERT INTO `spot_prize` (`match_id`, `spot_type_id`, `sponsor_name`, `prize_title`, `quantity`, `created_time`) VALUES
(1, 1, 'Saravana Stores',    'Gold Ring 4g',          1, '2026-01-15 10:30:00'),
(1, 2, 'Pothys Silks',       'Silk Dhoti Set',        1, '2026-01-15 11:00:00'),
(1, 3, 'Local MLA Fund',     'Cash ₹5,000',           1, '2026-01-15 11:30:00'),
(1, 4, 'Jeyachandran Textiles','Shirt Voucher ₹2,000',2, '2026-01-15 12:00:00');

-- Spot Prizes for Match 2 (Live)
INSERT INTO `spot_prize` (`match_id`, `spot_type_id`, `sponsor_name`, `prize_title`, `quantity`, `created_time`) VALUES
(2, 1, 'GRT Jewellers',      'Silver Bracelet',       1, '2026-01-17 09:15:00'),
(2, 5, 'District SP Office', 'Bravery Shield',        1, '2026-01-17 10:00:00'),
(2, 2, 'RMKV Silks',         'Silk Veshti Set',       1, '2026-01-17 10:30:00');

-- Spot Prize Awards (Match 1 - all awarded)
INSERT INTO `spot_prize_award` (`player_id`, `spot_prize_id`, `bull_id`, `awarded_time`) VALUES
(5, 1, 1, '2026-01-15 14:30:00'),   -- Arjun: Best Tamer with Veera Maadan
(8, 2, 8, '2026-01-15 15:00:00'),   -- Surya: Longest Hold with Thunder Bull
(1, 3, 1, '2026-01-15 15:30:00'),   -- Senthil: Most Aggressive Bull (Veera Maadan)
(3, 4, 3, '2026-01-15 16:00:00');   -- Muthu: Crowd Favourite with Semma Bull

-- Spot Prize Awards (Match 2 - one awarded so far)
INSERT INTO `spot_prize_award` (`player_id`, `spot_prize_id`, `bull_id`, `awarded_time`) VALUES
(5, 5, 5, '2026-01-17 11:00:00');   -- Arjun: Bravery Award with Kodai Maan

-- =====================================================
-- 11. LINK OWNERS & PLAYERS TO APP_USER ACCOUNTS
-- =====================================================
UPDATE owner o JOIN app_user u ON o.name = u.full_name AND u.role = 'owner' SET o.user_id = u.user_id;
UPDATE player p JOIN app_user u ON p.player_name = u.full_name AND u.role = 'player' SET p.user_id = u.user_id;

SET FOREIGN_KEY_CHECKS=1;

-- =====================================================
-- VERIFICATION
-- =====================================================
SELECT '--- RECORD COUNTS ---' AS Info;
SELECT 'app_user' AS tbl, COUNT(*) AS cnt FROM app_user
UNION ALL SELECT 'location', COUNT(*) FROM location
UNION ALL SELECT 'organizer', COUNT(*) FROM organizer
UNION ALL SELECT 'bull_breed', COUNT(*) FROM bull_breed
UNION ALL SELECT 'batch', COUNT(*) FROM batch
UNION ALL SELECT 'round_type', COUNT(*) FROM round_type
UNION ALL SELECT 'prize', COUNT(*) FROM prize
UNION ALL SELECT 'player', COUNT(*) FROM player
UNION ALL SELECT 'owner', COUNT(*) FROM owner
UNION ALL SELECT 'bull_table', COUNT(*) FROM bull_table
UNION ALL SELECT 'match', COUNT(*) FROM `match`
UNION ALL SELECT 'player_match_history', COUNT(*) FROM player_match_history
UNION ALL SELECT 'bull_match_history', COUNT(*) FROM bull_match_history
UNION ALL SELECT 'bull_player_interaction', COUNT(*) FROM bull_player_interaction;
