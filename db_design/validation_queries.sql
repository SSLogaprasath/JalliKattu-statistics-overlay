-- =====================================================
-- JALLIKATTU DATABASE VALIDATION QUERIES
-- Generated: 2026-02-07
-- Schema: mydb (11 tables)
-- =====================================================

-- =====================================================
-- 1. VERIFY ALL TABLES EXIST
-- =====================================================

SHOW TABLES;

-- Expected tables:
-- player, Match, Player_Match_History, bull_table, bull_match_history,
-- owner, bull_breed, batch, round_type, location, prize

-- =====================================================
-- 2. VERIFY TABLE STRUCTURES
-- =====================================================

DESCRIBE player;
-- Expected: player_id (PK), player_name, DOB, Aadhaar, Phone_number

DESCRIBE `Match`;
-- Expected: match_id (PK), match_name, location_id (FK), match_date, player_limit, bull_limit, registered_player_count, registered_bull_count

DESCRIBE Player_Match_History;
-- Expected: match_id (PK,FK), player_id (PK,FK), round_type_id (PK,FK), batch_id (FK), bull_caught, penalties

DESCRIBE bull_table;
-- Expected: bull_id (PK), bull_name, age, owner_id (FK), breed_id (FK), fitness_certificate

DESCRIBE bull_match_history;
-- Expected: match_id (PK,FK), bull_id (PK,FK), player_id (FK), aggression, play_area, difficulty, penalties, release_count, prize_id (FK)

DESCRIBE owner;
-- Expected: owner_id (PK), name, Aadhaar (UNIQUE)

DESCRIBE bull_breed;
-- Expected: bull_breed_id (PK), bull_breed_name

DESCRIBE batch;
-- Expected: batch_id (PK), batch_name

DESCRIBE round_type;
-- Expected: round_type_id (PK), round_name

DESCRIBE location;
-- Expected: location_id (PK), street, area, district, state

DESCRIBE prize;
-- Expected: prize_id (PK), prize, prize_provided_by

-- =====================================================
-- 3. VERIFY PRIMARY KEYS
-- =====================================================

SELECT 
    TABLE_NAME, 
    COLUMN_NAME, 
    CONSTRAINT_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'mydb'
    AND CONSTRAINT_NAME = 'PRIMARY'
ORDER BY TABLE_NAME, ORDINAL_POSITION;

-- Check for tables missing primary keys (should return empty)
SELECT t.TABLE_NAME AS 'Tables Without Primary Key'
FROM INFORMATION_SCHEMA.TABLES t
LEFT JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
    ON t.TABLE_NAME = tc.TABLE_NAME 
    AND t.TABLE_SCHEMA = tc.TABLE_SCHEMA
    AND tc.CONSTRAINT_TYPE = 'PRIMARY KEY'
WHERE t.TABLE_SCHEMA = 'mydb'
    AND t.TABLE_TYPE = 'BASE TABLE'
    AND tc.CONSTRAINT_NAME IS NULL;

-- =====================================================
-- 4. VERIFY FOREIGN KEY RELATIONSHIPS
-- =====================================================

SELECT 
    kcu.TABLE_NAME AS 'Child Table',
    kcu.COLUMN_NAME AS 'FK Column',
    kcu.REFERENCED_TABLE_NAME AS 'Parent Table',
    kcu.REFERENCED_COLUMN_NAME AS 'PK Column',
    rc.UPDATE_RULE,
    rc.DELETE_RULE
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
JOIN INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS rc
    ON kcu.CONSTRAINT_NAME = rc.CONSTRAINT_NAME
    AND kcu.TABLE_SCHEMA = rc.CONSTRAINT_SCHEMA
WHERE kcu.TABLE_SCHEMA = 'mydb'
    AND kcu.REFERENCED_TABLE_NAME IS NOT NULL
ORDER BY kcu.TABLE_NAME, kcu.COLUMN_NAME;

-- Expected FK relationships:
-- player.player_id ← Player_Match_History.player_id
-- Match.match_id ← Player_Match_History.match_id
-- Match.match_id ← bull_match_history.match_id
-- bull_table.bull_id ← bull_match_history.bull_id
-- player.player_id ← bull_match_history.player_id
-- prize.prize_id ← bull_match_history.prize_id
-- owner.owner_id ← bull_table.owner_id
-- bull_breed.bull_breed_id ← bull_table.breed_id
-- batch.batch_id ← Player_Match_History.batch_id
-- round_type.round_type_id ← Player_Match_History.round_type_id
-- location.location_id ← Match.location_id

