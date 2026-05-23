---
id: 03-srp
title: 2.3 SRP, Single Responsibility Principle
sidebar_position: 3
description: SRP không phải "mỗi class chỉ làm một việc" như đa số người nghĩ. Định nghĩa modern của Robert Martin là về actors, mỗi module chỉ nên có một lý do để thay đổi vì một stakeholder.
---

# 2.3 SRP, Single Responsibility Principle

> **Tóm tắt một dòng**: SRP nói "Mỗi module nên có duy nhất một lý do để thay đổi", với "lý do" là một *actor* (một nhóm stakeholder có cùng yêu cầu), không phải là "một function" hay "một concept" như thường bị giảng sai.

## Phiên bản hay bị giảng sai

Mở Google search "Single Responsibility Principle" và bạn sẽ thấy 90% bài viết định nghĩa như sau:

> "A class should do only one thing."

Định nghĩa này gần như vô dụng vì "one thing" có thể là bất cứ scope nào. Một class `User` có method `getName()` và `getEmail()`, hai method, hai "thing". Vi phạm SRP? Không. Một class `Calculator` có 10 method tính toán khác nhau, vi phạm? Không.

Vấn đề: định nghĩa này không cho bạn rule kiểm tra được. Nó dẫn tới hệ quả tai hại: developer chia class quá nhỏ ("god classes" thành "fragment classes"), code phình ra hàng trăm class siêu nhỏ, gây overhead cognitive cao mà không giảm bug.

Robert C. Martin nhận ra vấn đề này và sau ~20 năm đã định nghĩa lại SRP trong sách *Clean Architecture* (2017):

> "A module should be responsible to one, and only one, actor."

## Định nghĩa modern: SRP về Actor

**Actor** = một nhóm stakeholder có cùng yêu cầu thay đổi đối với module.

Ví dụ trong một hệ payroll:

- **CFO** (Chief Financial Officer) muốn report về cost lương theo phòng ban.
- **HR Manager** muốn export danh sách lương để gửi ngân hàng.
- **DBA** muốn migrate database schema.

Cả ba đều có thể yêu cầu "sửa class Employee", nhưng họ là *ba actor khác nhau*, yêu cầu của họ có thể *xung đột*. CFO muốn thay đổi cách tính cost (vd: phân bổ benefit theo phòng); HR muốn thay đổi format export; DBA muốn thay đổi cách lưu data. Nếu class `Employee` chứa cả ba logic này, ba yêu cầu có thể đụng nhau trong cùng một method.

SRP nói: **mỗi class nên phục vụ đúng một actor**. Có 3 actor → cần 3 class.

## Ví dụ kinh điển

### Vi phạm SRP

```python
class Employee:
    def __init__(self, name, salary, hours_worked):
        self.name = name
        self.salary = salary
        self.hours_worked = hours_worked
    
    def calculate_pay(self) -> Money:
        """Dùng bởi accounting team (Actor: CFO)."""
        # Logic phức tạp tính lương theo tax rule mới
        ...
    
    def report_hours(self) -> Hours:
        """Dùng bởi HR team (Actor: HR Manager)."""
        # Có thể overlap với calculate_pay vì cùng dùng hours_worked
        ...
    
    def save(self) -> None:
        """Dùng bởi DBA (Actor: tech ops)."""
        # SQL persistence
        ...
```

Ba method, ba actor. Vấn đề:

1. **Bug do shared state**: CFO yêu cầu "tính lương theo gross hours" và HR yêu cầu "report theo net hours". Cả hai method dùng `self.hours_worked`, đổi một bên dễ phá bên kia.
2. **Merge conflict**: Team CFO sửa `calculate_pay`, team HR sửa `report_hours`, cùng file → merge conflict.
3. **Test phức tạp**: test `calculate_pay` cần setup state mà `report_hours` cũng đụng.

### Tuân thủ SRP

Tách thành 3 class theo 3 actor:

```python
@dataclass
class EmployeeData:
    """Pure data, không có business logic."""
    id: str
    name: str
    base_salary: Money
    hours_worked: Hours

class PayCalculator:
    """Actor: CFO. Phụ trách logic tính lương."""
    def __init__(self, tax_rules: TaxRules):
        self._tax = tax_rules
    
    def calculate(self, emp: EmployeeData) -> Money:
        gross = emp.base_salary + self._overtime_pay(emp.hours_worked)
        return gross - self._tax.compute(gross)
    
    def _overtime_pay(self, h: Hours) -> Money: ...

class HourReporter:
    """Actor: HR Manager. Phụ trách logic report giờ làm."""
    def report(self, emp: EmployeeData) -> HoursReport:
        # Có thể có rule khác (vd: trừ break time) khác calculate_pay
        ...

class EmployeeRepository:
    """Actor: DBA. Phụ trách persistence."""
    def save(self, emp: EmployeeData) -> None: ...
    def find_by_id(self, id: str) -> EmployeeData: ...
```

Bây giờ:

- CFO yêu cầu đổi cách tính lương → chỉ sửa `PayCalculator`. HR và DBA không bị ảnh hưởng.
- HR yêu cầu đổi report format → chỉ sửa `HourReporter`.
- DBA muốn migrate schema → chỉ sửa `EmployeeRepository`. Business logic không đụng.

## Cách identify actor trong dự án

Trong dự án thật, "actor" không phải lúc nào cũng rõ ràng. Vài heuristic:

### Heuristic 1: Hỏi "ai sẽ yêu cầu sửa cái này?"

