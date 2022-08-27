
--Insert First
INSERT INTO users(id, name, email, password) VALUES
(1, 'Bob Rob', 'bobrob@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Jules Rice', 'julesrice@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'Ronald Mcdonald', 'ronaldmcdonald@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- Insert Second
INSERT INTO properties(id, owner_id, title, description,
thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces,
number_of_bathrooms, number_of_bedrooms, country, street, city, province,
post_code, active)
VALUES (1, 1, 'Hell"s Kitchen', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350',
'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 480, 4,
3, 2, 'Canada',  '536 Namsub Highway', 'Sotboske', 'Quebec', '123456', TRUE),
(2, 1, 'Rainbow Road', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350',
'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 50, 3, 4, 5, 'Canada', '123 Rock Street', 'Firestone', 'Alberta',
'2321321', true),
(3, 2, 'Yellow Brick Road', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350',
'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 199, 2, 4, 4, 'USA', '12 Jillian Road', 'Austin', 'Texas', '12345d', TRUE);

--Insert Third
INSERT INTO reservations(id, start_date, end_date, property_id, guest_id)
VALUES (1, '2018-09-11', '2018-09-26', 1, 3),
(2, '2019-01-04', '2019-02-01', 2, 2),
(3, '2021-10-01', '2021-10-14', 3, 3);

--Insert Fourth
INSERT INTO property_reviews(id, guest_id, property_id, reservation_id, rating, message)
VALUES (1, 3, 2, 1, 4, 'message'),
(2, 2, 1, 2, 3, 'message'),
(3, 3, 1, 3, 3, 'message');

