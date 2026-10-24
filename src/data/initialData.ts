import { DiffItem, ChecklistItem, ImpactItem } from '../types';

export const LEGAL_KNOWLEDGE_BASE = `[CĂN CỨ PHÁP LÝ CHÍNH THỨC CỦA NGÂN HÀNG NHÀ NƯỚC VIỆT NAM (NHNN)]

1. THÔNG TƯ SỐ 09/2023/TT-NHNN (Hướng dẫn thực hiện Luật Phòng, chống rửa tiền):
- Điều 3 khoản 4: Phương pháp chấm điểm để đánh giá rủi ro rửa tiền và mức độ phù hợp của chính sách, quy định nội bộ theo tiêu chí, thang điểm và phân loại rõ ràng (Trang 4-5).
- Điều 3 khoản 5: Thu thập số liệu đánh giá rủi ro rửa tiền theo năm và hoàn thành báo cáo chậm nhất ngày 31/3 năm tiếp theo gửi Cục Phòng, chống rửa tiền (Trang 5).
- Điều 4 khoản 1: Đối tượng báo cáo có trách nhiệm ban hành quy trình quản lý rủi ro rửa tiền và phân loại khách hàng theo 3 mức độ rủi ro: Thấp, Trung bình, Cao (Trang 6).
- Điều 4 khoản 5: Áp dụng các biện pháp tăng cường đối với khách hàng có mức rủi ro rửa tiền cao: thu thập thêm chứng từ nhận biết khách hàng, tăng tần suất giám sát giao dịch và phải có sự phê duyệt của người quản lý cấp cao trước khi thiết lập giao dịch (Trang 7).
- Điều 5 khoản 6: Quy định về tuyển dụng nhân sự và bắt buộc tổ chức đào tạo kiến thức cơ bản về phòng, chống rửa tiền cho nhân viên mới trong thời hạn 06 tháng kể từ ngày tuyển dụng (Trang 9).

2. THÔNG TƯ SỐ 12/2024/TT-NHNN (Sửa đổi, bổ sung một số điều của Thông tư số 39/2016/TT-NHNN về hoạt động cho vay):
- Điều 1 khoản 1: Bổ sung khoản 11 vào Điều 2 về khái niệm "Khoản cho vay có mức giá trị nhỏ" là khoản cho vay không vượt quá 100.000.000 (một trăm triệu) đồng Việt Nam (Trang 1).
- Điều 1 khoản 4: Bổ sung quy định hồ sơ đề nghị vay vốn tại Điều 9. Đối với khoản vay giá trị nhỏ (<= 100 triệu VNĐ), khách hàng không bắt buộc phải cung cấp phương án sử dụng vốn khả thi, chỉ cần cung cấp tối thiểu thông tin về mục đích sử dụng vốn hợp pháp và khả năng tài chính trước khi TCTD quyết định cho vay (Trang 2-3).
- Điều 1 khoản 5: Sửa đổi, bổ sung Điều 16 về trách nhiệm cung cấp tài liệu chứng minh sử dụng vốn vay đúng mục đích của khách hàng (Trang 3).
- Điều 1 khoản 7: Sửa đổi Điều 24 về kiểm tra, giám sát việc sử dụng vốn vay. Tổ chức tín dụng có quyền tự quyết định hình thức kiểm tra đối với khoản vay nhỏ (Trang 4).
- Điều 2: Bãi bỏ toàn bộ hiệu lực áp dụng của Điều 29, Điều 32 và Điều 32g của Thông tư số 39/2016/TT-NHNN (Trang 5).`;

