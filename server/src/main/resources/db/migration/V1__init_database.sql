create table locations (
                           id uuid not null,
                           location varchar(255) not null,
                           primary key (id)
);

create table reviews (
                         stars integer not null,
                         id uuid not null,
                         reviewer_id uuid,
                         comment varchar(255) not null,
                         primary key (id)
);

create table service_reviews (
                                 rating integer not null,
                                 created_at timestamp(6) not null,
                                 id uuid not null,
                                 reviewer_id uuid,
                                 service_id uuid,
                                 comment varchar(255) not null,
                                 primary key (id)
);

create table services (
                          price float(53) not null,
                          id uuid not null,
                          location_id uuid,
                          provider_id uuid,
                          type_of_service_id uuid,
                          address varchar(255),
                          description varchar(255) not null,
                          primary key (id)
);

create table types_of_services (
                                   id uuid not null,
                                   service_description varchar(255) not null,
                                   service_name varchar(255) not null unique,
                                   primary key (id)
);

create table user_roles (
                            id uuid not null,
                            role varchar(255) not null,
                            primary key (id)
);

create table users (
                       created_at timestamp(6) not null,
                       id uuid not null,
                       role_id uuid not null,
                       email varchar(255) not null unique,
                       full_name varchar(255) not null,
                       password varchar(255) not null,
                       phone_number varchar(255) not null unique,
                       primary key (id)
);

alter table if exists reviews
    add constraint FKd1isgfajhtdl8mgg29up6mofi
    foreign key (reviewer_id)
    references users;

alter table if exists service_reviews
    add constraint FKswvvdd1fiadm0niifdauvqi3d
    foreign key (service_id)
    references services;

alter table if exists service_reviews
    add constraint FK9f2v9fjcano3jq3vx1ods25r
    foreign key (reviewer_id)
    references users;

alter table if exists services
    add constraint FKegihgga278llrex6t1kdlndw
    foreign key (location_id)
    references locations;

alter table if exists services
    add constraint FKsh4g4r4hswi8vr1i6q1chg0ar
    foreign key (type_of_service_id)
    references types_of_services;

alter table if exists services
    add constraint FKe0b0175l27ffcser90cjoots1
    foreign key (provider_id)
    references users;

alter table if exists users
    add constraint FKh555fyoyldpyaltlb7jva35j2
    foreign key (role_id)
    references user_roles;
