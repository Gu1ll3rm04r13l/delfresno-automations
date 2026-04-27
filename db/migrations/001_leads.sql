CREATE TABLE IF NOT EXISTS leads (
  id           bigserial PRIMARY KEY,
  created_at   timestamptz NOT NULL DEFAULT now(),
  name         text NOT NULL,
  email        text NOT NULL,
  company      text,
  message      text NOT NULL,
  source       text DEFAULT 'web',
  user_agent   text,
  ip_hash      text
);

CREATE INDEX IF NOT EXISTS leads_ip_hash_created_at_idx
  ON leads (ip_hash, created_at DESC);

CREATE INDEX IF NOT EXISTS leads_created_at_idx
  ON leads (created_at DESC);
