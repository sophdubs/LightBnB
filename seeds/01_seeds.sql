-- ADD USERS
INSERT INTO users
  (name, email, password)
VALUES
  ('Bob Bobertson', 'bob@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users
  (name, email, password)
VALUES
  ('Rob Robertson', 'rob@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users
  (name, email, password)
VALUES
  ('Jim Jimson', 'jim@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO users
  (name, email, password)
VALUES
  ('Mike Michaelson', 'mike@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


-- ADD PROPERTIES
INSERT INTO properties
  (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
  (1, 'House 1', 'First house', 'http://www.thumbnail1.com', 'http://www.cover1.com', 2500, 2, 2, 2, 'Canada', 'Main St.', 'Toronto', 'Ontario', 'ABABAB', true);

INSERT INTO properties
  (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
  (2, 'House 2', 'Second house', 'http://www.thumbnail2.com', 'http://www.cover2.com', 3500, 3, 2, 1, 'Canada', 'Second St.', 'Toronto', 'Ontario', 'CDCDCD', true);


INSERT INTO properties
  (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES
  (3, 'House 3', 'Third house', 'http://www.thumbnail3.com', 'http://www.cover3.com', 4500, 4, 2, 2, 'Canada', 'Third St.', 'Toronto', 'Ontario', 'EFEFEF', true);


-- ADD RESERVATIONS
INSERT INTO reservations
  (property_id, guest_id, start_date, end_date)
VALUES
  (1, 2, '2020-02-02', '2020, 02, 07');

INSERT INTO reservations
  (property_id, guest_id, start_date, end_date)
VALUES
  (2, 3, '2020-04-02', '2020, 04, 07');

INSERT INTO reservations
  (property_id, guest_id, start_date, end_date)
VALUES
  (3, 1, '2020-06-02', '2020, 06, 07');


-- ADD PROPERTY REVIEWS
INSERT INTO property_reviews
  (guest_id, property_id, reservation_id, rating, message)
VALUES
  (2, 1, 1, 5, 'very nice');
INSERT INTO property_reviews
  (guest_id, property_id, reservation_id, rating, message)
VALUES
  (3, 2, 2, 5, 'super nice');
INSERT INTO property_reviews
  (guest_id, property_id, reservation_id, rating, message)
VALUES
  (1, 3, 3, 5, 'really nice');