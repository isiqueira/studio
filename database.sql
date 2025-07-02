-- This DDL is designed for PostgreSQL and is based on the data models in `src/types.ts`.
-- It establishes the schema for storing quotation data for the STB application.

-- Drop existing tables with CASCADE to handle dependencies.
-- This allows the script to be re-runnable without manual cleanup.
DROP TABLE IF EXISTS payment_plan_payments CASCADE;
DROP TABLE IF EXISTS payment_plan_installments CASCADE;
DROP TABLE IF EXISTS extras CASCADE;
DROP TABLE IF EXISTS course_prices CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS quotations CASCADE;
DROP TABLE IF EXISTS proposals CASCADE;
DROP TABLE IF EXISTS greetings CASCADE;
DROP TABLE IF EXISTS sellers CASCADE;
DROP TABLE IF EXISTS company_info CASCADE;
DROP TABLE IF EXISTS schools CASCADE;


-- The `proposals` table is the new parent table that groups multiple quotation options.
CREATE TABLE proposals (
    proposal_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    valid_until TIMESTAMPTZ,
    seller_id INT,
    company_info_id INT,
    greetings_id INT
);

-- The `quotations` table now represents a single option within a proposal.
-- It includes a foreign key `proposal_id` to link back to the parent proposal.
CREATE TABLE quotations (
    quotation_id SERIAL PRIMARY KEY,
    proposal_id INT NOT NULL,
    quotation_hash VARCHAR(255) UNIQUE,
    duration VARCHAR(255),
    period VARCHAR(255),
    total_amount NUMERIC(10, 2),
    first_payment_amount NUMERIC(10, 2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stores company contact information, referenced by proposals.
CREATE TABLE company_info (
    company_info_id SERIAL PRIMARY KEY,
    phone VARCHAR(50),
    email VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(100)
);

-- Stores information about the sales representatives (sellers).
CREATE TABLE sellers (
    seller_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    photo TEXT -- Using TEXT to store Base64 string or URL
);

-- Stores details about the educational institutions.
CREATE TABLE schools (
    school_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo TEXT, -- TEXT for Base64 or URL
    location VARCHAR(255),
    video_url TEXT
);

-- Stores course details, linked to a quotation and a school.
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    quotation_id INT NOT NULL,
    school_id INT,
    name VARCHAR(255) NOT NULL,
    logo TEXT, -- TEXT for Base64 or URL
    location VARCHAR(255),
    period VARCHAR(255)
);

-- Stores individual price components for each course.
CREATE TABLE course_prices (
    price_id SERIAL PRIMARY KEY,
    course_id INT NOT NULL,
    description VARCHAR(255),
    price NUMERIC(10, 2)
);

-- Stores extra items or fees associated with a quotation.
CREATE TABLE extras (
    extra_id SERIAL PRIMARY KEY,
    quotation_id INT NOT NULL,
    logo TEXT, -- TEXT for Base64 or URL
    name VARCHAR(255),
    period VARCHAR(255),
    price NUMERIC(10, 2)
);

-- Stores the installments of a payment plan for a quotation.
CREATE TABLE payment_plan_installments (
    installment_id SERIAL PRIMARY KEY,
    quotation_id INT NOT NULL,
    due_date VARCHAR(50),
    first_payment BOOLEAN,
    description TEXT
);

-- Stores the individual payment line items within an installment.
CREATE TABLE payment_plan_payments (
    payment_id SERIAL PRIMARY KEY,
    installment_id INT NOT NULL,
    description VARCHAR(255),
    price NUMERIC(10, 2)
);

-- Stores greeting text for the proposal.
CREATE TABLE greetings (
    greetings_id SERIAL PRIMARY KEY,
    greeting TEXT,
    line1 TEXT,
    line2 TEXT,
    line3 TEXT,
    line4 TEXT
);

-- Foreign Key Constraints
-- Note: ON DELETE CASCADE is used to automatically clean up related data
-- when a parent record (like a quotation or proposal) is deleted.

ALTER TABLE proposals
ADD CONSTRAINT fk_seller FOREIGN KEY (seller_id) REFERENCES sellers(seller_id) ON DELETE SET NULL,
ADD CONSTRAINT fk_company_info FOREIGN KEY (company_info_id) REFERENCES company_info(company_info_id) ON DELETE SET NULL,
ADD CONSTRAINT fk_greetings FOREIGN KEY (greetings_id) REFERENCES greetings(greetings_id) ON DELETE SET NULL;

ALTER TABLE quotations
ADD CONSTRAINT fk_proposal FOREIGN KEY (proposal_id) REFERENCES proposals(proposal_id) ON DELETE CASCADE;

ALTER TABLE courses
ADD CONSTRAINT fk_quotation FOREIGN KEY (quotation_id) REFERENCES quotations(quotation_id) ON DELETE CASCADE,
ADD CONSTRAINT fk_school FOREIGN KEY (school_id) REFERENCES schools(school_id) ON DELETE SET NULL;

ALTER TABLE course_prices
ADD CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE;

ALTER TABLE extras
ADD CONSTRAINT fk_quotation FOREIGN KEY (quotation_id) REFERENCES quotations(quotation_id) ON DELETE CASCADE;

ALTER TABLE payment_plan_installments
ADD CONSTRAINT fk_quotation FOREIGN KEY (quotation_id) REFERENCES quotations(quotation_id) ON DELETE CASCADE;

ALTER TABLE payment_plan_payments
ADD CONSTRAINT fk_installment FOREIGN KEY (installment_id) REFERENCES payment_plan_installments(installment_id) ON DELETE CASCADE;