export const INITIAL_DIFF_DATA: DiffItem[] = [
  {
    id: "diff-1",
    Change_ID: "LOAN-01",
    legalBasis: "TT 12/2024 Điều 1 Khoản 1",
    oldContent: "(Chưa quy định định lượng riêng biệt cho khoản vay nhỏ)",
    newContent: "Khoản cho vay có mức giá trị nhỏ là khoản vay không vượt quá 100.000.000 (một trăm triệu) đồng Việt Nam.",
    classification: "Added",
    approvalStatus: "Đã duyệt"
  },
  {
    id: "diff-2",
    Change_ID: "LOAN-02",
    legalBasis: "TT 12/2024 Điều 1 Khoản 4",
    oldContent: "Hồ sơ bắt buộc phương án sử dụng vốn khả thi và kế hoạch trả nợ cho mọi hạn mức.",
    newContent: "Khoản vay nhỏ (<= 100 triệu VNĐ) miễn lập phương án khả thi chi tiết, chỉ cần tối thiểu thông tin mục đích hợp pháp và khả năng tài chính.",
    classification: "Modified",
    approvalStatus: "Đã duyệt"
  },
  {
    id: "diff-3",
    Change_ID: "LOAN-03",
    legalBasis: "TT 12/2024 Điều 1 Khoản 5",
    oldContent: "Khách hàng phải gửi văn bản chứng minh mục đích sử dụng vốn theo từng đợt giải ngân nghiêm ngặt.",
    newContent: "Khách hàng cung cấp tài liệu chứng minh sử dụng vốn theo thỏa thuận; đối với khoản vay nhỏ, áp dụng phương thức linh hoạt.",
    classification: "Modified",
    approvalStatus: "Đã duyệt"
  },
  {
    id: "diff-4",
    Change_ID: "LOAN-04",
    legalBasis: "TT 12/2024 Điều 1 Khoản 7",
    oldContent: "Bắt buộc kiểm tra thực địa việc sử dụng vốn định kỳ đối với 100% khoản vay sau giải ngân.",
    newContent: "Tổ chức tín dụng tự quyết định phương thức và chịu trách nhiệm về kiểm tra, giám sát sau cho vay đối với khoản vay nhỏ.",
    classification: "Modified",
    approvalStatus: "Chờ duyệt"
  },
  {
    id: "diff-5",
    Change_ID: "LOAN-05",
    legalBasis: "TT 12/2024 Điều 2",
    oldContent: "Quy định trình tự, thủ tục kiểm soát tại Điều 29, Điều 32 và Điều 32g Thông tư 39/2016/TT-NHNN.",
    newContent: "Chính thức bãi bỏ hiệu lực áp dụng của toàn bộ Điều 29, Điều 32 và Điều 32g.",
    classification: "Removed",
    approvalStatus: "Đã duyệt"
  }
];

export const INITIAL_CHECKLIST_DATA: ChecklistItem[] = [
  {
    id: "chk-1",
    obligationId: "AML-01",
    requirement: "Xây dựng phương pháp chấm điểm rủi ro rửa tiền theo thang điểm và tiêu chí rõ ràng.",
    subject: "Khối Quản trị Rủi ro & Khối Tuân thủ",
    action: "Ban hành bảng tiêu chí chấm điểm và ma trận rủi ro rửa tiền định lượng.",
    evidence: "Quy chế Quản lý rủi ro rửa tiền nội bộ được phê duyệt.",
    status: "Đã tuân thủ"
  },
  {
    id: "chk-2",
    obligationId: "AML-02",
    requirement: "Hoàn thành báo cáo đánh giá rủi ro rửa tiền định kỳ hàng năm.",
    subject: "Ban Phòng chống Rửa tiền (AML)",
    action: "Thu thập dữ liệu năm và hoàn thành báo cáo chậm nhất ngày 31/3 năm tiếp theo.",
    evidence: "Báo cáo nộp Cục Phòng, chống rửa tiền (NHNN) có biên nhận điện tử.",
    status: "Đang xử lý"
  },
  {
    id: "chk-3",
    obligationId: "AML-03",
    requirement: "Thiết lập quy trình nhận biết và phân loại khách hàng theo 3 mức độ rủi ro (Low/Med/High).",
    subject: "Khối Khách hàng & Vận hành",
    action: "Cập nhật trường phân loại rủi ro trên hệ thống LOS/Core Banking.",
    evidence: "Logs hệ thống KYC và sơ đồ luồng nhận diện khách hàng.",
    status: "Đã tuân thủ"
  },
  {
    id: "chk-4",
    obligationId: "AML-05",
    requirement: "Tổ chức đào tạo kiến thức cơ bản về phòng, chống rửa tiền cho nhân sự mới.",
    subject: "Khối Nhân sự (HR) & Khối Tuân thủ",
    action: "Triển khai khóa đào tạo hoàn thành trong vòng 6 tháng kể từ ngày tuyển dụng.",
    evidence: "Danh sách điểm danh LMS và bài kiểm tra nội bộ đạt chuẩn.",
    status: "Đang xử lý"
  },
  {
    id: "chk-5",
    obligationId: "LOAN-01",
    requirement: "Thiết lập hạn mức và luồng thẩm định riêng cho khoản vay nhỏ không quá 100 triệu.",
    subject: "Khối Khách hàng Cá nhân & Khối Tín dụng",
    action: "Cấu hình luồng phê duyệt và điều kiện giải ngân riêng trên hệ thống LOS.",
    evidence: "Biên bản nghiệm thu UAT hệ thống LOS và Quyết định ban hành sản phẩm.",
    status: "Chưa thực hiện"
  }
];

