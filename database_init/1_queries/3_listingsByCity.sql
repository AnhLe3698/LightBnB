-- Show specific details about properties located in 
-- Vancouver including their average rating.

-- Select the id, title, cost_per_night, and an average_rating 
-- from the properties table for properties located in Vancouver.
-- Order the results from lowest cost_per_night to highest cost_per_night.
-- Limit the number of results to 10.
-- Only show listings that have a rating >= 4 stars.
--Answer 1
SELECT properties.id, properties.title, properties.cost_per_night, prop.average_rating
FROM properties
LEFT JOIN 
  (SELECT a.property_id AS id, AVG(a.rating) AS average_rating 
  FROM property_reviews a GROUP BY a.property_id) AS prop
ON prop.id = properties.id
WHERE prop.average_rating >= 4 AND properties.city LIKE '%ancouv%'
ORDER BY cost_per_night
LIMIT 10;

--Answer 2
SELECT properties.id, title, cost_per_night, avg(property_reviews.rating) as average_rating
FROM properties
LEFT JOIN property_reviews ON properties.id = property_id
WHERE city LIKE '%ancouv%'
GROUP BY properties.id
HAVING avg(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10;