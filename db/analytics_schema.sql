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
