import React, { createContext, useContext, useState, useEffect } from 'react';
import { SCHEMA_CONFIG } from '@/constants/schemaConfig';

const DBSchemaContext = createContext();

export function useDBSchema() {
  return useContext(DBSchemaContext);
}

export function DBSchemaProvider({ children }) {
  const [schema, setSchema] = useState(() => {
    const saved = localStorage.getItem('virtho_db_schema');
    if (saved) return JSON.parse(saved);
    
    // Inject Courses table if it's not in SCHEMA_CONFIG
    let baseTables = SCHEMA_CONFIG.tables || [];
    if (!baseTables.find(t => t.name === 'Courses')) {
      baseTables.push({
        name: 'Courses',
        description: 'Stores e-learning course catalog and metadata.',
        columns: [
          { name: 'id', type: 'UUID', constraints: ['PK', 'NOT NULL'], description: 'Unique identifier' },
          { name: 'title', type: 'VARCHAR(255)', constraints: ['NOT NULL'], description: 'Course title' },
          { name: 'description', type: 'TEXT', constraints: [], description: 'Detailed course description' },
          { name: 'instructor', type: 'JSONB', constraints: ['NOT NULL'], description: 'Instructor details (name, avatar)' },
          { name: 'duration', type: 'VARCHAR(50)', constraints: [], description: 'Estimated completion time' },
          { name: 'level', type: 'VARCHAR(50)', constraints: [], description: 'Difficulty level (Beginner, Intermediate, Advanced)' },
          { name: 'category', type: 'VARCHAR(100)', constraints: [], description: 'Topic category' },
          { name: 'image', type: 'VARCHAR(512)', constraints: [], description: 'Course thumbnail URL' },
          { name: 'price', type: 'VARCHAR(50)', constraints: [], description: 'Course pricing' },
          { name: 'students_enrolled', type: 'INTEGER', constraints: ['DEFAULT 0'], description: 'Number of active students' },
          { name: 'rating', type: 'DECIMAL(3,2)', constraints: ['DEFAULT 0'], description: 'Average rating' },
          { name: 'modules', type: 'INTEGER', constraints: [], description: 'Number of curriculum modules' },
          { name: 'prerequisites', type: 'VARCHAR(255)', constraints: [], description: 'Required prior knowledge' },
          { name: 'start_date', type: 'VARCHAR(100)', constraints: [], description: 'Cohort start date or self-paced' },
          { name: 'end_date', type: 'VARCHAR(100)', constraints: [], description: 'Cohort end date' },
          { name: 'status', type: 'VARCHAR(50)', constraints: ['DEFAULT \'Draft\''], description: 'Active, Draft, or Archived' },
          { name: 'created_at', type: 'TIMESTAMP', constraints: ['NOT NULL'], description: 'Record creation time' },
          { name: 'updated_at', type: 'TIMESTAMP', constraints: ['NOT NULL'], description: 'Record last update time' }
        ],
        relationships: [
          { type: 'One-to-Many', foreignKey: 'course_id', target: 'Enrollments' },
          { type: 'One-to-Many', foreignKey: 'course_id', target: 'Reviews' }
        ]
      });
    }

    return {
      tables: baseTables,
      lastUpdated: new Date().toISOString(),
      operations: []
    };
  });

  useEffect(() => {
    localStorage.setItem('virtho_db_schema', JSON.stringify(schema));
  }, [schema]);

  const logOperation = (action, entity_type, details) => {
    setSchema(prev => {
      const newOperations = [
        {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          action,
          entity_type,
          ...details
        },
        ...prev.operations
      ].slice(0, 100);

      return {
        ...prev,
        lastUpdated: new Date().toISOString(),
        operations: newOperations
      };
    });
  };

  const getTableSchema = (tableName) => {
    return schema.tables.find(t => t.name === tableName);
  };

  const value = {
    schema,
    getTableSchema,
    logOperation
  };

  return (
    <DBSchemaContext.Provider value={value}>
      {children}
    </DBSchemaContext.Provider>
  );
}