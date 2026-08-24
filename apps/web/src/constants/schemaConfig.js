export const SCHEMA_CONFIG = {
  tables: [
    {
      name: "Users",
      description: "Core table storing user authentication and profile details.",
      columns: [
        { name: "id", type: "UUID", constraints: ["PK", "NOT NULL", "UNIQUE"], description: "Unique identifier for user" },
        { name: "email", type: "VARCHAR(255)", constraints: ["NOT NULL", "UNIQUE"], description: "User's email address" },
        { name: "name", type: "VARCHAR(100)", constraints: ["NOT NULL"], description: "User's full name" },
        { name: "password", type: "VARCHAR(255)", constraints: ["NOT NULL"], description: "Hashed password" },
        { name: "role", type: "VARCHAR(50)", constraints: ["DEFAULT 'user'"], description: "User role (admin, user)" },
        { name: "createdAt", type: "TIMESTAMP", constraints: ["NOT NULL", "DEFAULT NOW()"], description: "Account creation date" },
        { name: "updatedAt", type: "TIMESTAMP", constraints: [], description: "Last profile update" },
        { name: "isActive", type: "BOOLEAN", constraints: ["DEFAULT true"], description: "Account status flag" },
        { name: "avatar", type: "VARCHAR(500)", constraints: [], description: "URL to user profile image" },
        { name: "bio", type: "TEXT", constraints: [], description: "Short biography about the user" }
      ],
      relationships: [
        { type: "One-to-Many", target: "BlogPosts", foreignKey: "author_id" },
        { type: "One-to-Many", target: "Projects", foreignKey: "owner_id" }
      ]
    },
    {
      name: "BlogPosts",
      description: "Stores articles and blog posts written by users.",
      columns: [
        { name: "id", type: "UUID", constraints: ["PK", "NOT NULL", "UNIQUE"], description: "Post identifier" },
        { name: "title", type: "VARCHAR(200)", constraints: ["NOT NULL"], description: "Blog title" },
        { name: "slug", type: "VARCHAR(255)", constraints: ["NOT NULL", "UNIQUE"], description: "URL-friendly title string" },
        { name: "content", type: "TEXT", constraints: ["NOT NULL"], description: "Full HTML or Markdown content" },
        { name: "author_id", type: "UUID", constraints: ["FK", "NOT NULL"], description: "References Users.id" },
        { name: "category", type: "VARCHAR(100)", constraints: [], description: "Post categorization" },
        { name: "tags", type: "ARRAY", constraints: [], description: "Array of topic tags" },
        { name: "status", type: "VARCHAR(20)", constraints: ["DEFAULT 'draft'"], description: "Draft, published, or archived" },
        { name: "views", type: "INTEGER", constraints: ["DEFAULT 0"], description: "View count counter" },
        { name: "likes", type: "INTEGER", constraints: ["DEFAULT 0"], description: "Like count counter" },
        { name: "createdAt", type: "TIMESTAMP", constraints: ["NOT NULL", "DEFAULT NOW()"], description: "Creation date" },
        { name: "updatedAt", type: "TIMESTAMP", constraints: [], description: "Last edited date" },
        { name: "publishedAt", type: "TIMESTAMP", constraints: [], description: "Date when published" }
      ],
      relationships: [
        { type: "Many-to-One", target: "Users", foreignKey: "author_id" },
        { type: "One-to-Many", target: "Comments", foreignKey: "post_id" }
      ]
    },
    {
      name: "Projects",
      description: "Records of user-created initiatives and developmental projects.",
      columns: [
        { name: "id", type: "UUID", constraints: ["PK", "NOT NULL", "UNIQUE"], description: "Project identifier" },
        { name: "title", type: "VARCHAR(200)", constraints: ["NOT NULL"], description: "Project name" },
        { name: "description", type: "TEXT", constraints: ["NOT NULL"], description: "Detailed description of the project" },
        { name: "owner_id", type: "UUID", constraints: ["FK", "NOT NULL"], description: "References Users.id" },
        { name: "status", type: "VARCHAR(50)", constraints: ["DEFAULT 'active'"], description: "Active, completed, on hold" },
        { name: "category", type: "VARCHAR(100)", constraints: [], description: "Industry or category" },
        { name: "tags", type: "ARRAY", constraints: [], description: "Associated technologies or topics" },
        { name: "members", type: "ARRAY", constraints: [], description: "List of user IDs participating" },
        { name: "startDate", type: "DATE", constraints: [], description: "Project initiation date" },
        { name: "endDate", type: "DATE", constraints: [], description: "Expected or actual completion" },
        { name: "createdAt", type: "TIMESTAMP", constraints: ["DEFAULT NOW()"], description: "Record creation date" },
        { name: "updatedAt", type: "TIMESTAMP", constraints: [], description: "Record last modified date" }
      ],
      relationships: [
        { type: "Many-to-One", target: "Users", foreignKey: "owner_id" }
      ]
    },
    {
      name: "Events",
      description: "Scheduled meetups, webinars, and conferences.",
      columns: [
        { name: "id", type: "UUID", constraints: ["PK", "NOT NULL"], description: "Event identifier" },
        { name: "title", type: "VARCHAR(200)", constraints: ["NOT NULL"], description: "Event name" },
        { name: "description", type: "TEXT", constraints: [], description: "Details about the event" },
        { name: "date", type: "TIMESTAMP", constraints: ["NOT NULL"], description: "Scheduled date and time" },
        { name: "location", type: "VARCHAR(255)", constraints: ["NOT NULL"], description: "Physical address or virtual link" },
        { name: "organizer_id", type: "UUID", constraints: ["FK", "NOT NULL"], description: "References Users.id" },
        { name: "attendees", type: "ARRAY", constraints: [], description: "Array of RSVP'd User IDs" },
        { name: "capacity", type: "INTEGER", constraints: [], description: "Maximum allowed attendees" },
        { name: "status", type: "VARCHAR(50)", constraints: ["DEFAULT 'upcoming'"], description: "Upcoming, ongoing, or past" },
        { name: "createdAt", type: "TIMESTAMP", constraints: ["DEFAULT NOW()"], description: "Event created date" },
        { name: "updatedAt", type: "TIMESTAMP", constraints: [], description: "Event modified date" }
      ],
      relationships: [
        { type: "Many-to-One", target: "Users", foreignKey: "organizer_id" }
      ]
    },
    {
      name: "Products",
      description: "Marketplace listings for physical or digital goods.",
      columns: [
        { name: "id", type: "UUID", constraints: ["PK", "NOT NULL"], description: "Product unique ID" },
        { name: "name", type: "VARCHAR(200)", constraints: ["NOT NULL"], description: "Product name" },
        { name: "description", type: "TEXT", constraints: [], description: "Product description" },
        { name: "price", type: "DECIMAL(10,2)", constraints: ["NOT NULL"], description: "Cost in standard currency" },
        { name: "category", type: "VARCHAR(100)", constraints: [], description: "Product category" },
        { name: "stock", type: "INTEGER", constraints: ["DEFAULT 0"], description: "Available quantity" },
        { name: "sku", type: "VARCHAR(100)", constraints: ["UNIQUE"], description: "Stock keeping unit" },
        { name: "images", type: "ARRAY", constraints: [], description: "Array of image URLs" },
        { name: "status", type: "VARCHAR(50)", constraints: ["DEFAULT 'available'"], description: "Available, out_of_stock, hidden" },
        { name: "createdAt", type: "TIMESTAMP", constraints: ["DEFAULT NOW()"], description: "Listing creation date" },
        { name: "updatedAt", type: "TIMESTAMP", constraints: [], description: "Listing update date" }
      ],
      relationships: []
    },
    {
      name: "PortfolioItems",
      description: "Showcase items highlighting user skills or past work.",
      columns: [
        { name: "id", type: "UUID", constraints: ["PK", "NOT NULL"], description: "Item ID" },
        { name: "title", type: "VARCHAR(200)", constraints: ["NOT NULL"], description: "Project/Work title" },
        { name: "description", type: "TEXT", constraints: [], description: "Work description and outcome" },
        { name: "owner_id", type: "UUID", constraints: ["FK", "NOT NULL"], description: "References Users.id" },
        { name: "images", type: "ARRAY", constraints: [], description: "Preview images" },
        { name: "link", type: "VARCHAR(255)", constraints: [], description: "External URL to live work" },
        { name: "tags", type: "ARRAY", constraints: [], description: "Skills and tools used" },
        { name: "createdAt", type: "TIMESTAMP", constraints: ["DEFAULT NOW()"], description: "Added on date" },
        { name: "updatedAt", type: "TIMESTAMP", constraints: [], description: "Last updated" }
      ],
      relationships: [
        { type: "Many-to-One", target: "Users", foreignKey: "owner_id" }
      ]
    },
    {
      name: "Teams",
      description: "Group structures allowing users to collaborate.",
      columns: [
        { name: "id", type: "UUID", constraints: ["PK", "NOT NULL"], description: "Team identifier" },
        { name: "name", type: "VARCHAR(150)", constraints: ["NOT NULL"], description: "Team display name" },
        { name: "description", type: "TEXT", constraints: [], description: "Team mission or description" },
        { name: "leader_id", type: "UUID", constraints: ["FK", "NOT NULL"], description: "References Users.id (Captain)" },
        { name: "members", type: "ARRAY", constraints: [], description: "Array of Users.id" },
        { name: "createdAt", type: "TIMESTAMP", constraints: ["DEFAULT NOW()"], description: "Formation date" },
        { name: "updatedAt", type: "TIMESTAMP", constraints: [], description: "Last modified" }
      ],
      relationships: [
        { type: "Many-to-One", target: "Users", foreignKey: "leader_id" }
      ]
    },
    {
      name: "Comments",
      description: "Polymorphic comments attached to posts, projects, etc.",
      columns: [
        { name: "id", type: "UUID", constraints: ["PK", "NOT NULL"], description: "Comment identifier" },
        { name: "content", type: "TEXT", constraints: ["NOT NULL"], description: "Comment body text" },
        { name: "author_id", type: "UUID", constraints: ["FK", "NOT NULL"], description: "References Users.id" },
        { name: "post_id", type: "UUID", constraints: ["NOT NULL"], description: "ID of the commented entity" },
        { name: "post_type", type: "VARCHAR(50)", constraints: ["NOT NULL"], description: "Entity type (e.g., BlogPost, Project)" },
        { name: "likes", type: "INTEGER", constraints: ["DEFAULT 0"], description: "Number of upvotes" },
        { name: "createdAt", type: "TIMESTAMP", constraints: ["DEFAULT NOW()"], description: "Time of posting" },
        { name: "updatedAt", type: "TIMESTAMP", constraints: [], description: "Time of edit" }
      ],
      relationships: [
        { type: "Many-to-One", target: "Users", foreignKey: "author_id" }
      ]
    },
    {
      name: "Followers",
      description: "Tracks user connections and subscriptions.",
      columns: [
        { name: "id", type: "UUID", constraints: ["PK", "NOT NULL"], description: "Relationship ID" },
        { name: "follower_id", type: "UUID", constraints: ["FK", "NOT NULL"], description: "User who follows" },
        { name: "following_id", type: "UUID", constraints: ["FK", "NOT NULL"], description: "User being followed" },
        { name: "createdAt", type: "TIMESTAMP", constraints: ["DEFAULT NOW()"], description: "When connection was made" }
      ],
      relationships: [
        { type: "Many-to-One", target: "Users", foreignKey: "follower_id" },
        { type: "Many-to-One", target: "Users", foreignKey: "following_id" }
      ]
    },
    {
      name: "ActivityLogs",
      description: "Audit trail for system events and user actions.",
      columns: [
        { name: "id", type: "UUID", constraints: ["PK", "NOT NULL"], description: "Log ID" },
        { name: "user_id", type: "UUID", constraints: ["FK"], description: "User performing the action" },
        { name: "action", type: "VARCHAR(100)", constraints: ["NOT NULL"], description: "CRUD operation type" },
        { name: "entity_type", type: "VARCHAR(100)", constraints: ["NOT NULL"], description: "Affected table name" },
        { name: "entity_id", type: "UUID", constraints: [], description: "Affected record ID" },
        { name: "changes", type: "JSONB", constraints: [], description: "Payload of what was changed" },
        { name: "timestamp", type: "TIMESTAMP", constraints: ["DEFAULT NOW()"], description: "When action occurred" }
      ],
      relationships: [
        { type: "Many-to-One", target: "Users", foreignKey: "user_id" }
      ]
    }
  ]
};