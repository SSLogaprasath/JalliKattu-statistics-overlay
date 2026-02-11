-- migration_v7_tidb.sql — TiDB-compatible version of remaining v7 steps
-- Steps 1-2 (arena_capacity, advancement_status) already applied.
-- Step 3 (PK change) SKIPPED — TiDB does not support DROP PRIMARY KEY on clustered index.
-- The existing PK (match_id, bull_id, round_type_id) is kept.
USE mydb;
SET FOREIGN_KEY_CHECKS = 0;

-- ─── Make bull_match_history columns nullable ────────────────
ALTER TABLE bull_match_history
  MODIFY COLUMN player_id INT NULL,
  MODIFY COLUMN aggression INT NULL DEFAULT 0,
  MODIFY COLUMN play_area INT NULL DEFAULT 0,
  MODIFY COLUMN difficulty INT NULL DEFAULT 0,
  MODIFY COLUMN prize_id INT NULL;

-- Rename release_count → release_order (if column exists)
-- TiDB supports CHANGE COLUMN
ALTER TABLE bull_match_history
  CHANGE COLUMN release_count release_order INT NULL;

-- Add batch_id column if not exists
ALTER TABLE bull_match_history ADD COLUMN batch_id INT NULL;

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
  CONSTRAINT fk_mrc_match FOREIGN KEY (match_id) REFERENCES `Match`(match_id),
  CONSTRAINT fk_mrc_round FOREIGN KEY (round_type_id) REFERENCES round_type(round_type_id)
) ENGINE = InnoDB;

-- ─── 5. foul table ───────────────────────────────────────────
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
  CONSTRAINT fk_foul_match  FOREIGN KEY (match_id) REFERENCES `Match`(match_id),
  CONSTRAINT fk_foul_round  FOREIGN KEY (round_type_id) REFERENCES round_type(round_type_id),
  CONSTRAINT fk_foul_bull   FOREIGN KEY (bull_id) REFERENCES bull_table(bull_id),
  CONSTRAINT fk_foul_player FOREIGN KEY (player_id) REFERENCES player(player_id)
) ENGINE = InnoDB;

-- ─── 6. Pre-populate batch table (D through J) ──────────────
INSERT IGNORE INTO batch (batch_id, batch_name) VALUES
(4, 'Batch D'), (5, 'Batch E'), (6, 'Batch F'),
(7, 'Batch G'), (8, 'Batch H'), (9, 'Batch I'), (10, 'Batch J');

SET FOREIGN_KEY_CHECKS = 1;
SELECT 'Migration v7 (TiDB) complete' AS status;
