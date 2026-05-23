---
id: 02-cohesion-and-coupling
title: 2.2 Cohesion và Coupling
sidebar_position: 2
description: "Hai khái niệm cốt lõi nhất trong modular design. Cohesion đo độ gắn kết bên trong module, Coupling đo độ phụ thuộc giữa các module. Mục tiêu vĩnh cửu: cohesion cao, coupling thấp."
---

# 2.2 Cohesion và Coupling

> **Tóm tắt một dòng**: Một module tốt là module mà các phần tử bên trong nó tập trung vào cùng một mục đích (cohesion cao) và không bị ràng buộc chặt vào các module khác (coupling thấp). Hai chỉ số này quyết định cả cost-to-change và cost-to-understand của codebase.

## Một câu hỏi trước khi vào định nghĩa

Bạn được giao maintain một codebase mới. Hai ngày sau, sếp yêu cầu thêm tính năng X. Bạn mở module dự định sửa và thấy nó:

- Có 47 method, trong đó chỉ 3 method liên quan tới X. 44 method còn lại là validation, logging, email sending, PDF export, tax calculation..., nói chung là "tất cả mọi thứ".
- Để hiểu logic của 3 method liên quan, bạn phải đọc 5 module khác mà nó import, mỗi module lại depend vào 3-5 module khác.
- Sau 4 giờ đọc code, bạn vẫn không chắc sửa method có gây side effect ở chỗ nào không.

Codebase trên có cohesion thấp (module ôm đồm) và coupling cao (đụng đến 1 thứ phải hiểu 10 thứ). Đó là code khó maintain, không phải vì developer dở, mà vì *structure* sai. Cohesion và coupling là hai chỉ số quan trọng nhất để chẩn đoán "structure sai" ở mức module.

## Cohesion là gì?

**Cohesion** đo *mức độ các phần tử bên trong một module tập trung vào một mục đích duy nhất*. Module có cohesion cao là module mà mọi method/field/class bên trong nó cùng phục vụ một bài toán cụ thể. Module có cohesion thấp là module "tạp hoá": chứa mọi thứ không liên quan nhau.

Constantine và Yourdon (1979) phân cohesion thành 7 mức, từ thấp nhất tới cao nhất:

### 1. Coincidental cohesion (tệ nhất)

Các phần tử ở cùng module hoàn toàn ngẫu nhiên, không có lý do logic nào. Ví dụ: một file `utils.py` chứa `parse_date`, `send_email`, `calculate_tax`, `compress_image`. Chúng không liên quan nhau, chỉ "tiện" đặt cùng chỗ.

```python
# Coincidental cohesion - tệ
class Utils:
    def parse_date(self, s): ...
    def send_email(self, to, msg): ...
    def calculate_tax(self, amount): ...
    def compress_image(self, img): ...
```

### 2. Logical cohesion (tệ)

Các phần tử được nhóm vì "cùng loại" hoạt động, nhưng làm việc khác nhau. Thường thấy ở các class kiểu `InputHandler` xử lý mọi input nhưng mỗi input là một logic riêng:

```python
class InputHandler:
    def handle(self, kind, data):
        if kind == 'json':
            return json.loads(data)
        elif kind == 'xml':
            return self._parse_xml(data)
        elif kind == 'csv':
            return self._parse_csv(data)
        # ... 20 nhánh khác
```

Vấn đề: thêm format mới phải sửa class này, vi phạm OCP. Cohesion logical thường được fix bằng polymorphism.

### 3. Temporal cohesion (trung bình)

Các phần tử ở cùng module vì *cùng thời điểm chạy*, không phải vì *cùng mục đích*. Ví dụ điển hình: `init()` function gọi 20 việc khởi tạo khác nhau (init logger, init DB, init cache, init metrics, ...).

```python
def initialize():
    setup_logging()
    connect_database()
    warm_cache()
    register_metrics()
    load_config()
```

Acceptable cho startup script, nhưng không nên dùng làm pattern cho business logic.

### 4. Procedural cohesion (trung bình)

