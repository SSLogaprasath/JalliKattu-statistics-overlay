-- =====================================================
-- Jallikattu Schema Migration v3
-- Adds: disqualified status for players and bulls
-- =====================================================

-- Extend the status ENUM on both history tables to support disqualification
ALTER TABLE player_match_history MODIFY COLUMN status ENUM('registered','approved','disqualified') DEFAULT 'registered';
ALTER TABLE bull_match_history   MODIFY COLUMN status ENUM('registered','approved','disqualified') DEFAULT 'registered';

SELECT 'Migration v3: disqualified status added' AS result;
