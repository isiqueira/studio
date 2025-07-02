-- Clear existing data
TRUNCATE TABLE 
  company_info, greetings, sellers, proposals, schools, quotations, courses, course_prices, extras, payment_plan_installments, payment_plan_payments 
RESTART IDENTITY CASCADE;

-- Seed Company Info
INSERT INTO company_info (id, phone, email, address, city) VALUES
(1, '+61 (02) 9299 4428', 'info@stbaustralia.com.au', 'Level 6 / 225 Clarence St - Sydney - NSW - 2000', 'Sydney');

-- Seed Greetings
INSERT INTO greetings (id, greeting, line1, line2, line3, line4) VALUES
(1, 'Hi {{student_name}},', 'We prepared this quotation and it''s valid until {{valid_until}}.', 'It was created on {{created_at}}.', ' ', 'You can read our Terms&Conditions about your quotation here.');

-- Seed Sellers
INSERT INTO sellers (seller_id, name, phone, email, photo) VALUES
(1, 'Lucas P. Rodrigues', '+61 479 132 985', 'operations@stbaustralia.com.au', 'https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/fake_porfile_img.jpg');

-- Seed Schools
INSERT INTO schools (school_id, name, logo, location, video_url) VALUES
(7550, 'APC - Australian Pacific College', 'https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/school_7550.jpg', 'Brisbane', 'https://www.youtube.com/embed/JRS4GkR39RU'),
(7551, 'ILSC Language Schools', 'https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/school_7550.jpg', 'LSC Brisbane', 'https://www.youtube.com/embed/JRS4GkR39RU');

-- Seed Proposal
INSERT INTO proposals (proposal_id, name, valid_until, company_info_id, seller_id, greetings_id) VALUES
(1, 'Geórgia', '2025-06-27', 1, 1, 1);

-- Seed Quotations
INSERT INTO quotations (quotation_id, proposal_id, name, total_amount, first_payment_amount, duration, period, valid_until, quotation_hash) VALUES
(1435315, 1, 'General English Full Time + VET', 14205.00, 710.25, '52 Weeks', 'June 06, 2025 - June 05, 2026', '2025-06-27', 'd851b157-1b3f-4242-88ac-aace4b6c6bf6'),
(1435316, 1, 'General English Full Time', 9555.00, 710.25, '26 Weeks', 'June 06, 2025 - December 12, 2025', '2025-06-27', 'd851b157-1b3f-4242-88ac-aace4b6c6bf7'),
(1435317, 1, 'General English Part Time + VET', 14205.00, 710.25, '52 Weeks', 'June 06, 2025 - June 05, 2026', '2025-06-27', 'd851b157-1b3f-4242-88ac-aace4b6c6bf8');

-- Seed Courses for Quotation 1435315
INSERT INTO courses (quotation_id, school_id, name, location, period) VALUES
(1435315, 7550, 'Full Time Program Evening 20 hrs/wk', 'LSC Brisbane', 'June 06, 2025 - December 12, 2025'),
(1435315, 7550, 'Certificate IV in Project Management Practice (2025/26 Intakes)', 'APC Brisbane', 'June 06, 2025 - March 27, 2026');

-- Seed Course Prices for Quotation 1435315
INSERT INTO course_prices (course_id, description, price) VALUES
((SELECT course_id FROM courses WHERE quotation_id = 1435315 AND name LIKE 'Full Time Program%'), 'Programa', 5800.00),
((SELECT course_id FROM courses WHERE quotation_id = 1435315 AND name LIKE 'Full Time Program%'), 'Matrícula', 240.00),
((SELECT course_id FROM courses WHERE quotation_id = 1435315 AND name LIKE 'Full Time Program%'), 'Material', 260.00),
((SELECT course_id FROM courses WHERE quotation_id = 1435315 AND name LIKE 'Certificate IV%'), 'Programa', 4500.00),
((SELECT course_id FROM courses WHERE quotation_id = 1435315 AND name LIKE 'Certificate IV%'), 'Matrícula', 150.00);

-- Seed Extras for Quotation 1435315
INSERT INTO extras (quotation_id, name, period, price) VALUES
(1435315, 'OSHC - SINGLE', 'Overseas Student Health Cover', 1323.00),
(1435315, 'Student VISA Application - Subclass 500', 'Australian Government Fee', 1632.00),
(1435315, 'Student VISA Application - Single Support', 'Administrative Support', 300.00);


-- Seed Courses for Quotation 1435316
INSERT INTO courses (quotation_id, school_id, name, location, period) VALUES
(1435316, 7551, 'General English Day (20 hrs/wk)', 'ILSC Language Schools | LSC Brisbane', 'June 06, 2025 - December 12, 2025');

-- Seed Course Prices for Quotation 1435316
INSERT INTO course_prices (course_id, description, price) VALUES
((SELECT course_id FROM courses WHERE quotation_id = 1435316), 'Programa', 5800.00),
((SELECT course_id FROM courses WHERE quotation_id = 1435316), 'Matrícula', 240.00),
((SELECT course_id FROM courses WHERE quotation_id = 1435316), 'Material', 260.00);

-- Seed Extras for Quotation 1435316
INSERT INTO extras (quotation_id, name, period, price) VALUES
(1435316, 'OSHC - SINGLE', 'Overseas Student Health Cover', 1323.00),
(1435316, 'Student VISA Application - Subclass 500', 'Australian Government Fee', 1632.00),
(1435316, 'Student VISA Application - Single Support', 'Administrative Support', 300.00);


-- Seed Courses for Quotation 1435317
INSERT INTO courses (quotation_id, school_id, name, location, period) VALUES
(1435317, 7551, 'Full Time Program Evening 20 hrs/wk', 'LSC Brisbane', 'June 06, 2025 - December 12, 2025'),
(1435317, 7550, 'Certificate IV in Project Management Practice (2025/26 Intakes)', 'APC Brisbane', 'June 06, 2025 - March 27, 2026');

-- Seed Course Prices for Quotation 1435317
INSERT INTO course_prices (course_id, description, price) VALUES
((SELECT course_id FROM courses WHERE quotation_id = 1435317 AND name LIKE 'Full Time Program%'), 'Programa', 5800.00),
((SELECT course_id FROM courses WHERE quotation_id = 1435317 AND name LIKE 'Full Time Program%'), 'Matrícula', 240.00),
((SELECT course_id FROM courses WHERE quotation_id = 1435317 AND name LIKE 'Full Time Program%'), 'Material', 260.00),
((SELECT course_id FROM courses WHERE quotation_id = 1435317 AND name LIKE 'Certificate IV%'), 'Programa', 4500.00),
((SELECT course_id FROM courses WHERE quotation_id = 1435317 AND name LIKE 'Certificate IV%'), 'Matrícula', 150.00);

-- Seed Extras for Quotation 1435317
INSERT INTO extras (quotation_id, name, period, price) VALUES
(1435317, 'OSHC - SINGLE', 'Overseas Student Health Cover', 1323.00),
(1435317, 'Student VISA Application - Subclass 500', 'Australian Government Fee', 1632.00),
(1435317, 'Student VISA Application - Single Support', 'Administrative Support', 300.00);
