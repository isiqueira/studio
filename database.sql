-- This DDL is generated based on the application's data models.
-- It's designed for PostgreSQL and can be used to set up your database schema.

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: schools
CREATE TABLE schools (
    school_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo TEXT,
    location VARCHAR(255),
    video_url TEXT
);

-- Table: sellers
CREATE TABLE sellers (
    seller_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255),
    photo TEXT
);

-- Table: company_info
CREATE TABLE company_info (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(50),
    email VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(100)
);

-- Table: greetings
CREATE TABLE greetings (
    id SERIAL PRIMARY KEY,
    greeting TEXT,
    line1 TEXT,
    line2 TEXT,
    line3 TEXT,
    line4 TEXT
);

-- NEW TABLE: proposals
-- This table groups multiple quotation options for a single client.
CREATE TABLE proposals (
    proposal_id SERIAL PRIMARY KEY,
    client_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'declined')),
    created_at TIMESTAMPTZ DEFAULT now(),
    valid_until TIMESTAMPTZ,
    seller_id INT REFERENCES sellers(seller_id) ON DELETE SET NULL,
    company_info_id INT REFERENCES company_info(id) ON DELETE SET NULL,
    greetings_id INT REFERENCES greetings(id) ON DELETE SET NULL
);

-- Table: quotations
-- Represents a single quote option within a proposal.
CREATE TABLE quotations (
    quotation_id SERIAL PRIMARY KEY,
    proposal_id INT NOT NULL REFERENCES proposals(proposal_id) ON DELETE CASCADE,
    quotation_hash UUID DEFAULT gen_random_uuid(),
    name VARCHAR(255), -- Name for this specific option, e.g., "Option 1: General English"
    duration TEXT,
    period TEXT,
    total_amount NUMERIC(10, 2),
    first_payment_amount NUMERIC(10, 2)
);

-- Table: courses
-- Represents a course within a quotation.
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    quotation_id INT NOT NULL REFERENCES quotations(quotation_id) ON DELETE CASCADE,
    school_id INT REFERENCES schools(school_id) ON DELETE SET NULL,
    logo TEXT,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    period TEXT
);

-- Table: course_prices
-- Represents the pricing breakdown for a course.
CREATE TABLE course_prices (
    price_id SERIAL PRIMARY KEY,
    course_id INT NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    description VARCHAR(255),
    price NUMERIC(10, 2)
);

-- Table: extras
-- Represents extra items in a quotation, like VISA fees or insurance.
CREATE TABLE extras (
    extra_id SERIAL PRIMARY KEY,
    quotation_id INT NOT NULL REFERENCES quotations(quotation_id) ON DELETE CASCADE,
    logo TEXT,
    name VARCHAR(255),
    period TEXT,
    price NUMERIC(10, 2)
);

-- Table: payment_plan_installments
-- Represents an installment in the payment plan.
CREATE TABLE payment_plan_installments (
    installment_id SERIAL PRIMARY KEY,
    quotation_id INT NOT NULL REFERENCES quotations(quotation_id) ON DELETE CASCADE,
    due_date TEXT,
    first_payment BOOLEAN DEFAULT FALSE,
    description TEXT
);

-- Table: payment_plan_payments
-- Represents a single payment line within an installment.
CREATE TABLE payment_plan_payments (
    payment_id SERIAL PRIMARY KEY,
    installment_id INT NOT NULL REFERENCES payment_plan_installments(installment_id) ON DELETE CASCADE,
    description VARCHAR(255),
    price NUMERIC(10, 2)
);

-- Note: ON DELETE CASCADE is used to ensure that when a parent record is deleted,
-- all its associated child records are also deleted.
-- ON DELETE SET NULL is used for optional relationships, so that deleting a
-- related record doesn't delete the main record, but just unlinks it.
