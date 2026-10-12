create table locations
(
    id       uuid         not null,
    location varchar(255) not null,
    primary key (id)
);

create table locations_ids
(
    location_id uuid not null,
    service_id  uuid not null
);

create table service_reviews
(
    rating      integer      not null,
    created_at  timestamp(6) not null,
    id          uuid         not null,
    reviewer_id uuid         not null,
    service_id  uuid         not null,
    review      varchar(255) not null,
    primary key (id)
);

create table services
(
    price              numeric(38, 2) not null,
    id                 uuid           not null,
    provider_id        uuid           not null,
    type_of_service_id uuid           not null,
    address            varchar(255),
    description        varchar(255)   not null,
    primary key (id)
);

create table site_reviews
(
    rating      integer      not null,
    id          uuid         not null,
    reviewer_id uuid         not null,
    review      varchar(255) not null,
    primary key (id)
);

create table types_of_services
(
    id                  uuid         not null,
    service_description varchar(255) not null,
    service_name        varchar(255) not null unique,
    primary key (id)
);

create table user_roles
(
    id   uuid         not null,
    role varchar(255) not null,
    primary key (id)
);

create table users
(
    created_at   timestamp(6) not null,
    id           uuid         not null,
    role_id      uuid         not null,
    email        varchar(255) not null unique,
    full_name    varchar(255) not null,
    password     varchar(255) not null,
    phone_number varchar(255) not null unique,
    primary key (id)
);

alter table if exists locations_ids
    add constraint FKbmmik94jsa4n8hddbpu8dyu9r
        foreign key (location_id)
            references locations;

alter table if exists locations_ids
    add constraint FK4wkbrn385r1swc0vd2h7bpaip
        foreign key (service_id)
            references services;

alter table if exists service_reviews
    add constraint FKswvvdd1fiadm0niifdauvqi3d
        foreign key (service_id)
            references services;

alter table if exists service_reviews
    add constraint FK9f2v9fjcano3jq3vx1ods25r
        foreign key (reviewer_id)
            references users;

alter table if exists services
    add constraint FKsh4g4r4hswi8vr1i6q1chg0ar
        foreign key (type_of_service_id)
            references types_of_services;

alter table if exists services
    add constraint FKe0b0175l27ffcser90cjoots1
        foreign key (provider_id)
            references users;

alter table if exists site_reviews
    add constraint FKld0gco2hhp6w8fvspei5tdse3
        foreign key (reviewer_id)
            references users;

alter table if exists users
    add constraint FKh555fyoyldpyaltlb7jva35j2
        foreign key (role_id)
            references user_roles;

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