CREATE DATABASE foodfy

CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  name TEXT,
  path TEXT not null
)

CREATE TABLE chefs (
  id SERIAL PRIMARY KEY not null,
  name TEXT,
  file_id INTEGER REFERENCES files(id),
  created_at timestamp DEFAULT 'now()',
  updated_at timestamp DEFAULT 'now()'
)

CREATE TABLE recipes (
	id SERIAL primary key not null,
  chef_id integer null,
	title text,
	ingredients text[],
	preparation text[],
	information text,
	created_at timestamp DEFAULT 'now()',
  updated_at timestamp DEFAULT 'now()'
)

CREATE TABLE recipe_files (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER REFERENCES recipes(id),
  file_id INTEGER REFERENCES files(id)
)

-- Trigger para atualizar o campo updated_at em chefs e recipes

CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON chefs
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp()

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp()

-- Trigger para atualizar o campo created_at em chefs e recipes

CREATE FUNCTION trigger_set_timestamp_created()
RETURNS TRIGGER AS $$
BEGIN
	NEW.created_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER set_timestamp_created
BEFORE INSERT ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp_created()

CREATE TRIGGER set_timestamp_created
BEFORE INSERT ON chefs
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp_created()