Các phần tử cùng module vì cùng *thuộc một thủ tục*, chạy nối tiếp nhau. Ví dụ: `process_order` gọi `validate_input → check_stock → reserve_inventory → charge_card → ship`. Mỗi step không liên quan trực tiếp tới step trước về mặt data, nhưng cùng thuộc một workflow.

### 5. Communicational cohesion (khá)

Các phần tử cùng module vì cùng *thao tác trên một loại data*. Ví dụ: một class `OrderReport` có `generate_csv()`, `generate_pdf()`, `generate_excel()`, tất cả cùng tạo report từ Order entity.

### 6. Sequential cohesion (tốt)

Các phần tử cùng module vì *output của cái này là input của cái kia*. Ví dụ: pipeline xử lý ảnh: `load → resize → grayscale → save`, mỗi step nhận output của step trước.

### 7. Functional cohesion (tốt nhất)

Mọi phần tử cùng module hợp tác để *làm đúng một việc, không gì khác*. Class `TaxCalculator` chỉ tính thuế, load data, save data, format output đều ở module khác.

```python
class TaxCalculator:
    """Tính thuế theo luật Việt Nam 2024."""
    
    def __init__(self, brackets: list[TaxBracket]):
        self._brackets = brackets
    
    def calculate(self, income: Money) -> Money:
        # Logic tính thuế duy nhất, không làm việc gì khác
        ...
```

### Quy tắc thực dụng

Nhớ 7 mức trên là cứng. Dễ nhớ hơn là **3 mức**:

| Mức | Đặc điểm | Action |
|---|---|---|
| **Thấp** (coincidental, logical) | Module "tạp hoá" | Tách ra |
| **Trung bình** (temporal, procedural) | Có lý do gom chung nhưng yếu | OK cho infrastructure |
| **Cao** (communicational, sequential, functional) | Có lý do mạnh, nhất quán | Target cho business logic |

## Coupling là gì?

**Coupling** đo *mức độ một module bị ràng buộc vào module khác*. Hai module coupling cao là hai module mà thay đổi một bên thường buộc bên kia phải sửa. Hai module coupling thấp là hai module có thể evolve độc lập.

Coupling cũng được Constantine-Yourdon phân thành nhiều mức, từ nhẹ nhất tới nặng nhất:

### 1. Data coupling (nhẹ nhất, tốt)

Module A gọi module B và chỉ truyền data đơn giản (primitive type hoặc DTO).

```python
result = calculator.calculate(income=100_000_000, year=2024)
```

A không biết B implement ra sao. Chỉ data đi qua boundary.

### 2. Stamp coupling

A truyền cho B một struct/object lớn nhưng B chỉ dùng một phần.

```python
def calculate_tax(self, user: User):  # nhận cả User
    return user.income * 0.1  # nhưng chỉ dùng .income
```

Vấn đề: A bị couple với toàn bộ schema của User, dù chỉ cần `income`. Nếu User đổi schema, A có thể vỡ.

### 3. Control coupling

A truyền cho B một flag điều khiển flow.

```python
def render(self, mode: str):
    if mode == 'fast':
        ...
    elif mode == 'high_quality':
        ...
```

A biết "có 2 mode" → A và B đều cần đồng bộ. Thường refactor thành 2 method riêng hoặc polymorphism.

### 4. External coupling

Hai module cùng dùng một format ngoài (vd: file format, network protocol). Đổi format → cả hai phải sửa cùng lúc.

### 5. Common coupling

Hai module cùng share global mutable state.

```python
# config.py
DB_CONNECTION = None  # global

# module_a.py
config.DB_CONNECTION = create_pool()

# module_b.py  
config.DB_CONNECTION.execute(...)  # depend on global
```

Đổi cách init DB → mọi module dùng `DB_CONNECTION` đều có thể vỡ. Test khó vì state share.

### 6. Content coupling (tệ nhất)

Một module truy cập *trực tiếp internal* của module khác, gọi private method, đọc private field qua reflection, monkey-patch class của module khác.

```python
# module_b.py
class Cache:
    def __init__(self):
        self._store = {}  # private

# module_a.py
cache._store['key'] = 'value'  # đụng trực tiếp internal
```

Đổi internal của B → A vỡ ngay. Tránh tuyệt đối.