export const INITIAL_IMPACT_MAP_DATA: ImpactItem[] = [
  {
    id: "imp-1",
    Change_ID: "LOAN-01",
    Legal_Basis: "TT 12/2024 Điều 1 Khoản 1",
    Change_Summary: "Bổ sung khái niệm khoản vay nhỏ dưới 100 triệu VNĐ.",
    Requirement: "Định danh và thiết lập luồng xử lý riêng cho khoản vay <= 100tr",
    Affected_Department: "Khối Tín dụng, Khối CNTT, Khối QLRR",
    Affected_Process: "Quy trình Khởi tạo & Phê duyệt Khoản vay Tiêu dùng",
    Affected_Data_Field: "Is_Small_Loan (Bool), Loan_Limit_Amount",
    Impact_Level: "HIGH",
    Required_Action: "Sửa đổi Quy chế cho vay; Cập nhật logic thẩm định hệ thống LOS.",
    Evidence: "Quy chế Tín dụng sửa đổi; Test report hệ thống Core/LOS.",
    Verification_Status: "Đã có căn cứ"
  },
  {
    id: "imp-2",
    Change_ID: "LOAN-02",
    Legal_Basis: "TT 12/2024 Điều 1 Khoản 4",
    Change_Summary: "Miễn trừ phương án sử dụng vốn chi tiết với khoản vay nhỏ.",
    Requirement: "Đơn giản hóa hồ sơ vay vốn dưới 100 triệu đồng",
    Affected_Department: "Khối Khách hàng Cá nhân, Khối Pháp chế",
    Affected_Process: "Quy trình Tiếp nhận & Thẩm định Hồ sơ Vay vốn",
    Affected_Data_Field: "Capital_Use_Purpose_Type, Feasibility_Study_Doc",
    Impact_Level: "MEDIUM",
    Required_Action: "Rút gọn biểu mẫu đăng ký vay vốn, chỉ yêu cầu cam kết mục đích hợp pháp.",
    Evidence: "Bộ biểu mẫu hồ sơ vay vốn ban hành mới; Hướng dẫn nghiệp vụ.",
    Verification_Status: "Đã có căn cứ"
  },
  {
    id: "imp-3",
    Change_ID: "LOAN-04",
    Legal_Basis: "TT 12/2024 Điều 1 Khoản 7",
    Change_Summary: "Tự chủ quyết định hình thức kiểm tra sau vay đối với khoản nhỏ.",
    Requirement: "Xây dựng cơ chế giám sát sau giải ngân dựa trên mức độ rủi ro",
    Affected_Department: "Khối Quản lý Tín dụng, Khối QLRR",
    Affected_Process: "Quy trình Kiểm tra & Giám sát Sau Giải ngân",
    Affected_Data_Field: "Post_Disbursement_Audit_Method, Audit_Status",
    Impact_Level: "MEDIUM",
    Required_Action: "Chuyển từ kiểm tra thực địa 100% sang giám sát bằng dữ liệu/gọi điện ngẫu nhiên.",
    Evidence: "Chính sách kiểm tra sau cấp tín dụng sửa đổi.",
    Verification_Status: "Đã có căn cứ"
  },
  {
    id: "imp-4",
    Change_ID: "LOAN-05",
    Legal_Basis: "TT 12/2024 Điều 2",
    Change_Summary: "Bãi bỏ Điều 29, Điều 32 và Điều 32g Thông tư 39/2016/TT-NHNN.",
    Requirement: "Loại bỏ các quy trình và báo cáo liên quan đến điều khoản bãi bỏ",
    Affected_Department: "Khối Pháp chế, Khối Báo cáo Thống kê",
    Affected_Process: "Quy trình Báo cáo Định kỳ NHNN",
    Affected_Data_Field: "Chưa xác định",
    Impact_Level: "LOW",
    Required_Action: "Rà soát lại danh mục báo cáo quản trị, ngừng tạo các mẫu biểu thừa.",
    Evidence: "Văn bản hướng dẫn bãi bỏ thủ tục nội bộ.",
    Verification_Status: "Đã có căn cứ"
  },
  {
    id: "imp-5",
    Change_ID: "AML-02",
    Legal_Basis: "TT 09/2023 Điều 3 Khoản 5",
    Change_Summary: "Thời hạn nộp báo cáo đánh giá rủi ro rửa tiền hàng năm là 31/3.",
    Requirement: "Hoàn thiện và gửi báo cáo rủi ro rửa tiền định kỳ đúng hạn",
    Affected_Department: "Khối Tuân thủ, Ban Phòng Chống Rửa Tiền",
    Affected_Process: "Quy trình Thu thập Dữ liệu & Báo cáo AML Hằng năm",
    Affected_Data_Field: "AML_Risk_Score, Annual_Report_Date",
    Impact_Level: "HIGH",
    Required_Action: "Chốt số liệu trước 15/02 hằng năm, dự thảo báo cáo phê duyệt trước 15/03.",
    Evidence: "Báo cáo nộp Cục PCRT có xác nhận tiếp nhận điện tử.",
    Verification_Status: "Đã có căn cứ"
  }
];

