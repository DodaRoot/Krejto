CREATE TABLE locations
(
    id       UUID         NOT NULL,
    location VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE service_reviews
(
    rating      INTEGER      NOT NULL,
    created_at  TIMESTAMP(6) NOT NULL,
    id          UUID         NOT NULL,
    reviewer_id UUID         NOT NULL,
    service_id  UUID         NOT NULL,
    review      VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE services
(
    price              NUMERIC(38, 2) NOT NULL,
    id                 UUID           NOT NULL,
    location_id        UUID           NOT NULL,
    provider_id        UUID           NOT NULL,
    type_of_service_id UUID           NOT NULL,
    address            VARCHAR(255),
    description        VARCHAR(255)   NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE site_reviews
(
    rating      INTEGER      NOT NULL,
    id          UUID         NOT NULL,
    reviewer_id UUID         NOT NULL,
    review      VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE types_of_services
(
    id                  UUID         NOT NULL,
    service_description VARCHAR(255) NOT NULL,
    service_name        VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

CREATE TABLE user_roles
(
    id   UUID         NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users
(
    created_at   TIMESTAMP(6) NOT NULL,
    id           UUID         NOT NULL,
    role_id      UUID         NOT NULL,
    email        VARCHAR(255) NOT NULL UNIQUE,
    full_name    VARCHAR(255) NOT NULL,
    password     VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS service_reviews
    ADD CONSTRAINT fk_service_reviews_service
        FOREIGN KEY (service_id)
            REFERENCES services (id);

ALTER TABLE IF EXISTS service_reviews
    ADD CONSTRAINT fk_service_reviews_reviewer
        FOREIGN KEY (reviewer_id)
            REFERENCES users (id);

ALTER TABLE IF EXISTS services
    ADD CONSTRAINT fk_services_location
        FOREIGN KEY (location_id)
            REFERENCES locations (id);

ALTER TABLE IF EXISTS services
    ADD CONSTRAINT fk_services_type
        FOREIGN KEY (type_of_service_id)
            REFERENCES types_of_services (id);

ALTER TABLE IF EXISTS services
    ADD CONSTRAINT fk_services_provider
        FOREIGN KEY (provider_id)
            REFERENCES users (id);

ALTER TABLE IF EXISTS site_reviews
    ADD CONSTRAINT fk_site_reviews_reviewer
        FOREIGN KEY (reviewer_id)
            REFERENCES users (id);

ALTER TABLE IF EXISTS users
    ADD CONSTRAINT fk_users_role
        FOREIGN KEY (role_id)
            REFERENCES user_roles (id);

-- DEFAULT ROLES

INSERT INTO user_roles (id, role)
VALUES (gen_random_uuid(), 'USER'),
       (gen_random_uuid(), 'ADMIN');

-- DEFAULT ADMIN USER

INSERT INTO users (id,
                   created_at,
                   role_id,
                   email,
                   full_name,
                   password,
                   phone_number)
VALUES (gen_random_uuid(),
        CURRENT_TIMESTAMP,
        (SELECT id FROM user_roles WHERE role = 'ADMIN'),
        'admin@krejto.com',
        'Administrator',
        '$2a$10$cmly5Z.UlXxWphXfulOT4uY05DhCR1gBrDHHanbdYXAbrBf2SOdf2',
        '+1 111 111 111');

-- SERVICE CATEGORIES

INSERT INTO types_of_services (id,
                               service_name,
                               service_description)
VALUES (gen_random_uuid(),
        'Elektricist',
        'Instalime, riparime dhe mirembajtje elektrike per shtepi dhe biznese.'),
       (gen_random_uuid(),
        'Hidraulik',
        'Instalime dhe riparime te tubave, rubinetave, ujësjellesit dhe ngrohjes.'),
       (gen_random_uuid(),
        'Pastrim',
        'Pastrim profesional per shtepi, banesa, zyra dhe hapesira pune.'),
       (gen_random_uuid(),
        'Kopshtari',
        'Mirembajtje e kopshteve, oborreve, lendinave dhe hapesirave te gjelbra.'),
       (gen_random_uuid(),
        'Lyerje (Moler)',
        'Lyerje e mureve dhe tavaneve per ambiente te brendshme dhe te jashtme.'),
       (gen_random_uuid(),
        'Riparim kompjuteresh',
        'Diagnostikim, mirembajtje dhe riparim i kompjutereve dhe laptopëve.'),
       (gen_random_uuid(),
        'Punë dore dhe riparime shtëpiake',
        'Montim mobiliesh, vendosje rafteve dhe riparime te vogla ne shtepi.'),
       (gen_random_uuid(),
        'Ndërtim dhe renovim',
        'Punime me pllaka, suvatim, renovime dhe permiresime te hapesirave.');

-- CITIES IN KOSOVO

INSERT INTO locations (id, location)
VALUES (gen_random_uuid(), 'Prishtinë'),
       (gen_random_uuid(), 'Prizren'),
       (gen_random_uuid(), 'Pejë'),
       (gen_random_uuid(), 'Gjakovë'),
       (gen_random_uuid(), 'Gjilan'),
       (gen_random_uuid(), 'Ferizaj'),
       (gen_random_uuid(), 'Mitrovicë'),
       (gen_random_uuid(), 'Podujevë'),
       (gen_random_uuid(), 'Vushtrri'),
       (gen_random_uuid(), 'Fushë Kosovë'),
       (gen_random_uuid(), 'Lipjan'),
       (gen_random_uuid(), 'Suharekë'),
       (gen_random_uuid(), 'Rahovec'),
       (gen_random_uuid(), 'Drenas'),
       (gen_random_uuid(), 'Viti');

-- SEED DATA: REVIEWER USERS

INSERT INTO users (id,
                   created_at,
                   role_id,
                   email,
                   full_name,
                   password,
                   phone_number)
VALUES (gen_random_uuid(),
        CURRENT_TIMESTAMP,
        (SELECT id FROM user_roles WHERE role = 'USER' LIMIT 1), 'arta.krasniqi@example.com', 'Arta Krasniqi',
        '$2a$10$cmly5Z.UlXxWphXfulOT4uY05DhCR1gBrDHHanbdYXAbrBf2SOdf2', '+38344100001'),
       (gen_random_uuid(),
        CURRENT_TIMESTAMP,
        (SELECT id FROM user_roles WHERE role = 'USER' LIMIT 1),
        'blerim.gashi@example.com',
        'Blerim Gashi',
        '$2a$10$cmly5Z.UlXxWphXfulOT4uY05DhCR1gBrDHHanbdYXAbrBf2SOdf2',
        '+38344100002'),
       (gen_random_uuid(),
        CURRENT_TIMESTAMP,
        (SELECT id FROM user_roles WHERE role = 'USER' LIMIT 1),
        'elira.berisha@example.com',
        'Elira Berisha',
        '$2a$10$cmly5Z.UlXxWphXfulOT4uY05DhCR1gBrDHHanbdYXAbrBf2SOdf2',
        '+38344100003'),
       (gen_random_uuid(),
        CURRENT_TIMESTAMP,
        (SELECT id FROM user_roles WHERE role = 'USER' LIMIT 1),
        'ardian.hoxha@example.com',
        'Ardian Hoxha',
        '$2a$10$cmly5Z.UlXxWphXfulOT4uY05DhCR1gBrDHHanbdYXAbrBf2SOdf2',
        '+38344100004');

-- SEED DATA: SITE REVIEWS

INSERT INTO site_reviews (id,
                          reviewer_id,
                          rating,
                          review)
VALUES (gen_random_uuid(),
        (SELECT id
         FROM users
         WHERE email = 'arta.krasniqi@example.com'),
        5,
        'Platforme shume e lehte per te gjetur profesioniste te besueshem.'),
       (gen_random_uuid(),
        (SELECT id
         FROM users
         WHERE email = 'blerim.gashi@example.com'),
        5,
        'Sherbim i shkelqyer dhe proces i thjeshte per te kontaktuar ofruesit.'),
       (gen_random_uuid(),
        (SELECT id
         FROM users
         WHERE email = 'elira.berisha@example.com'),
        4,
        'Platforme praktike me kategori te dobishme dhe zgjedhje te mira.'),
       (gen_random_uuid(),
        (SELECT id
         FROM users
         WHERE email = 'ardian.hoxha@example.com'),
        5,
        'Eksperience pozitive. Gjetja e sherbimeve lokale eshte shume e lehte.');