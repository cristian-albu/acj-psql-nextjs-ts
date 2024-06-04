// Custom ENUM type for category
export type T_ToolCategory = "front-end" | "back-end" | "full-stack" | "design";

// Tools table
export type T_Tool = {
        tool_id: number;
        name: string;
        description: string;
        icon: string;
        category: T_ToolCategory;
};

// Certifications table
export type T_Certification = {
        certification_id: number;
        title: string;
        description: string;
        url: string;
        issuer: string;
        img: string;
        issued_at: string; // Using string to represent DATE
};

// Join table for certifications and tools
export type T_CertificationTool = {
        tool_id: number;
        certification_id: number;
};

// Clients table
export type T_Client = {
        client_id: number;
        name: string;
        url?: string;
        logo?: string;
        testimonial?: string;
        testimonial_name?: string;
        testimonial_image?: string;
};

// Projects table
export type T_Project = {
        project_id: number;
        name: string;
        description: string;
        start_date: string; // Using string to represent DATE
        end_date: string; // Using string to represent DATE
        client_id: number | null;
};

// Join table for projects and tools
export type T_ProjectTool = {
        project_id: number;
        tool_id: number;
};

// Experiences table
export type T_Experience = {
        experience_id: number;
        ongoing: boolean;
        start_date: string; // Using string to represent DATE
        end_date?: string; // Using string to represent DATE
        title: string;
        description: string;
};

// Join table for experiences and tools
export type T_ExperienceTool = {
        experience_id: number;
        tool_id: number;
};

// Meta users table
export type T_MetaUser = {
        meta_user_id: string;
        created_at: string; // Using string to represent TIMESTAMP
};

export type T_MetaUserBuildShape = Omit<T_MetaUser, "created_at">;

// Messages table
export type T_Message = {
        message_id: number;
        email: string;
        name: string;
        text_field: string;
        meta_user_id?: string;
};

// Meta users sessions table
export type T_MetaUserSession = {
        meta_user_session_id: number;
        created_at: string; // Using string to represent TIMESTAMP
        meta_user_id?: string;
};

export type T_MetaUserSessionBuildShape = Omit<T_MetaUserSession, "created_at" | "meta_user_session_id">;

// Page visits table
export type T_PageVisit = {
        page_visit_id: number;
        created_at: string; // Using string to represent TIMESTAMP
        page_url: string;
        meta_user_session_id: number | null;
};

export type T_ModelError = {
        error: string | null;
};
