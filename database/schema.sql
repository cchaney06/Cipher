CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    username VARCHAR(32) NOT NULL UNIQUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT users_username_lowercase
        CHECK (username = LOWER(username)),

    CONSTRAINT users_username_length
        CHECK (LENGTH(username) BETWEEN 3 AND 32)
);