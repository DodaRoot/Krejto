CREATE TABLE locations (
                           id       UUID         NOT NULL,
                           location VARCHAR(255) NOT NULL,
                           PRIMARY KEY (id)
);

CREATE TABLE reviews (
                         stars       INTEGER      NOT NULL,
                         id          UUID         NOT NULL,
                         reviewer_id UUID,
                         comment     VARCHAR(255) NOT NULL,
                         PRIMARY KEY (id)
);

CREATE TABLE service_reviews (
                                 rating      INTEGER      NOT NULL,
                                 created_at  TIMESTAMP(6) NOT NULL,
                                 id          UUID         NOT NULL,
                                 reviewer_id UUID,
                                 service_id  UUID,
                                 comment     VARCHAR(255) NOT NULL,
                                 PRIMARY KEY (id)
);

CREATE TABLE services (
                          price             FLOAT(53)     NOT NULL,
                          id                UUID          NOT NULL,
                          location_id       UUID,
                          provider_id       UUID,
                          type_of_service_id UUID,
                          address           VARCHAR(255),
                          description       VARCHAR(255) NOT NULL,
                          PRIMARY KEY (id)
);

CREATE TABLE types_of_services (
                                   id                  UUID         NOT NULL,
                                   service_description VARCHAR(255) NOT NULL,
                                   service_name        VARCHAR(255) NOT NULL UNIQUE,
                                   PRIMARY KEY (id)
);

CREATE TABLE user_roles (
                            id   UUID         NOT NULL,
                            role VARCHAR(255) NOT NULL,
                            PRIMARY KEY (id)
);

CREATE TABLE users (
                       created_at  TIMESTAMP(6)   NOT NULL,
                       id          UUID           NOT NULL,
                       role_id     UUID           NOT NULL,
                       email       VARCHAR(255)   NOT NULL UNIQUE,
                       full_name   VARCHAR(255)   NOT NULL,
                       password    VARCHAR(255)   NOT NULL,
                       phone_number VARCHAR(255)  NOT NULL UNIQUE,
                       PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS reviews
    ADD CONSTRAINT fk_reviews_reviewer
        FOREIGN KEY (reviewer_id)
            REFERENCES users (id);

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

ALTER TABLE IF EXISTS users
    ADD CONSTRAINT fk_users_role
        FOREIGN KEY (role_id)
            REFERENCES user_roles (id);