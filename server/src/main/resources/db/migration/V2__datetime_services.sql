ALTER TABLE services
    ADD COLUMN created_at TIMESTAMP(6);

UPDATE services
SET created_at = CURRENT_TIMESTAMP
WHERE created_at IS NULL;

ALTER TABLE services
    ALTER COLUMN created_at SET NOT NULL;