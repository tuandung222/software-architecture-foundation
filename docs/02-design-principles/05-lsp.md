---
id: 05-lsp
title: 2.5 LSP, Liskov Substitution Principle
sidebar_position: 5
description: Subtype phải thay thế được supertype mà không phá behavior của client. Vì sao "Square is-a Rectangle" là sai trong code, ngay cả khi đúng trong toán học.
---

# 2.5 LSP, Liskov Substitution Principle

> **Tóm tắt một dòng**: Nếu code đang dùng kiểu `T`, bạn pass vào instance của subtype `S` (kế thừa `T`) thì code phải vẫn chạy đúng, nếu không, `S` không xứng là subtype của `T` dù compiler chấp nhận.

## Phát biểu gốc

Barbara Liskov (Turing Award 2008) phát biểu năm 1987:

> "If S is a subtype of T, then objects of type T may be replaced with objects of type S without altering any of the desirable properties of the program."

Diễn đạt programmer-friendly: nếu mọi chỗ code đang dùng `T`, bạn nhét vào subclass `S` thì *không có gì hỏng*. Client code không cần biết `T` thực sự là `S` hay `T` thuần.

LSP nghe tự nhiên, ai cũng nói "tất nhiên rồi". Nhưng thực tế programmer vi phạm LSP suốt mà không nhận ra.

## Ví dụ kinh điển: Square is-a Rectangle?

Toán học nói "hình vuông là một hình chữ nhật" (cả hai góc vuông, hình vuông chỉ là special case khi 4 cạnh bằng nhau). Khi code:

```python
class Rectangle:
    def __init__(self, width: float, height: float):
        self._width = width
        self._height = height
    
    def set_width(self, w: float): self._width = w
    def set_height(self, h: float): self._height = h
    def area(self) -> float: return self._width * self._height

class Square(Rectangle):  # OOP nói: Square IS-A Rectangle
    def __init__(self, side: float):
        super().__init__(side, side)
    
    def set_width(self, w: float):
        self._width = w
        self._height = w  # phải sync để vẫn là Square
    
    def set_height(self, h: float):
        self._width = h
        self._height = h
```

Trông hợp lý? Hãy xem client code dùng Rectangle:

```python
def expand_to_4x_area(rect: Rectangle):
    """Phóng to rectangle lên 4 lần diện tích bằng cách x2 width."""
    rect.set_width(rect._width * 2)
    rect.set_height(rect._height * 2)
    # Kỳ vọng: area mới = 4 * area cũ

r = Rectangle(3, 5)  # area = 15
expand_to_4x_area(r)
assert r.area() == 60  # OK: 6 * 10 = 60

s = Square(4)  # area = 16
expand_to_4x_area(s)
assert s.area() == 64  # FAIL! Thực tế là 256
```

`Square` vi phạm LSP. Tại sao? Vì client `expand_to_4x_area` *kỳ vọng behavior* của Rectangle: width và height độc lập. `Square` phá behavior đó bằng cách sync chúng.

Compiler chấp nhận `Square is-a Rectangle` về mặt syntax (cùng API), nhưng *contract behavioral* bị phá. Đây là LSP violation.

### Cách sửa

Square không phải subtype của Rectangle về behavioral. Sửa bằng cách:

**Option A**: Bỏ inheritance, tách 2 type độc lập:

```python
class Rectangle: ...
class Square: ...
# Nếu cần dùng chung: tạo interface Shape
```

**Option B**: Tách abstraction immutable (không có setter):

```python
@dataclass(frozen=True)
class Rectangle:
    width: float
    height: float
    def area(self) -> float: return self.width * self.height

@dataclass(frozen=True)
class Square(Rectangle):
    def __init__(self, side: float):
        super().__init__(side, side)
```

Vì không có setter, LSP không bị phá. `Square` thực sự "is-a" Rectangle ở mức immutable.

## Contract của abstraction: ba thành phần

Để check LSP rigorous, hãy xét *contract* của method. Contract gồm 3 phần (Bertrand Meyer, Design by Contract):

### 1. Preconditions

Điều kiện caller phải đảm bảo trước khi gọi. Ví dụ: `sqrt(x)` yêu cầu `x >= 0`.

**LSP rule**: Subtype không được *yêu cầu mạnh hơn* (strengthen preconditions). Nếu Rectangle.set_width chấp nhận mọi float dương, Square.set_width không được yêu cầu thêm điều kiện (vd: `w > 10`).

### 2. Postconditions

Điều kiện callee đảm bảo sau khi gọi xong. Ví dụ: `sort(arr)` đảm bảo mảng sorted.

**LSP rule**: Subtype không được *yếu hơn* (weaken postconditions). Nếu Rectangle.area đảm bảo `result = width * height`, Square.area không được trả về số khác.

### 3. Invariants

Điều kiện luôn đúng về object. Ví dụ: `BankAccount.balance >= 0`.

**LSP rule**: Subtype phải *giữ nguyên hoặc strengthen* invariants. Không được nới lỏng (vd: cho phép balance âm cho `OverdraftAccount` mà không tăng cường biến khác).

### Liskov's rule chính thức

> Subtype S of T phải:
> - Accept input ít nhất rộng bằng T (precondition không strengthen).
> - Produce output ít nhất chặt bằng T (postcondition không weaken).
> - Maintain invariants của T.

