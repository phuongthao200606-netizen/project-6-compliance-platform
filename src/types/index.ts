export type DiffClassification = 'Added' | 'Modified' | 'Removed' | 'Unchanged';
export type ApprovalStatus = 'Đã duyệt' | 'Chờ duyệt' | 'Yêu cầu sửa';

export interface DiffItem {
  id: string;
  Change_ID: string;
  legalBasis: string;
  oldContent: string;
  newContent: string;
  classification: DiffClassification;
  approvalStatus: ApprovalStatus;
}

export type ComplianceStatus = 'Đã tuân thủ' | 'Đang xử lý' | 'Chưa thực hiện';

export interface ChecklistItem {
  id: string;
  obligationId: string; // AML-01, etc.
  requirement: string;
  subject: string;
  action: string;
  evidence: string;
  status: ComplianceStatus;
}

export type ImpactLevel = 'HIGH' | 'MEDIUM' | 'LOW';
export type VerificationStatus = 'Đã có căn cứ' | 'Dự kiến' | 'Chưa xác định';

export interface ImpactItem {
  id: string;
  Change_ID: string;
  Legal_Basis: string;
  Change_Summary: string;
  Requirement: string;
  Affected_Department: string;
  Affected_Process: string;
  Affected_Data_Field: string;
  Impact_Level: ImpactLevel;
  Required_Action: string;
  Evidence: string;
  Verification_Status: VerificationStatus;
}

export interface QueryResult {
  text: string;
  isRefusal: boolean;
  citation?: string;
  timestamp: string;
}
