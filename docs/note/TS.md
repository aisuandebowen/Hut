# TS

官方文档：`https://www.tsdev.cn/type-inference.html`

## 数据类型

any、number、string、boolean、数组、元组、enum、void、null、undefined、never

### 手动指定类型

`<type> value` or `value as type`

### 类型断言

1. as 关键字`var as string`
2. `<>var`
3. `!`非空断言操作符

## 接口

```typescript
interface inter {
  num?: number, // 可选
  readonly str: string, // 只读
  [propName: string]: any, // 额外属性
  (name: string):void, // 函数
  [index: number]: string, // 索引类型
}
```



## 变量声明

```
var [变量名] : [类型] = 值;
```

### 函数声明

```typescript
  type C = { a: string };
  function show({ a }: C) {
    console.log(a);
  }
```

## 函数

### 基本语法

```javascript
function fnName(ele:type, ele?:type):returnType {
  return ...
}
```

### 函数重载

重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。

```javascript
function fn(num:number):void;
function fn(str:string,num:number):void;
```

### 推断类型

```typescript
interface Show {
  (name: string): void;
}

const show: Show = (name) => {
  console.log(name);
};
```

### 参数

+ 默认参数

  `const fn2 = (val: string = "defalut value") => {};`

  默认参数，本质也转为了可选参数。

+ 可选参数

  `const fn1 = (val?: string) => {};`

+ 剩余参数

  `const ff = (...args: any[]) => {};`

## 泛型

### 简介

相当于一个类型变量，指定一个函数的未知类型。

```typescript
interface Kan<T> {
  (num: T): void;
}

function kankan<Y>(num: Y): void {
  console.log(num);
}

const kan: Kan<number> = kankan;

```

### 泛型约束

就是将泛型变量继承一个**接口**，实现约束。

```typescript
interface B {
  length: number;
}

function kankan<T extends B>(num: T): void {
  console.log(num.length);
}
```

## 枚举

```typescript
enum Resposne {
  Success,
  Failure = 'Failure'
}
```

枚举值：

+ 默认第一位为0，递增1。
+ 可给值常数枚举表达式。

## 元组

```javascript
const num = [1,'2',false,4]
```

可放任意类型的**数组**。

## 联合类型

类型即可是type1，也可是type2.

```javascript
const num:type1 | type2;
```

## 类

### 继承extends

子类只能继承一个类，但可以多重继承。

注意：

1. `super`关键字

   用于访问父类的属性、方法

   + 派生类包含了一个构造函数，它***必须*调用`super()`**，它会执行基类的构造函数。
   + 在构造函数里访问`this`的属性之前，*一定*要调用`super()`

### 抽象类

与接口类似，用于定义抽象方法和属性。但不同于接口。主要区别在于抽象类里可以有成员实现的细节。

```typescript
abstract class Person {
  abstract show(): void;
}

class XiaoMing extends Person {
  show() {
    console.log("1111111");
  }

  kan() {
    console.log(222222222);
  }
}

const xiao: Person = new XiaoMing();
xiao.show()
xiao.kan(); // error: 因为xiao定义了Person类型，里面只能有show方法

```



### readonly修饰符

 只读属性必须在声明时或构造函数里被初始化。

```typescript
  class Person {
    readonly code: string = "pidan";
  }

  class XiaoMing extends Person {
    name: string;
    constructor(name: string) {
      super();
      this.name = name;
    }

    show() {
      console.log(`${this.name} - ${this.code}`);
    }
  }

  const xiao = new XiaoMing("123");
  xiao.show();
```

### 静态static

### 类型判断instanceof

### 访问控制修饰符

TypeScript 中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。TypeScript 支持 3 种不同的访问权限。

- **public（默认）** : 公有，可以在任何地方被访问。
- **protected** : 受保护，可以被其**自身以及其子类**访问。
- **private** : 私有，只能被其定义所在的类访问。

### 多态

```javascript
interface Water {
  weight: number;
}

class Ice implements Water {
  weight: number;
  name: number;
  constructor(weight: number, name: number) {
    this.name = name;
    this.weight = weight;
  }
}

class Liquid implements Water {
  weight: number;
  age: number;

  constructor(weight: number, age: number) {
    this.weight = weight;
    this.age = age;
  }
}

function showWeight(water: Water) {
  console.log(water.weight);
}

const liquid = new Liquid(999, 111);
showWeight(liquid);

```

## 命名空间

在一个新的名字空间中可定义任何标识符，它们不会与任何已有的标识符发生冲突，因为已有的定义都处于其他名字空间中。

```typescript
namespace Boen {
  export class Water {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }

  export interface Ice {
    type: string;
  }
}

// 使用
Boen.Water ...
```
