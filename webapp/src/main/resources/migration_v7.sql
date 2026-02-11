-- ═══════════════════════════════════════════════════════════════
-- Migration V7 — Match Draw, Arena Capacity, Fouls, Round Config
-- ═══════════════════════════════════════════════════════════════
USE mydb;
SET FOREIGN_KEY_CHECKS = 0;

-- ─── 1. Arena capacity on location ───────────────────────────
ALTER TABLE location ADD COLUMN arena_capacity INT NOT NULL DEFAULT 30;
UPDATE location SET arena_capacity = 40 WHERE location_id = 1;
UPDATE location SET arena_capacity = 30 WHERE location_id IN (2, 3);
UPDATE location SET arena_capacity = 25 WHERE location_id = 4;
UPDATE location SET arena_capacity = 20 WHERE location_id = 5;

-- ─── 2. Advancement status on Player_Match_History ───────────
ALTER TABLE Player_Match_History
  ADD COLUMN advancement_status ENUM('pending','qualified','eliminated') DEFAULT 'pending';

-- ─── 3. bull_match_history: PK → (match_id, bull_id) ────────
-- De-duplicate: keep only the lowest round (one bull, one release per match)
DELETE bmh FROM bull_match_history bmh
INNER JOIN (
    SELECT match_id, bull_id, MIN(round_type_id) AS min_round
    FROM bull_match_history
    GROUP BY match_id, bull_id
    HAVING COUNT(*) > 1
) dup ON bmh.match_id = dup.match_id AND bmh.bull_id = dup.bull_id
WHERE bmh.round_type_id > dup.min_round;

-- Also clean up duplicate interactions referencing removed rounds
DELETE bpi FROM bull_player_interaction bpi
LEFT JOIN bull_match_history bmh
  ON bpi.match_id = bmh.match_id AND bpi.bull_id = bmh.bull_id
WHERE bmh.bull_id IS NULL;

-- Drop old PK (match_id, bull_id, round_type_id)
ALTER TABLE bull_match_history DROP PRIMARY KEY;

-- Make columns nullable for the new workflow
ALTER TABLE bull_match_history
  MODIFY COLUMN player_id INT NULL,
  MODIFY COLUMN aggression INT NULL DEFAULT 0,
  MODIFY COLUMN play_area INT NULL DEFAULT 0,
  MODIFY COLUMN difficulty INT NULL DEFAULT 0,
  MODIFY COLUMN prize_id INT NULL,
  CHANGE COLUMN release_count release_order INT NULL;

-- Add batch_id
ALTER TABLE bull_match_history ADD COLUMN batch_id INT NULL;

-- New PK: one bull, one release per match
ALTER TABLE bull_match_history ADD PRIMARY KEY (match_id, bull_id);

-- Add batch FK
ALTER TABLE bull_match_history ADD CONSTRAINT fk_bmh_batch
  FOREIGN KEY (batch_id) REFERENCES batch(batch_id);

-- ─── 4. match_round_config table ─────────────────────────────
CREATE TABLE IF NOT EXISTS match_round_config (
  match_id      INT NOT NULL,
  round_type_id INT NOT NULL,
  advance_count INT NULL,
  bull_start    INT NULL,
  bull_end      INT NULL,
  PRIMARY KEY (match_id, round_type_id),
  CONSTRAINT fk_mrc_match FOREIGN KEY (match_id) REFERENCES `match`(match_id),
  CONSTRAINT fk_mrc_round FOREIGN KEY (round_type_id) REFERENCES round_type(round_type_id)
) ENGINE = InnoDB;

-- ─── 5. foul table (player + bull fouls) ─────────────────────
CREATE TABLE IF NOT EXISTS foul (
  foul_id       INT NOT NULL AUTO_INCREMENT,
  match_id      INT NOT NULL,
  round_type_id INT NOT NULL,
  bull_id       INT NOT NULL,
  player_id     INT NULL,
  foul_type     ENUM(
    'holding_tail','illegal_horn_grab','tripping_bull','multi_grab','entering_early',
    'goring','barrier_jump','spectator_charge','passive_refusal','other'
  ) NOT NULL,
  notes         VARCHAR(255) NULL,
  recorded_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (foul_id),
  CONSTRAINT fk_foul_match  FOREIGN KEY (match_id) REFERENCES `match`(match_id),
  CONSTRAINT fk_foul_round  FOREIGN KEY (round_type_id) REFERENCES round_type(round_type_id),
  CONSTRAINT fk_foul_bull   FOREIGN KEY (bull_id) REFERENCES bull_table(bull_id),
  CONSTRAINT fk_foul_player FOREIGN KEY (player_id) REFERENCES player(player_id)
) ENGINE = InnoDB;

-- ─── 6. Pre-populate batch table (D through J) ──────────────
INSERT IGNORE INTO batch (batch_id, batch_name) VALUES
(4, 'Batch D'), (5, 'Batch E'), (6, 'Batch F'),
(7, 'Batch G'), (8, 'Batch H'), (9, 'Batch I'), (10, 'Batch J');

-- ─── 7. Seed match_round_config for existing matches ────────
INSERT IGNORE INTO match_round_config (match_id, round_type_id, advance_count, bull_start, bull_end) VALUES
(1, 1, 8,    1,  10),
(1, 2, 5,    11, 20),
(1, 3, NULL, 21, 30),
(2, 1, 8,    1,  6),
(2, 2, 5,    7,  10),
(2, 3, NULL, 11, 15);

SET FOREIGN_KEY_CHECKS = 1;
