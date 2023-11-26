/**
 * GenericResponse is a basic interface for API response structures.
 * It includes a `message` field for any relevant response messages,
 * `return` field for any return object from functions, and a
 * `statusCode` field for the HTTP status code of the response.
 *
 * @interface GenericResponse
 * @property {string} [message] - An optional message providing additional information about the response.
 * @property {any} [return] - An optional object which can be used as a return from a function.
 * @property {number} statusCode - The HTTP status code of the response.
 */
export interface GenericResponse {
  // Optional, but highly recommended
  message?: string
  // Optional return from the function
  return?: JSON | any
  statusCode: number
}

/**
 * GenericResponseObject is a basic interface for API response structures.
 * It includes a `success` field indicating whether the operation was successful,
 * a `message` field for any relevant response messages, and a `return` field for any return object from functions.
 *
 * @interface GenericResponseObject
 * @property {boolean} success - Indicates whether the operation was successful.
 * @property {string | undefined} [message] - An optional message providing additional information about the response.
 * @property {any} [return] - An optional object which can be used as a return from a function.
 */
export interface GenericResponseObject {
  success: boolean
  message?: string
  return?: any
}

/**
 * IndexResponse represents the structure of the response body from an Elasticsearch index operation API.
 * It provides information about the success of the indexing operation, including shard details,
 * index metadata, document identification, versioning, and the result of the operation.
 *
 * Documentation: https://www.elastic.co/guide/en/elasticsearch/reference/7.10/docs-index_.html
 *
 * @interface IndexResponse
 * @property {Object} _shards - Information about the replication process of the index operation.
 * @property {number} _shards.total - Indicates how many shard copies (primary and replica shards) the index operation should be executed on.
 * @property {number} _shards.successful - Indicates the number of shard copies the index operation succeeded on.
 * @property {number} _shards.failed - An array that contains replication-related errors in the case an index operation failed on a replica shard.
 *                                      0 indicates there were no failures.
 * @property {string} _index - The name of the index the document was added to.
 * @property {string} _type - The document type. Elasticsearch indices now support a single document type, _doc.
 * @property {string} _id - The unique identifier for the added document.
 * @property {number} _version - The document version. Incremented each time the document is updated.
 * @property {number} _seq_no - The sequence number assigned to the document for the indexing operation.
 *                             Sequence numbers are used to ensure an older version of a document doesn’t overwrite a newer version.
 *                             See Optimistic concurrency control.
 * @property {number} _primary_term - The primary term assigned to the document for the indexing operation.
 *                                    See Optimistic concurrency control.
 * @property {'created' | 'updated'} result - The result of the indexing operation, indicating whether the document was created or updated.
 */
export interface IndexResponse{
  _shards: {
    total: number;
    successful: number;
    failed: number;
  };
  _index: string;
  _type: string;
  _id: string;
  _version: number;
  _seq_no: number;
  _primary_term: number;
  result: 'created' | 'updated';
}
