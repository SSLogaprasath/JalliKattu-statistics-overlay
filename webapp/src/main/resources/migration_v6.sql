-- Migration V6: Make match_id AUTO_INCREMENT
-- Admins no longer need to manually specify the match ID when scheduling.

ALTER TABLE `match`
  MODIFY COLUMN `match_id` INT NOT NULL AUTO_INCREMENT;
