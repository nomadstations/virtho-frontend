import { useDBSchema } from '@/contexts/DBSchemaContext';

export function useSchemaTracking() {
  const { logOperation, schema } = useDBSchema();

  const trackCreate = (tableName, data) => {
    logOperation('CREATE', tableName, { data });
  };

  const trackRead = (tableName, queryDetails = {}) => {
    logOperation('READ', tableName, { queryDetails });
  };

  const trackUpdate = (tableName, id, updatedData) => {
    logOperation('UPDATE', tableName, { id, updatedData });
  };

  const trackDelete = (tableName, id) => {
    logOperation('DELETE', tableName, { id });
  };

  const getOperationsHistory = (tableName = null) => {
    if (tableName) {
      return schema.operations.filter(op => op.entity_type === tableName);
    }
    return schema.operations;
  };

  return {
    trackCreate,
    trackRead,
    trackUpdate,
    trackDelete,
    getOperationsHistory
  };
}