### Quy tắc thực dụng

Tương tự cohesion, có thể gom thành **3 mức**:

| Mức | Loại | Action |
|---|---|---|
| **Nhẹ** (data, stamp) | OK | Default state |
| **Trung bình** (control, external) | Refactor được thì refactor | Spot và fix dần |
| **Nặng** (common, content) | Phải xử ngay | Refactor priority cao |

## Mục tiêu vĩnh cửu: High cohesion + Low coupling

Hai nguyên tắc này là *kim chỉ nam* cho mọi quyết định module design. Tại sao?

### Lý do 1: Cost-to-understand

Cohesion cao → mở module ra bạn hiểu ngay nó làm gì. Đọc một file `TaxCalculator.py` 200 dòng tập trung vào tính thuế dễ hơn nhiều đọc file `BusinessLogic.py` 200 dòng làm đủ thứ.

Coupling thấp → để hiểu module A, bạn không cần đọc 10 module khác. Self-contained.

### Lý do 2: Cost-to-change

Cohesion cao → sửa một thứ chỉ cần sửa một chỗ. SRP nói cùng ý: "Mỗi module nên có một lý do thay đổi".

Coupling thấp → sửa module A không lan ra module B, C, D. Bug fix hay feature add đều khoanh vùng được.

### Lý do 3: Testability

Module cohesion cao → test focus vào một concern, không cần setup nhiều thứ.

Module coupling thấp → mock dependencies dễ. Coupling cao → mock nhiều, test mất công.

### Lý do 4: Reusability

Module cohesion cao + coupling thấp = reusable. Có thể bê sang dự án khác mà không kéo theo cả thế giới.

## Quan hệ giữa Cohesion-Coupling và SOLID

Năm nguyên lý SOLID đều quy về cohesion cao + coupling thấp ở các góc nhìn khác nhau:

| SOLID | Cohesion | Coupling | Góc nhìn |
|---|---|---|---|
| **SRP** | ↑ |, | Mỗi module một mục đích |
| **OCP** |, | ↓ | Extend không sửa code cũ |
| **LSP** |, | ↓ | Subtype substitutable → loose coupling |
| **ISP** | ↑ | ↓ | Interface nhỏ, client chỉ depend cái cần |
| **DIP** |, | ↓ | Depend vào abstraction, không vào concretion |

Bạn có thể coi SOLID là *operational rules* cho mục tiêu trừu tượng "high cohesion + low coupling". SOLID dễ áp dụng hơn vì có rule rõ ràng; cohesion-coupling khó áp dụng trực tiếp vì là khái niệm trừu tượng.

## Khi nào "coupling thấp" lại là bẫy?

Cảnh báo: cố giảm coupling đến mức 0 dẫn tới *over-abstraction*. Symptoms:

- Mọi class đều phải có interface riêng (kể cả class chỉ có 1 implementation).
- Dùng dependency injection cho mọi thứ, kể cả utility function (`StringFormatter` thay vì `format(s)`).
- Vẽ ra layer abstract mà không có lý do business.

Hệ quả: code đọc khó hơn (phải jump qua nhiều layer), build chậm hơn, performance kém hơn.

Heuristic: chỉ tách ra interface khi:

1. Có thật sự >1 implementation (hoặc rất có khả năng có trong 6 tháng tới).
2. Cần mock cho test.
3. Boundary giữa 2 team / 2 service / 2 deployment.

Đừng tách interface "phòng ngừa", đó là over-engineering.

## Tóm tắt

- **Cohesion** = phần tử trong module tập trung một mục đích → cao là tốt.
- **Coupling** = ràng buộc giữa các module → thấp là tốt.
- Mỗi cái có 6-7 mức, gom được thành 3 mức (thấp/trung/cao).
- Mục tiêu vĩnh cửu: **high cohesion + low coupling**.
- SOLID là operational rules để đạt mục tiêu này.
- Cẩn thận over-engineering khi cố giảm coupling.

Bài tiếp: [SRP, Single Responsibility Principle](03-srp.md), nguyên lý đầu tiên trong SOLID và thường bị hiểu sai nhất.
