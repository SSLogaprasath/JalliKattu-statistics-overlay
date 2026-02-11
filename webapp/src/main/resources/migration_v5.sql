-- Migration V5: Add registration_deadline to match table
-- This column stores the cutoff datetime after which
-- no new player/bull registrations are accepted.
-- NULL means no deadline (registration stays open until match goes Live).

ALTER TABLE `match`
  ADD COLUMN `registration_deadline` DATETIME NULL DEFAULT NULL
  AFTER `match_date`;
