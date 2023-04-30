/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDocumentProcessingRecord = /* GraphQL */ `
  subscription OnCreateDocumentProcessingRecord(
    $filter: ModelSubscriptionDocumentProcessingRecordFilterInput
    $organisation: String
  ) {
    onCreateDocumentProcessingRecord(
      filter: $filter
      organisation: $organisation
    ) {
      id
      author
      organisation
      s3Key
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDocumentProcessingRecord = /* GraphQL */ `
  subscription OnUpdateDocumentProcessingRecord(
    $filter: ModelSubscriptionDocumentProcessingRecordFilterInput
    $organisation: String
  ) {
    onUpdateDocumentProcessingRecord(
      filter: $filter
      organisation: $organisation
    ) {
      id
      author
      organisation
      s3Key
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDocumentProcessingRecord = /* GraphQL */ `
  subscription OnDeleteDocumentProcessingRecord(
    $filter: ModelSubscriptionDocumentProcessingRecordFilterInput
    $organisation: String
  ) {
    onDeleteDocumentProcessingRecord(
      filter: $filter
      organisation: $organisation
    ) {
      id
      author
      organisation
      s3Key
      createdAt
      updatedAt
    }
  }
`;
