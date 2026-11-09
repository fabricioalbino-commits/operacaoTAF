import sqlite3
from pathlib import Path


DATABASE_PATH = Path(__file__).resolve().parent / "data" / "operacao_taf.db"

CONTESTS = (
    ("Polícia Militar de Goiás", "Goiás", "GO"),
    ("Corpo de Bombeiros", "Goiás", "GO"),
    ("Polícia Civil de Goiás", "Goiás", "GO"),
    ("Polícia Penal de Goiás", "Goiás", "GO"),
    ("Polícia Rodoviária Federal", "Nacional", "NACIONAL"),
    ("Guarda Municipal", "A definir pelo município", "MUNICIPAL"),
)

SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    full_name TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE
        CHECK (length(cpf) = 11 AND cpf NOT GLOB '*[^0-9]*'),
    email TEXT NOT NULL COLLATE NOCASE UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS contests (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    state TEXT NOT NULL,
    scope TEXT NOT NULL CHECK (scope IN ('GO', 'NACIONAL', 'MUNICIPAL')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY,
    protocol TEXT NOT NULL UNIQUE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    contest_id INTEGER NOT NULL REFERENCES contests(id) ON DELETE RESTRICT,
    education TEXT NOT NULL CHECK (education IN ('Ensino Médio', 'Ensino Superior')),
    status TEXT NOT NULL DEFAULT 'recebida'
        CHECK (status IN ('recebida', 'em análise', 'aprovada', 'cancelada')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_registrations_user_id
    ON registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_registrations_contest_id
    ON registrations(contest_id);
"""


def initialize_database(database_path: Path = DATABASE_PATH) -> Path:
    """Create the SQLite database and add the initial contest list."""
    database_path.parent.mkdir(parents=True, exist_ok=True)

    with sqlite3.connect(database_path) as connection:
        connection.execute("PRAGMA foreign_keys = ON")
        connection.executescript(SCHEMA)
        connection.executemany(
            """
            INSERT OR IGNORE INTO contests (name, state, scope)
            VALUES (?, ?, ?)
            """,
            CONTESTS,
        )

    return database_path


if __name__ == "__main__":
    path = initialize_database()
    print(f"Banco de dados criado/verificado em: {path}")
