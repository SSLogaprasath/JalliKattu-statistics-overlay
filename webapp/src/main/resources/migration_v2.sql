-- =====================================================
-- Jallikattu Schema Migration v2
-- Adds: player/owner roles, user_id links, auto-increment match_id
-- =====================================================

-- 1. Expand app_user role enum to include player and owner
ALTER TABLE app_user MODIFY COLUMN role ENUM('admin','registrar','scorer','player','owner') NOT NULL;

-- 2. Link player table to app_user for self-service accounts
ALTER TABLE player ADD COLUMN user_id INT NULL;
ALTER TABLE player ADD CONSTRAINT fk_player_user FOREIGN KEY (user_id) REFERENCES app_user(user_id) ON DELETE SET NULL;

-- 3. Link owner table to app_user for self-service accounts
ALTER TABLE owner ADD COLUMN user_id INT NULL;
ALTER TABLE owner ADD CONSTRAINT fk_owner_user FOREIGN KEY (user_id) REFERENCES app_user(user_id) ON DELETE SET NULL;

-- Note: Auto-increment on PK columns referenced by FKs requires
-- temporarily removing those FK constraints. We skip auto-increment
-- changes since all new IDs are managed via SELECT MAX()+1 in the DAO layer.
-- This keeps FK integrity intact.

SELECT 'Migration v2 complete' AS status;
