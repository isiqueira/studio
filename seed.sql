-- This script seeds the database with initial data, clearing any existing data first.
-- It's designed to be run to set up a clean database with the mock quotation data.

-- Clear existing data from all tables to ensure a clean slate.
-- RESTART IDENTITY resets the auto-incrementing counters.
-- CASCADE removes dependent objects.
TRUNCATE TABLE 
    company_info, sellers, greetings, proposals, schools, quotations, courses, course_prices, extras, payment_plan_installments, payment_plan_payments 
RESTART IDENTITY CASCADE;

-- 1. Seed Company Info
INSERT INTO company_info (company_info_id, phone, email, address, city) VALUES
(1, '+61 (02) 9299 4428', 'info@stbaustralia.com.au', 'Level 6 / 225 Clarence St - Sydney - NSW - 2000', 'Sydney');

-- 2. Seed Sellers
INSERT INTO sellers (seller_id, name, phone, email, photo) VALUES
(1, 'Lucas P. Rodrigues', '+61 479 132 985', 'operations@stbaustralia.com.au', 'https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/fake_porfile_img.jpg');

-- 3. Seed Greetings
INSERT INTO greetings (greetings_id, greeting, line1, line2, line3, line4) VALUES
(1, 'Hi Geórgia,', 'We prepared this quotation and it''s valid until Thu, Jul 03, 2025.', 'It was created on Thu, Jun 26, 2025.', ' ', 'You can read our Terms&Conditions about your quotation here.');

-- 4. Seed Proposals
-- This proposal will group the 3 quotations from the mock data.
INSERT INTO proposals (proposal_id, name, valid_until, company_info_id, seller_id, greetings_id) VALUES
(1, 'Proposal for teste reuniao', '2025-06-27', 1, 1, 1);

-- 5. Seed Schools
-- Extracts unique schools from the mock data.
INSERT INTO schools (school_id, name, logo, location) VALUES
(1, 'APC - Australian Pacific College', 'https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/school_7550.jpg', 'LSC Brisbane'),
(2, 'ILSC Language Schools', 'https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/school_7550.jpg', 'LSC Brisbane');

-- 6. Seed Quotations, Courses, Prices, and Extras from mock data

-- QUOTATION 1 (ID: 1503074)
INSERT INTO quotations (quotation_id, proposal_id, quotation_hash, name, valid_until, first_payment_amount, total_amount, created_at) VALUES
(1503074, 1, 'd851b157-1b3f-4242-88ac-aace4b6c6bf6', 'General English Full Time', '2025-06-27T00:00:00.000Z', 710.25, 14205.00, '2025-06-05 14:32:53');

-- Courses for Quotation 1
INSERT INTO courses (course_id, quotation_id, school_id, name, location, period, logo) VALUES
(1, 1503074, 1, 'Full Time Program Evening 20 hrs/wk', 'LSC Brisbane', 'June 06, 2025 - December 12, 2025', '');
INSERT INTO course_prices (course_id, description, price) VALUES
(1, 'Programa', 5800.00),
(1, 'Matrícula', 240.00),
(1, 'Material', 260.00);

INSERT INTO courses (course_id, quotation_id, school_id, name, location, period, logo) VALUES
(2, 1503074, 1, 'Certificate IV in Project Management Practice (2025/26 Intakes)', 'APC Brisbane', 'June 06, 2025 - March 27, 2026', '');
INSERT INTO course_prices (course_id, description, price) VALUES
(2, 'Programa', 4500.00),
(2, 'Matrícula', 150.00);

-- Extras for Quotation 1
INSERT INTO extras (quotation_id, name, period, price, logo) VALUES
(1503074, 'OSHC - SINGLE', 'Overseas Student Health Cover', 1323.00, ''),
(1503074, 'Student VISA Application - Subclass 500', 'Australian Government Fee', 1632.00, ''),
(1503074, 'Student VISA Application - Single Support', 'Administrative Support', 300.00, '');


-- QUOTATION 2 (ID: 1503075)
INSERT INTO quotations (quotation_id, proposal_id, quotation_hash, name, valid_until, first_payment_amount, total_amount, created_at) VALUES
(1503075, 1, '9c3a3b21-4e78-4f8b-9e4a-5f6e8d7c9b0a', 'General English Full Time', '2025-06-27T00:00:00.000Z', 710.25, 14205.00, '2025-06-05 14:32:53');

-- Course for Quotation 2
INSERT INTO courses (course_id, quotation_id, school_id, name, location, period, logo) VALUES
(3, 1503075, 2, 'General English Day (20 hrs/wk)', 'ILSC Language Schools | LSC Brisbane', 'June 06, 2025 - December 12, 2025', '');
INSERT INTO course_prices (course_id, description, price) VALUES
(3, 'Programa', 5800.00),
(3, 'Matrícula', 240.00),
(3, 'Material', 260.00);

-- Extras for Quotation 2
INSERT INTO extras (quotation_id, name, period, price, logo) VALUES
(1503075, 'OSHC - SINGLE', 'Overseas Student Health Cover', 1323.00, ''),
(1503075, 'Student VISA Application - Subclass 500', 'Australian Government Fee', 1632.00, ''),
(1503075, 'Student VISA Application - Single Support', 'Administrative Support', 300.00, '');


-- QUOTATION 3 (ID: 1503076)
INSERT INTO quotations (quotation_id, proposal_id, quotation_hash, name, valid_until, first_payment_amount, total_amount, created_at) VALUES
(1503076, 1, '1f2e3d4c-5b6a-7890-1234-5f6e7d8c9b0a', 'General English Full Time', '2025-06-27T00:00:00.000Z', 710.25, 14205.00, '2025-06-05 14:32:53');

-- Courses for Quotation 3
INSERT INTO courses (course_id, quotation_id, school_id, name, location, period, logo) VALUES
(4, 1503076, 2, 'Full Time Program Evening 20 hrs/wk', 'LSC Brisbane', 'June 06, 2025 - December 12, 2025', '');
INSERT INTO course_prices (course_id, description, price) VALUES
(4, 'Programa', 5800.00),
(4, 'Matrícula', 240.00),
(4, 'Material', 260.00);

INSERT INTO courses (course_id, quotation_id, school_id, name, location, period, logo) VALUES
(5, 1503076, 1, 'Certificate IV in Project Management Practice (2025/26 Intakes)', 'APC Brisbane', 'June 06, 2025 - March 27, 2026', '');
INSERT INTO course_prices (course_id, description, price) VALUES
(5, 'Programa', 4500.00),
(5, 'Matrícula', 150.00);

-- Extras for Quotation 3
INSERT INTO extras (quotation_id, name, period, price, logo) VALUES
(1503076, 'OSHC - SINGLE', 'Overseas Student Health Cover', 1323.00, ''),
(1503076, 'Student VISA Application - Subclass 500', 'Australian Government Fee', 1632.00, ''),
(1503076, 'Student VISA Application - Single Support', 'Administrative Support', 300.00, '');
