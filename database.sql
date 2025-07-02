-- PostgreSQL DDL for the STB Quotation Application

-- Drop tables in reverse order of dependency if they exist. This allows for a clean reset during development.
DROP TABLE IF EXISTS installment_payments;
DROP TABLE IF EXISTS payment_plan_installments;
DROP TABLE IF EXISTS extras;
DROP TABLE IF EXISTS course_prices;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS quotes;
DROP TABLE IF EXISTS schools;
DROP TABLE IF EXISTS sellers;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS users;


-- Table to store user information (the client receiving the quote).
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT,
    avatar_fallback VARCHAR(10),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for company information (e.g., STB offices).
CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255), -- Added a name for easier identification, e.g., "Sydney Office"
    phone VARCHAR(50),
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for seller/agent information.
CREATE TABLE sellers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255) UNIQUE NOT NULL,
    photo TEXT, -- Can store a URL or a Base64 data URI.
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for educational institutions (schools/colleges).
CREATE TABLE schools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo TEXT, -- Can store a URL or a Base64 data URI.
    location VARCHAR(255),
    video_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Central table for quotations.
-- This table combines fields from the QuoteDetails and Greetings objects.
CREATE TABLE quotes (
    id SERIAL PRIMARY KEY,
    quotation_id_str VARCHAR(255) NOT NULL, -- The user-facing ID, e.g., "2025 - 1783".
    quotation_hash UUID UNIQUE NOT NULL,
    company_id INTEGER REFERENCES companies(id),
    seller_id INTEGER REFERENCES sellers(id),
    user_id INTEGER REFERENCES users(id), -- The user/client the quote is for.
    duration VARCHAR(255),
    period TEXT,
    total_amount DECIMAL(10, 2) NOT NULL,
    first_payment_amount DECIMAL(10, 2),
    valid_until DATE,
    
    -- Fields from the 'greetings' object are embedded here for simplicity.
    greeting_template TEXT,
    greeting_line1 TEXT,
    greeting_line2 TEXT,
    greeting_line3 TEXT,
    greeting_line4 TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for courses associated with a quotation.
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    quote_id INTEGER NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    school_id INTEGER REFERENCES schools(id), -- A course is offered by a school.
    logo TEXT,
    name TEXT NOT NULL,
    location VARCHAR(255),
    period TEXT
);

-- Table for the price breakdown of each course.
CREATE TABLE course_prices (
    id SERIAL PRIMARY KEY,
    course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Table for extra fees associated with a quotation (e.g., VISA, OSHC).
CREATE TABLE extras (
    id SERIAL PRIMARY KEY,
    quote_id INTEGER NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    logo TEXT,
    name TEXT NOT NULL,
    period TEXT,
    price DECIMAL(10, 2) NOT NULL
);

-- Table for payment plan installments.
CREATE TABLE payment_plan_installments (
    id SERIAL PRIMARY KEY,
    quote_id INTEGER NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
    due_date DATE,
    is_first_payment BOOLEAN DEFAULT FALSE,
    description TEXT
);

-- Table for individual payments within an installment.
CREATE TABLE installment_payments (
    id SERIAL PRIMARY KEY,
    installment_id INTEGER NOT NULL REFERENCES payment_plan_installments(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- ====== INDEXES ======
-- Add indexes on foreign keys to improve query performance.
CREATE INDEX idx_quotes_company_id ON quotes(company_id);
CREATE INDEX idx_quotes_seller_id ON quotes(seller_id);
CREATE INDEX idx_quotes_user_id ON quotes(user_id);
CREATE INDEX idx_courses_quote_id ON courses(quote_id);
CREATE INDEX idx_courses_school_id ON courses(school_id);
CREATE INDEX idx_course_prices_course_id ON course_prices(course_id);
CREATE INDEX idx_extras_quote_id ON extras(quote_id);
CREATE INDEX idx_payment_plan_installments_quote_id ON payment_plan_installments(quote_id);
CREATE INDEX idx_installment_payments_installment_id ON installment_payments(installment_id);