Nhớ ngắn: **contravariant inputs, covariant outputs, preserve invariants**.

## Ví dụ trong thực tế

### Vi phạm 1: Square / Rectangle (đã xem)

### Vi phạm 2: Penguin / Bird

```python
class Bird:
    def fly(self) -> Position: ...

class Penguin(Bird):
    def fly(self) -> Position:
        raise NotImplementedError("Penguins don't fly!")
```

Client gọi `bird.fly()` không expect exception. `Penguin` strengthen precondition (caller phải check is_penguin trước) → LSP violation.

Fix: tách hierarchy:

```python
class Bird: ...
class FlyingBird(Bird):
    def fly(self) -> Position: ...
class Penguin(Bird): ...  # không kế thừa FlyingBird
```

### Vi phạm 3: Read-only override

```python
class List:
    def add(self, item): self._items.append(item)

class ImmutableList(List):
    def add(self, item):
        raise RuntimeError("immutable")
```

Client xài `List` gọi `add()` không expect exception. ImmutableList strengthen precondition.

Fix:

```python
class ReadOnlyList:  # base type không có add
    def get(self, i): ...

class List(ReadOnlyList):
    def add(self, item): ...
```

Client cần modify → require `List`. Client chỉ đọc → require `ReadOnlyList`. Mỗi loại bị check ở compile time.

### Vi phạm 4: ORM "lazy" overriding

```python
class User:
    def get_orders(self) -> list[Order]:
        return self._orders  # đã load sẵn

class LazyUser(User):
    def get_orders(self) -> list[Order]:
        return self._db.query(...)  # query mỗi lần gọi → slow
```

Client gọi `user.get_orders()` trong loop expect cheap operation. LazyUser weaken postcondition về performance → vi phạm LSP (về non-functional contract).

Fix: tài liệu hoá rõ "may trigger DB query" trong base class, hoặc tách method `load_orders()` vs `cached_orders()`.

## Code smell báo hiệu LSP violation

### Smell 1: `if isinstance(x, SubType)` trong client code

```python
def process(item: Item):
    if isinstance(item, SpecialItem):
        # logic khác
    else:
        # logic chung
```

Client phải biết subtype → LSP violation đang giấu. Solution: dùng polymorphism (`item.process()`).

### Smell 2: Override để throw NotImplementedError

Đã thấy ở `Penguin.fly()`.

### Smell 3: Override để do-nothing

```python
class Base:
    def cleanup(self): self._free_resources()

class Subclass(Base):
    def cleanup(self): pass  # do nothing
```

Base contract: "after cleanup, resources freed". Subclass weaken → LSP violation.

### Smell 4: Tham số override với kiểu hẹp hơn

```python
class Animal:
    def feed(self, food: Food): ...

class Cat(Animal):
    def feed(self, food: CatFood): ...  # CatFood ⊂ Food
```

Cat.feed strengthen precondition. Client xài `animal.feed(generic_food)` sẽ vỡ với Cat.

## LSP ở mức Architecture

LSP scale lên thành nguyên tắc API design:

### REST API versioning

Khi release `/v2/users`, phải đảm bảo `/v1/users` vẫn behave như cũ. Phá v1 = vi phạm LSP ở API level. Đây là lý do API versioning quan trọng.

### Database migration backward compatibility

Đổi schema không được phá ứng dụng đang chạy (rolling deploy). Add column OK, drop column thì phá LSP với client cũ.

### Service interface stability

Microservice A consume API của B. B release version mới phải compatible với A trong period transition. Pattern: expand-and-contract migrations.

### Plug-in interface

VS Code core định nghĩa plug-in API. Update core phá API → mọi plug-in vỡ. Đảm bảo LSP cho plug-in = đảm bảo backward compatibility của API.

## Sai lầm thường gặp

### Sai lầm 1: Tin compiler đã check LSP

Compiler check signature (type, arity), không check behavioral contract. Code có thể "type-correct" nhưng vi phạm LSP.

### Sai lầm 2: Coi LSP chỉ là về inheritance

LSP cũng áp dụng cho duck typing (Python, JS), interface implementation, và bất kỳ kiểu polymorphism nào. Bất cứ khi nào client expect behavior nào đó → ai cung cấp behavior đó phải tuân thủ.

### Sai lầm 3: Cố ép is-a relationship khi nó không có

Nhiều khi 2 concept *có vẻ* liên quan nhưng không phải is-a. Square và Rectangle là ví dụ. Trước khi extend, hỏi: "subclass có thực sự *substitutable* không?". Nếu chỉ "có vẻ giống" → dùng composition thay vì inheritance.

### Sai lầm 4: Bỏ qua non-functional contract

LSP không chỉ về functional behavior. Performance, memory, network calls cũng là contract. `LazyUser.get_orders()` example.

## Tóm tắt

- LSP: **subtype phải substitutable** cho supertype mà không phá client.
- Check qua **contract**: preconditions, postconditions, invariants.
- Rule: contravariant input, covariant output, preserve invariants.
- Smell: `isinstance` check, NotImplementedError override, do-nothing override.
- Scale lên architecture: API versioning, schema migration, plug-in stability.
- Cẩn thận: LSP không check được bởi compiler; cần design review + behavioral test.

Bài tiếp: [ISP, Interface Segregation Principle](06-isp.md), về cách thiết kế interface nhỏ và focused.
