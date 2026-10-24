# SBV RegTech Compliance Platform (Project 06)
## Regulation & Compliance Intelligence Platform for State Bank of Vietnam (NHNN)

Hệ thống Nền tảng Trí tuệ Nhân tạo hỗ trợ Pháp chế & Tuân thủ Quy định Ngân hàng Nhà nước Việt Nam (SBV). Ứng dụng đã được chuyển đổi hoàn chỉnh từ Streamlit Python sang React 18, TypeScript và Tailwind CSS, bảo lưu toàn bộ thuật toán, bộ dữ liệu và quy trình nghiệp vụ gốc.

---

### 🏛️ Các Tính Năng Cốt Lõi (Core Features)

1. **Header & Thẻ Chỉ Số Gradient (Enterprise Metrics):**
   - 📄 **Điều khoản Đã Phân tích**: 35 điều khoản từ Thông tư 09/2023/TT-NHNN và Thông tư 12/2024/TT-NHNN.
   - ✅ **Yêu cầu Tuân thủ**: 12 nghĩa vụ tuân thủ được bóc tách 4 trường cốt lõi.
   - 🔄 **Quy trình Ảnh hưởng**: 08 quy trình ngân hàng trọng yếu (Tín dụng, QLRR, LOS/Core Banking).
   - 🎯 **Độ chính xác (Accuracy)**: 96.8% với cơ chế Zero Hallucination Guardrail.

2. **Tab 1: Tra Cứu & Dẫn Nguồn Pháp Lý (RAG Q&A Engine):**
   - Hỗ trợ câu hỏi mẫu kiểm thử nhanh (Hạn mức vay nhỏ 100tr, Hồ sơ vay vốn giá trị nhỏ, Thời hạn báo cáo AML, Test Cảnh báo Refusal).
   - **Refusal Safety Guardrail**: Tự động phát hiện các từ khóa ngoài phạm vi (ngoại tệ, lãi suất trần, vàng, chứng khoán, cổ phiếu, tiền ảo...) và đưa ra cảnh báo từ chối chính xác: `⚠️ Cảnh báo: Thiếu căn cứ nguồn rõ ràng trong văn bản NHNN được cung cấp.`
   - Hỗ trợ gọi trực tiếp Google Gemini API (với API Key tùy chọn) hoặc chế độ Ngoại tuyến (Offline Mock RAG Engine) phản hồi chính xác kèm Citation: `(Dẫn nguồn: [Tên văn bản] | [Điều] | [Khoản] | [Trang])`.
   - Xem toàn văn Căn cứ Pháp lý Gốc của NHNN qua modal popup.

3. **Tab 2: So Sánh Biến Động Quy Định (Diff Comparison Engine):**
   - Đối chiếu Thông tư 39/2016/TT-NHNN vs Thông tư 12/2024/TT-NHNN.
   - **Donut Chart** tương tác thể hiện tỷ lệ biến động:
     - Sửa đổi (Modified): 12 điều (41.4%)
     - Thêm mới (Added): 7 điều (24.1%)
     - Bãi bỏ (Removed): 2 điều (6.9%)
     - Giữ nguyên (Unchanged): 8 điều (27.6%)
   - **Bảng Thẩm định Điều khoản (Human-in-the-loop):**
     - Cho phép chỉnh sửa nội dung cũ, nội dung mới, thay đổi phân loại và cập nhật trạng thái duyệt (*Đã duyệt*, *Chờ duyệt*, *Yêu cầu sửa*).
     - Nút phê duyệt nhanh toàn bộ (*✅ Phê duyệt Tất cả*).
     - Thêm điều khoản mới và xuất dữ liệu ra file `diff_comparison_tt39_tt12.csv` (hỗ trợ UTF-8 BOM cho Excel).

4. **Tab 3: Compliance Checklist & Bản Đồ Tác Động (Impact Map):**
   - **Sub-tab 1 - Compliance Checklist:** Bóc tách 4 trường cốt lõi (*Requirement, Subject, Action, Evidence/Control*), cập nhật trạng thái tuân thủ và xuất `compliance_checklist_nhnn.csv`.
   - **Sub-tab 2 - Regulatory Impact Map (11 Cột Chuẩn):** Mô hình hóa quan hệ nhân quả logic (*Change_ID, Legal_Basis, Change_Summary, Requirement, Affected_Department, Affected_Process, Affected_Data_Field, Impact_Level, Required_Action, Evidence, Verification_Status*). Bộ lọc mức độ tác động HIGH / MEDIUM / LOW và xuất file `regulatory_impact_map_nhnn.csv`.

5. **Đội ngũ Phát triển (Nhóm 06):**
   - 👑 **Trưởng nhóm:** Phương Thảo (Chỉ đạo & Kiến trúc chung)
   - **Bảo Châu:** CV-01 (Ground Truth)
   - **Thúy Hiền:** CV-02 (Diff Engine)
   - **Như Ý:** CV-03 (Checklist & Impact)
   - **Minh Anh:** CV-04 (Streamlit Prototype)
   - **Vòng Ngọc:** CV-05 (Evaluation & QA)

---

### 🚀 Khởi Chạy Ứng Dụng

```bash
# Cài đặt thư viện
npm install

# Chạy môi trường phát triển (Port 3000)
npm run dev

# Biên dịch kiểm tra sản phẩm
npm run build
```
