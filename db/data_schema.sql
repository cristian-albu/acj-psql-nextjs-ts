-- Custom ENUM type for category
CREATE TYPE tool_category AS ENUM ('front-end', 'back-end', 'full-stack', 'design');

-- Tools table
CREATE TABLE tools (
    tool_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    icon VARCHAR(255) NOT NULL,
    category tool_category NOT NULL
);

-- Certifications table
CREATE TABLE certifications (
    certification_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL,
    issued_at DATE NOT NULL
);

-- Join table for certifications and tools
CREATE TABLE certifications_tools (
    tool_id INT NOT NULL,
    certification_id INT NOT NULL,
    PRIMARY KEY (tool_id, certification_id),
    FOREIGN KEY (tool_id) REFERENCES tools(tool_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (certification_id) REFERENCES certifications(certification_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Clients table
CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255),
    logo VARCHAR(255),
    testimonial VARCHAR(255),
    testimonial_name VARCHAR(255),
    testimonial_image VARCHAR(255)
);

-- Projects table
CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    client_id INT,
    FOREIGN KEY (client_id) REFERENCES clients(client_id) ON UPDATE CASCADE ON DELETE SET NULL
);

-- Join table for projects and tools
CREATE TABLE projects_tools (
    project_id INT NOT NULL,
    tool_id INT NOT NULL,
    PRIMARY KEY (project_id, tool_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (tool_id) REFERENCES tools(tool_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Experiences table
CREATE TABLE experiences (
    experience_id SERIAL PRIMARY KEY,
    ongoing BOOLEAN DEFAULT FALSE NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL
);

-- Join table for experiences and tools
CREATE TABLE experiences_tools (
    experience_id INT NOT NULL,
    tool_id INT NOT NULL,
    PRIMARY KEY (experience_id, tool_id),
    FOREIGN KEY (experience_id) REFERENCES experiences(experience_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (tool_id) REFERENCES tools(tool_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Meta users table
CREATE TABLE meta_users (
    meta_user_id VARCHAR(63) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages table
CREATE TABLE messages (
    message_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    text_field VARCHAR(255) NOT NULL,
    meta_user_id VARCHAR(63),
    FOREIGN KEY (meta_user_id) REFERENCES meta_users(meta_user_id) ON UPDATE CASCADE ON DELETE SET NULL
);

-- Meta users sessions table
CREATE TABLE meta_users_sessions (
    meta_user_session_id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    meta_user_id VARCHAR(63),
    FOREIGN KEY (meta_user_id) REFERENCES meta_users(meta_user_id) ON UPDATE CASCADE ON DELETE SET NULL
);

-- Page visits table
CREATE TABLE page_visits (
    page_visit_id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    page_url VARCHAR(255) NOT NULL,
    meta_user_session_id INT NOT NULL,
    FOREIGN KEY (meta_user_session_id) REFERENCES meta_users_sessions(meta_user_session_id) ON UPDATE CASCADE ON DELETE SET NULL
);