-- =====================================================
-- 5. VERIFY UNIQUE CONSTRAINTS
-- =====================================================

SELECT 
    tc.TABLE_NAME,
    tc.CONSTRAINT_NAME,
    kcu.COLUMN_NAME
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
    ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
    AND tc.TABLE_SCHEMA = kcu.TABLE_SCHEMA
WHERE tc.TABLE_SCHEMA = 'mydb'
    AND tc.CONSTRAINT_TYPE = 'UNIQUE'
ORDER BY tc.TABLE_NAME;

-- Expected: owner.Aadhaar should have UNIQUE constraint

-- =====================================================
-- 6. VERIFY DATA TYPES
-- =====================================================

SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    IS_NULLABLE,
    COLUMN_KEY,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'mydb'
ORDER BY TABLE_NAME, ORDINAL_POSITION;

-- =====================================================
-- 7. VERIFY INDEXES
-- =====================================================

SELECT 
    TABLE_NAME,
    INDEX_NAME,
    COLUMN_NAME,
    NON_UNIQUE,
    SEQ_IN_INDEX
FROM INFORMATION_SCHEMA.STATISTICS
WHERE TABLE_SCHEMA = 'mydb'
ORDER BY TABLE_NAME, INDEX_NAME, SEQ_IN_INDEX;

-- =====================================================
-- 8. REFERENTIAL INTEGRITY TESTS (Run after inserting data)
-- =====================================================

-- Find orphan records in Player_Match_History
SELECT pmh.* FROM Player_Match_History pmh
LEFT JOIN player p ON pmh.player_id = p.player_id
WHERE p.player_id IS NULL;

SELECT pmh.* FROM Player_Match_History pmh
LEFT JOIN `Match` m ON pmh.match_id = m.match_id
WHERE m.match_id IS NULL;

SELECT pmh.* FROM Player_Match_History pmh
LEFT JOIN round_type rt ON pmh.round_type_id = rt.round_type_id
WHERE rt.round_type_id IS NULL;

SELECT pmh.* FROM Player_Match_History pmh
LEFT JOIN batch b ON pmh.batch_id = b.batch_id
WHERE b.batch_id IS NULL;

-- Find orphan records in bull_match_history
SELECT bmh.* FROM bull_match_history bmh
LEFT JOIN `Match` m ON bmh.match_id = m.match_id
WHERE m.match_id IS NULL;

SELECT bmh.* FROM bull_match_history bmh
LEFT JOIN bull_table bt ON bmh.bull_id = bt.bull_id
WHERE bt.bull_id IS NULL;

SELECT bmh.* FROM bull_match_history bmh
LEFT JOIN player p ON bmh.player_id = p.player_id
WHERE p.player_id IS NULL;

SELECT bmh.* FROM bull_match_history bmh
LEFT JOIN prize pr ON bmh.prize_id = pr.prize_id
WHERE pr.prize_id IS NULL AND bmh.prize_id IS NOT NULL;

-- Find orphan records in bull_table
SELECT bt.* FROM bull_table bt
LEFT JOIN owner o ON bt.owner_id = o.owner_id
WHERE o.owner_id IS NULL;

SELECT bt.* FROM bull_table bt
LEFT JOIN bull_breed bb ON bt.breed_id = bb.bull_breed_id
WHERE bb.bull_breed_id IS NULL;

-- Find orphan records in Match
SELECT m.* FROM `Match` m
LEFT JOIN location l ON m.location_id = l.location_id
WHERE l.location_id IS NULL;

-- =====================================================
-- 9. SAMPLE DATA INSERT TEST (To validate constraints work)
-- =====================================================

-- Run inserts in this order to respect FK dependencies:

-- Step 1: Insert lookup tables (no dependencies)
INSERT INTO location (location_id, street, area, district, state) 
VALUES (1, 'Temple Street', 'Central', 'Madurai', 'Tamil Nadu');

