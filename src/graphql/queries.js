/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDocumentProcessingRecord = /* GraphQL */ `
  query GetDocumentProcessingRecord($id: ID!) {
    getDocumentProcessingRecord(id: $id) {
      id
      author
      organisation
      s3Key
      createdAt
      updatedAt
    }
  }
`;
export const listDocumentProcessingRecords = /* GraphQL */ `
  query ListDocumentProcessingRecords(
    $filter: ModelDocumentProcessingRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDocumentProcessingRecords(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        author
        organisation
        s3Key
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
