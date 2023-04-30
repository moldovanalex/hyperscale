/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDocumentProcessingRecord = /* GraphQL */ `
  mutation CreateDocumentProcessingRecord(
    $input: CreateDocumentProcessingRecordInput!
    $condition: ModelDocumentProcessingRecordConditionInput
  ) {
    createDocumentProcessingRecord(input: $input, condition: $condition) {
      id
      author
      organisation
      s3Key
      createdAt
      updatedAt
    }
  }
`;
export const updateDocumentProcessingRecord = /* GraphQL */ `
  mutation UpdateDocumentProcessingRecord(
    $input: UpdateDocumentProcessingRecordInput!
    $condition: ModelDocumentProcessingRecordConditionInput
  ) {
    updateDocumentProcessingRecord(input: $input, condition: $condition) {
      id
      author
      organisation
      s3Key
      createdAt
      updatedAt
    }
  }
`;
export const deleteDocumentProcessingRecord = /* GraphQL */ `
  mutation DeleteDocumentProcessingRecord(
    $input: DeleteDocumentProcessingRecordInput!
    $condition: ModelDocumentProcessingRecordConditionInput
  ) {
    deleteDocumentProcessingRecord(input: $input, condition: $condition) {
      id
      author
      organisation
      s3Key
      createdAt
      updatedAt
    }
  }
`;