Mở một class, đọc từng method, tự hỏi: "Method này, nếu phải sửa, thường vì ai/team nào yêu cầu?". Nếu các method trong class đến từ 2-3+ team khác nhau → vi phạm SRP.

### Heuristic 2: Map class lên org chart

Một class tuân thủ SRP thường ánh xạ 1-1 lên một role/team trong tổ chức. `OrderProcessor` phục vụ Order team. `PaymentGateway` phục vụ Payment team. `AuditLogger` phục vụ Compliance team.

Nếu một class kéo nhiều phòng ban → cần tách.

### Heuristic 3: Theo dõi history

Tools như `git log -p path/to/file.py` cho thấy ai đã sửa file này và vì sao (qua commit message). Nếu một file được sửa bởi 5-10 team khác nhau với mục đích khác nhau → SRP violation.

### Heuristic 4: Theo dõi merge conflict

Nếu một file thường xuyên gây merge conflict giữa các team → đó là dấu hiệu nó đang phục vụ nhiều actor.

## Các pattern fix SRP violation

### Pattern 1: Extract Class

Tách methods ra một class mới, mỗi class một actor.

Trước:

```python
class User:
    def get_profile(self): ...      # UI team
    def calculate_tax(self): ...    # Finance team
    def export_csv(self): ...       # Data team
```

Sau:

```python
class User: ...                     # data class
class UserProfile:
    def get(self, user: User): ...  # UI team
class TaxCalculator:
    def for_user(self, user: User): ...  # Finance team
class UserExporter:
    def to_csv(self, user: User): ... # Data team
```

### Pattern 2: Facade pattern

Nếu khách hàng đang quen gọi `User.calculate_tax()` thì việc tách ra ngay sẽ phá API. Dùng Facade để giữ API trong khi tách internal:

```python
class User:
    def __init__(self):
        self._profile = UserProfile()
        self._tax = TaxCalculator()
        self._exporter = UserExporter()
    
    def calculate_tax(self):  # legacy API
        return self._tax.for_user(self)
```

Sau đó migrate dần các caller sang `TaxCalculator.for_user(user)` trực tiếp.

### Pattern 3: Strategy pattern (cho variation theo actor)

Khi business rule giống cho nhiều entity nhưng *cách* thực hiện khác theo region/customer-type:

```python
class TaxCalculator:
    def __init__(self, strategy: TaxStrategy):
        self._strategy = strategy

class VietnamTaxStrategy(TaxStrategy): ...
class UsaTaxStrategy(TaxStrategy): ...
```

CFO Vietnam và CFO USA là 2 actor, mỗi actor có strategy riêng. `TaxCalculator` không bị bloated.

## Khi nào SRP là over-engineering

SRP có giá. Trước khi tách class, hỏi 3 câu:

### Câu 1: Có thực sự 2+ actor không?

Nếu một class `Calculator` thuộc 100% domain tính toán, dùng bởi 1 team, không cần tách dù có 20 method.

### Câu 2: Lifespan dự án bao lâu?

Code prototype 1 tuần đi demo → không cần SRP. Code production 5 năm → bắt buộc.

### Câu 3: Có merge conflict không?

Nếu một file 6 tháng chưa có conflict, chưa cần tách dù về lý thuyết có 2 actor.

Nguyên tắc: **SRP fix khi pain xuất hiện**, không refactor "phòng ngừa".

## Sai lầm thường gặp

### Sai lầm 1: "Một method = một class"

Vi phạm phía ngược. Tách quá nhỏ thành "fragment class" làm code khó đọc:

```python
class UserNameGetter:
    def get(self, user): return user.name

class UserAgeCalculator:
    def calculate(self, user): return ...
```

Đó không phải SRP, đó là over-decomposition.

### Sai lầm 2: Coi "module" = "class"

SRP áp dụng cho mọi unit of code: function, class, module, package, service. Một function 200 dòng làm 5 việc cũng vi phạm SRP dù không phải class.

### Sai lầm 3: Coi "responsibility" = "task"

Một class có thể làm nhiều task (method) miễn là cùng cho một actor. `TaxCalculator` có thể có `calculate_income_tax()`, `calculate_vat()`, `calculate_corporate_tax()`, tất cả cho actor CFO/Finance, không vi phạm SRP.

### Sai lầm 4: Bỏ qua context

SRP đúng cho enterprise code không có nghĩa đúng cho startup MVP. Đừng máy móc.

## SRP ở mức Architecture

SRP scale lên thành nguyên lý kiến trúc:

- **Microservice = một service một bounded context (actor)**. Đây chính là SRP ở mức service.
- **Module trong monolith = một module một domain**. Cùng ý.
- **Database table = một table một entity**. Tách thành nhiều table khi có nhiều aspect độc lập (vd: tách `users` và `user_profiles` nếu chúng evolve khác nhau).

Cụm 6 (Microservices) sẽ build trực tiếp trên insight này.

## Tóm tắt

- SRP **không phải** "mỗi class một việc". Định nghĩa modern: "Mỗi module một actor".
- Identify actor bằng cách hỏi *ai yêu cầu sửa*, theo dõi merge conflict, hoặc map lên org chart.
- Fix violation bằng Extract Class, Facade, hoặc Strategy.
- Cẩn thận over-engineering: tách khi có pain, không tách phòng ngừa.
- Scale lên architecture: microservice = SRP ở mức service.

Bài tiếp: [OCP, Open-Closed Principle](04-ocp.md), về cách mở rộng code mà không sửa code cũ.