export const TEAM_MEMBERS = [
  { role: "Trưởng nhóm", name: "Phương Thảo", task: "Chỉ đạo & Kiến trúc chung", isLead: true },
  { role: "Thành viên", name: "Bảo Châu", task: "CV-01 (Ground Truth)" },
  { role: "Thành viên", name: "Thúy Hiền", task: "CV-02 (Diff Engine)" },
  { role: "Thành viên", name: "Như Ý", task: "CV-03 (Checklist & Impact)" },
  { role: "Thành viên", name: "Minh Anh", task: "CV-04 (Streamlit Prototype)" },
  { role: "Thành viên", name: "Vòng Ngọc", task: "CV-05 (Evaluation & QA)" }
];

export const SAMPLE_QUERIES = [
  {
    label: "💰 Hạn mức vay nhỏ 100tr",
    query: "Quy định thế nào là khoản cho vay có mức giá trị nhỏ theo Thông tư 12/2024/TT-NHNN?"
  },
  {
    label: "📁 Hồ sơ vay vốn giá trị nhỏ",
    query: "Hồ sơ đề nghị vay vốn đối với khoản vay nhỏ dưới 100 triệu có bắt buộc phương án sử dụng vốn khả thi không?"
  },
  {
    label: "⏱️ Thời hạn báo cáo AML",
    query: "Thời hạn nộp báo cáo đánh giá rủi ro rửa tiền hằng năm của đối tượng báo cáo là khi nào?"
  },
  {
    label: "⚠️ Test Cảnh báo Refusal",
    query: "Quy định về mức lãi suất trần áp dụng cho vay tiêu dùng bằng ngoại tệ năm 2026?"
  }
];