INSERT INTO bull_breed (bull_breed_id, bull_breed_name) 
VALUES (1, 'Kangayam'), (2, 'Pulikulam'), (3, 'Umbalachery');

INSERT INTO batch (batch_id, batch_name) 
VALUES (1, 'Batch A'), (2, 'Batch B'), (3, 'Batch C');

INSERT INTO round_type (round_type_id, round_name) 
VALUES (1, 'Preliminary'), (2, 'Quarter Final'), (3, 'Semi Final'), (4, 'Final');

INSERT INTO prize (prize_id, prize, prize_provided_by) 
VALUES (1, 'Gold Medal', 'District Committee'),
       (2, 'Silver Medal', 'District Committee'),
       (3, 'Car', 'Local Sponsor');

-- Step 2: Insert owner (no dependencies)
INSERT INTO owner (owner_id, name, Aadhaar) 
VALUES (1, 'Muthu Rajan', '123456789012');

-- Step 3: Insert player (no dependencies)
INSERT INTO player (player_id, player_name, DOB, Aadhaar, Phone_number) 
VALUES (1, 'Karuppusamy', '1995-03-15', '987654321012', '9876543210');

-- Step 4: Insert Match (depends on location)
INSERT INTO `Match` (match_id, match_name, location_id, match_date, player_limit, bull_limit, registered_player_count, registered_bull_count) 
VALUES (1, 'Alanganallur 2026', 1, '2026-01-15', 100, 50, 1, 1);

-- Step 5: Insert bull_table (depends on owner, bull_breed)
INSERT INTO bull_table (bull_id, bull_name, age, owner_id, breed_id, fitness_certificate) 
VALUES (1, 'Karuppu', 5, 1, 1, 'CERT001');

-- Step 6: Insert Player_Match_History (depends on player, Match, round_type, batch)
INSERT INTO Player_Match_History (match_id, player_id, round_type_id, batch_id, bull_caught, penalties) 
VALUES (1, 1, 1, 1, 3, 0);

-- Step 7: Insert bull_match_history (depends on Match, bull_table, player, prize)
INSERT INTO bull_match_history (match_id, bull_id, player_id, aggression, play_area, difficulty, penalties, release_count, prize_id) 
VALUES (1, 1, 1, 8, 7, 9, 0, 2, 1);

-- =====================================================
-- 10. CLEANUP TEST DATA (Run in reverse order)
-- =====================================================

-- DELETE FROM bull_match_history WHERE match_id = 1;
-- DELETE FROM Player_Match_History WHERE match_id = 1;
-- DELETE FROM bull_table WHERE bull_id = 1;
-- DELETE FROM `Match` WHERE match_id = 1;
-- DELETE FROM player WHERE player_id = 1;
-- DELETE FROM owner WHERE owner_id = 1;
-- DELETE FROM prize WHERE prize_id IN (1, 2, 3);
-- DELETE FROM round_type WHERE round_type_id IN (1, 2, 3, 4);
-- DELETE FROM batch WHERE batch_id IN (1, 2, 3);
-- DELETE FROM bull_breed WHERE bull_breed_id IN (1, 2, 3);
-- DELETE FROM location WHERE location_id = 1;

-- =====================================================
-- 11. CARDINALITY VALIDATION (After data exists)
-- =====================================================

-- Count players per match
SELECT m.match_id, m.match_name, COUNT(DISTINCT pmh.player_id) AS players_registered
FROM `Match` m
LEFT JOIN Player_Match_History pmh ON m.match_id = pmh.match_id
GROUP BY m.match_id, m.match_name;

-- Count bulls per owner
SELECT o.owner_id, o.name, COUNT(bt.bull_id) AS bulls_owned
FROM owner o
LEFT JOIN bull_table bt ON o.owner_id = bt.owner_id
GROUP BY o.owner_id, o.name;

-- Count bulls per breed
SELECT bb.bull_breed_name, COUNT(bt.bull_id) AS bull_count
FROM bull_breed bb
LEFT JOIN bull_table bt ON bb.bull_breed_id = bt.breed_id
GROUP BY bb.bull_breed_id, bb.bull_breed_name;

-- Matches per location
SELECT l.district, COUNT(m.match_id) AS match_count
FROM location l
LEFT JOIN `Match` m ON l.location_id = m.location_id
GROUP BY l.location_id, l.district;
