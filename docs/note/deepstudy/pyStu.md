# Python

```python
## 导入模块
import numpy as np
import pandas as pd
from scipy import optimize
import matplotlib.pyplot as plt
```

## 一、 数据类型

### 1.1 列表

#### 1.1.1 基础

```python
list = ['1',2,3,4]
list[0] = 111
del list[1]
print(list[0:1])  ## 左闭右开
print(list[1:])
list[2:] = ['你','好']
print(list)
list[2:2] = [999] ## 插入
print(list)
```

    [111]
    [3, 4]
    [111, 3, '你', '好']
    [111, 3, 999, '你', '好']

#### 1.1.2 常用方法

##### 添加 append

```python
list = [1,2,3,4,5]
box = 111
list.append(box)
print(list)
```

    [1, 2, 3, 4, 5, 111]

##### 清空 clear

```python
list = [1,2,3,4,5]
list.clear()
print(list)
```

    []

##### 计数 count（某元素出现次数）

```python
list = [1,2,3,4,5,5,5,5,5]
num = list.count(5)
print(num)
```

    5

##### 扩展 extend

```python
list1 = ['你好']
list2 = ['Python']
list1.extend(list2)
print(list1)
```

    ['你好', 'Python']

##### 查找 index

```python
list = ['Python', 'Token', 'Java']
index = list.index('Token')
print(index)
```

    1

##### 插入 insert

```python
list = [1,2,3,4,6]
list.insert(4,555)
print(list)
```

    [1, 2, 3, 4, 555, 6]

##### 弹出 pop

```python
list = [1,2,3,4,999]
list.pop()

print(list)
```

    [1, 2, 3, 4]

##### 删除第一个“指定值”元素 remove

```python
list = ['Python','Java','Javascript']
list.remove('Python')

print(list)
```

    ['Java', 'Javascript']

##### 翻转 reverse

```python
list = [1,2,3,4,5,6]
list.reverse()

print(list)
```

    [6, 5, 4, 3, 2, 1]

##### 排序 sort

```python
num = [1,9, 11, 3, 10]
## num.sort(key= lambda x: x*(-1))
num.sort(reverse=False)
print(num)
```

    [1, 3, 9, 10, 11]

### 1.2 元组

tuple 一旦初始化就不能修改

注意：若元组只有一个元素，只能(ele,)这么写

```python
tuple1 = (1,2,3,4)

print(tuple1)
```

    (1, 2, 3, 4)

### 1.3 字符串

#### 1.3.1 基础

```python
str = '123123'
```

#### 1.3.2 常用方法

##### 切片

```python
str = '123456'
print(str[0:3])
```

    123

##### 格式化 format

```python
str = "广元有{0},{2},{1}"
list = ["蒸凉面","剑门关","武则天"]
res = str.format(*list)
print(res)
```

    广元有蒸凉面,武则天,剑门关

```python
str = "广元有{food},{scenery},{people}"
dict = {"food":"蒸凉面","scenery":"剑门关","people":"武则天"}
res = str.format(**dict)
print(res)
```

    广元有蒸凉面,剑门关,武则天

```python
PI = 3.1415926
str = "{:.4f}".format(PI)

print(str)
```

    3.1416

##### 查找特定值 find

find(self, sub, start=None, end=None)

```python
str = '一庭春雨，满架秋风'

res1 = str.find("春雨",1,5)
res2 = str.find("夏雨")

print(res1,res2)
```

    2 -1

##### join

```python
jobs = ['lawer','teacher',"player"]
str = ' and '.join(jobs)

print(str)
```

    lawer and teacher and player

##### 转大小写 lower upper

```python
str = 'Such a beautiful girl'
res1 = str.lower()
res2 = str.upper()

print(res1,'\n',res2)
```

    such a beautiful girl
     SUCH A BEAUTIFUL GIRL

##### 替换 replace

replace(self, old, new, count=None) return newStr

注意：

- 原字符串不变，返回替换后的字符串
- 方法 replace 用于将字符串中的某子串进行替换，默认替换指定的所有子串。old 为旧的字符串，new 为新的字符串，count 为替换的次数。

```python
word = '博文'
newWord = 'Adam'
str = '博文天天睡觉不洗澡，博文他妈天天日决他，博文他妈天天劝博文他爸'
newStr = str.replace(word,newWord)

print(newStr)
```

    Adam天天睡觉不洗澡，Adam他妈天天日决他，Adam他妈天天劝Adam他爸

##### 分割 split

split(self, sep=None, maxsplit=-1)
maxsplit 为最多分隔的次数，-1 表示全部分隔。

```python
str = '天津、上海、广州、广元'
citys = str.split('、')

print(citys)
```

    ['天津', '上海', '广州', '广元']

##### 移除开头结尾指定字符 strip

```python
str = "       a        "
newStr = str.strip(" ")

print(newStr)
```

    a

##### 字符替换 translate

translate(self, table)

方法 translate 根据由 maketrans 函数生成的对照表 table 完成字符替换，table 是对照表，是由 maketrans 函数生成。

注意：

- 要求对照表字符 len 一样（扯淡！！！）

```python
table = str.maketrans("博文","阿文")
str = '博文天天睡觉不洗澡，博文他妈天天日决他，博文他妈天天劝博文他爸'
res = str.translate(table)

print(res)
```

    阿文天天睡觉不洗澡，阿文他妈天天日决他，阿文他妈天天劝阿文他爸

### 1.4 字典

#### 1.4.1 基础

```python
dic = {'name': 'Adam', 'age': '15'}
```

#### 1.4.2 常用方法

##### 清空 clear

```python
dic = {'name': 'Adam', 'age': '15'}
dic.clear()

print(dic)
```

    {}

##### 浅拷贝 copy

```python
dic = {'name': 'Adam', 'age': '15', 'obj':{'num':99}}
dic2 = dic.copy()
dic['obj']['num'] = 88

print(dic2)
```

    {'name': 'Adam', 'age': '15', 'obj': {'num': 88}}

##### 创建新字典 fromkeys

依据给定的键序列和可选的默认值来创建字典

```python
items = ['Adam','Douaa']
defaultAge = 18

dic = dict.fromkeys(items,defaultAge)
print(dic)
```

    {'Adam': 18, 'Douaa': 18}

##### 获取值 get

```python
dic = {'name': 'Adam', 'age': '15', 'obj':{'num':99}}
value = dic.get('name')

print(value)
```

    Adam

##### 返回字典中键值对的视图 items

视图以可迭代的形式呈现，其中每个元素是一个包含键和对应值的元组。

```python
dic = {'name': 'Adam', 'age': '15', 'obj':{'num':99}}
list = dic.items()

for key,value in list:
    print(f"key:{key}, value:{value}")
```

    key:name, value:Adam
    key:age, value:15
    key:obj, value:{'num': 99}

##### 返回所有键 keys

```python
dic = {'name': 'Adam', 'age': '15', 'obj':{'num':99}}
keys = dic.keys()

for key in keys:
    print(f"key:{key}, value:{dic[key]}")
```

    key:name, value:Adam
    key:age, value:15
    key:obj, value:{'num': 99}

##### 返回所有值 values

```python
dic = {'name': 'Adam', 'age': '15', 'obj':{'num':99}}
values = dic.values()

print(values)
```

    dict_values(['Adam', '15', {'num': 99}])

##### 删除指定键值对 pop(self, key, default=None)

```python
dic = {'name': 'Adam', 'age': '15', 'obj':{'num':99}}
dic.pop('name')

print(dic)
```

    {'age': '15', 'obj': {'num': 99}}

##### 查询值 setdefault(self, key, default=None)

查询值，不在扔进去

```python
dic = {'name': 'Adam', 'age': '15', 'obj':{'num':99}}
value = dic.setdefault('girl','Douaa')

print(value,dic)
```

    Douaa {'name': 'Adam', 'age': '15', 'obj': {'num': 99}, 'girl': 'Douaa'}

##### 浅更新 update

同名 key，直接覆盖。原 dict 不存在的 key，直接扔进去

```python
dic = {'name': 'Adam', 'age': '15', 'obj':{'num':99,'num2':11}}
dic2 = {'name':'Douaa','age':'18','birth':'3-10','obj':{'num':11}}
dic.update(dic2)

print(dic)
```

    {'name': 'Douaa', 'age': '18', 'obj': {'num': 11}, 'birth': '3-10'}

## 二、三大语句

### 2.1 顺序语句

#### 2.1.1 链式赋值(雷！狗都不用)

```python
a = b = c= 1
print(a,b,c)

a = b = c = {'age':99}
b['age'] = 11

print(a,b,c)
```

    1 1 1
    {'age': 11} {'age': 11} {'age': 11}

#### 2.1.2 try catch

```python
try:
    1/1
except:
    print('there are something wrong!!!')
else:
    print('God job')
finally:
    print('END')
```

    God job
    END

### 2.2 条件语句

```python
flag = 1991

if flag < 100 and True:
    print('Hello Douaa')
elif flag < 200 and 1==1:
    print('Hello Adam')
else:
    print('hello China')
```

    hello China

### 2.3 循环语句

#### 跳出循环 break、continue

#### while 循环

```python
num = 0

while num < 3:
    num +=1
    print(num)
else:
    print('end')
```

    1
    2
    3
    end

#### for 循环

```python
nums = range(1,10)
for num in nums:
    print(num)
else:
    print('End')
```

    1
    2
    3
    4
    5
    6
    7
    8
    9
    End

## 三、函数、类和对象

### 3.1 函数

#### 3.1.1 定义

```python
def add(num1,num2):
    return num1+num2

res = add(1,2)
print(res)
```

    3

#### 3.1.2 参数

顺序必须是：必选参数、默认参数、可变参数、命名关键字参数和关键字参数。

- 默认参数

```python
## 默认参数
def fn(x,y=1):
    return x*y
```

- 可变参数

```python
def calc(*nums):
    print(nums)
    sum = 0
    for num in nums:
        sum += num
    return sum

sum = calc(1,2,3,4,5)

print(sum)
```

    (1, 2, 3, 4, 5)
    15

- 关键字参数

```python
def getName(**obj):
    if 'name' in obj:
        return obj['name']
    else:
        return 'None'

obj = {'name':'Adam'}
myName = getName(**obj)
print(myName)
```

    Adam

#### 3.1.3 注意事项

1. 在函数内部的任何位置定义的变量，_在函数体的其他部分都可以被访问和使用_，只要该变量在使用之前已经被定义。

```python
import math
def getFlag(num):
    if num > 10:
        flag = 1
    else:
        flag = 0
    flag = bool(flag)
    return flag

res = getFlag(1)
print(res)
```

    False

#### 3.1.4 空函数

```python
def fn():
    pass
```

### 3.2 高阶函数

#### 3.2.1 filter

```python
## filter
def fn(num):
    return num > 10

res = filter(fn, [1, 5, 100, 23, 5, 15])

for value in res:
    print(value)

print(list(res))
```

    100
    23
    15



    ---------------------------------------------------------------------------

    TypeError                                 Traceback (most recent call last)

    Cell In[48], line 10
          7 for value in res:
          8     print(value)
    ---> 10 print(list(res))


    TypeError: 'dict_items' object is not callable

#### 3.2.2 map

```python
myData = map(lambda x: x * x, [1, 2, 3, 4, 5])
print(list(myData))
```

#### 3.2.3 reduce

reduce(f, [x1, x2, x3, x4]) = f(f(f(x1, x2), x3), x4)

```python
from functools import reduce
def fn(x, y):
    return x + y + 10

res = reduce(fn, [1, 2, 3, 4, 5, 6])
print(res)
```

#### 3.2.4 返回函数

```python
def getSum(*args):

    def calc():
        sum = 0
        for num in args:
            sum += num
        return sum

    return calc


sum = getSum(1, 2, 3, 4, 5)
print(sum())
```

#### 3.2.5 lambda 函数

```python
data = [1,2,3,4,5]
newData = map(lambda x:x*x, data)
print(list(newData))
```

### 3.3 类

#### 3.3.1 定义

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def getName(self):
        return self.name


XM = Person('Adam',18)
name = XM.getName()
print(name)
```

#### 3.3.2 继承

##### 单继承

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def getName(self):
        return self.name

    def setName(self, name):
        self.name = name

class Stu(Person):

    def __init__(self, name, age, ID):
        ## Person.__init__(self, name, age)
        super().__init__(name, age)
        self.ID = ID

    def getInfo(self):
        print(f'name:{self.name}, age:{self.age}, ID:{self.ID}')

stu = Stu('Adam',18,'510802')
stu.getInfo()
```

##### 多重继承

（1）基础版

```python
class Person:
    def __init__(self, name):
        self.name = name

    def getName(self):
        return self.name

    def setName(self, name):
        self.name = name

class Animal:
    def __init__(self, age):
        self.age = age

    def getAge(self):
        return self.age

class Stu(Person, Animal):

    def __init__(self,name,age,ID):
        Person.__init__(self, name)
        Animal.__init__(self, age)
        self.ID = ID

    def getInfo(self):
        print(f'name:{self.name}, age:{self.age}, ID:{self.ID}')

stu = Stu('Adam',18,'510802')
stu.getInfo()
```

（2）super 版

```python
class Person:
    def __init__(self, name, **kwargs):
        self.name = name
        super().__init__(**kwargs)

    def getName(self):
        return self.name

    def setName(self, name):
        self.name = name

class Animal:
    def __init__(self, age, **kwargs):
        self.age = age
        super().__init__(**kwargs)

    def getAge(self):
        return self.age

class Stu(Person, Animal):

    def __init__(self,name,age,ID,**kwargs):
        ## Person.__init__(self, name)
        ## Animal.__init__(self, age)
        super().__init__(name=name,age=age,**kwargs)
        self.ID = ID

    def getInfo(self):
        print(f'name:{self.name}, age:{self.age}, ID:{self.ID}')

    ## 重写
    def getName(self):
        print(f'Stu\'s name:{self.name}')

stu = Stu('Adam',18,'510802')
stu.getInfo()
stu.getName()
## print(stu.mro())
```

##### 多级继承

```python
class Person:
    def __init__(self,age,**kwargs):
        super().__init__(**kwargs)
        self.age = age

class Man(Person):
    def __init__(self,name,**kwargs):
        super().__init__(**kwargs)
        self.name = name

    def getName(self):
        return self.name


class Stu(Man):
    def __init__(self,ID,**kwargs):
        super().__init__(**kwargs)
        self.ID = ID

    def getInfo(self):
        name = super().getName()
        print(f'name:{name}, age:{self.age}, ID:{self.ID}')

info = {'ID':"510802", "name":'Adam', "age":18}
XM = Stu(**info)
XM.getInfo()
```

##### 多态

调用方只管调用，不管细节

```python
def run(water):
    water.show()

class Water:
    def show(self):
        pass

class Ice(Water):
    def show(self):
        print('Im ice')

class Steam(Water):
    def show(self):
        print('Im water')

run(Ice())
run(Water())
```

#### 3.3.3 类、静态方法

```python
class Person:

    @classmethod
    def getClassName(cls):
        print('Person')

    @staticmethod
    def getInfo():
        print('Class Person')

Person.getInfo()
```

区别：

- 类方法需要自身类 clc

## 四、文件的读写

### 4.1 python 内置方法

#### 4.1.1 读

步骤：

1. open
2. read、readline、readlines
3. close

```python
try:
    file = open('./chapter4/test.txt','r')
    ## lines = file.readlines()
    ## line = file.readline()
    content = file.read()
    print(content)
finally:
    if file:
        file.close()
```

#### 4.1.2 写

写文件时，操作系统往往不会立刻把数据写入磁盘，而是放到内存缓存起来，空闲的时候再慢慢写入。

```python
path = './chapter4/test.txt'
content = 'Nihao'
try:
    f = open(path,'a')
    f.write(content)
finally:
    f.close()
```

#### 4.1.3 open 方法

模式

- w
- r
- a 追加

### 4.2 Numpy

#### 4.2.1 读写 csv、txt 文件

loadtxt，注意分隔符、编码等问题

```python
import numpy as np
path = './chapter4/test.csv'
csv = np.loadtxt(path, delimiter=',')
print(csv)
```

```python
import numpy as np
data = np.ones((3,3))
np.savetxt(fname='./chapter4/write.csv',X=data,delimiter=',',encoding='utf-8')
```

#### 4.2.2 读写二进制文件

save

```python
import numpy as np
arr = np.arange(10).reshape(2,5,1)
np.save('./chapter4/arr.npy', arr)
res = np.load('./chapter4/arr.npy')
print(res)
```

#### 4.2.3 读写`.dat`多维数据文件

```python
import numpy as np

fileName = './chapter4/data.dat'
data = np.arange(30).reshape(5,2,3)
data.tofile(fileName,sep=',',format='%d')

newData = np.fromfile(fileName, dtype=np.int64, sep=',')
print(newData)
```

### 4.3 Pandas

处理 csv 文件

```python
import pandas as pd
df = pd.read_csv('./chapter4/test.csv', header=None, delimiter=',')
df.to_csv('./chapter4/pandas_test.csv')
df.head()
```

处理 xlxs 文件

```python
import pandas as pd
excel = pd.read_excel('./chapter4/table.xlsx', sheet_name='Sheet1', header=0)
excel.to_excel('./chapter4/pandas_table.xlsx',sheet_name='Sheet1')
excel.head()
```

## 五、Numpy

### 5.1 生成数组

#### ones

全是 1 的矩阵

```python
import numpy as np

matrix1 = np.ones([4,4])
matrix1
```

#### zeros_like(matrix)

以 matirx 为规格生成全是元素 0 的矩阵

```python
import numpy as np

matrix1 = np.ones([4,4])
matrix2 = np.zeros_like(matrix1)
matrix2
```

#### np.array(arr)

复制，生成新数组

```python
import numpy as np

arr = [[1,2],[3,4]]
arr1 = np.array(arr)
arr1
```

#### np.asarray(arr)

非必要不复制 numpy 数组，直接返回原 np 数组。

```python
import numpy as np

arr = np.array([[1,2],[3,4]])
arr2 = np.asarray(arr)
arr[1][1] = 99
print(arr)
print(arr2)
print(arr2 is arr)
```

#### np.random.normal

生成服从正太分布的随机数数组

```python
import numpy as np

arr = np.random.normal(2,1,20) ## 均值2、标准差1、20个
arr
```

#### np.arange(start, stop, step)

生成固定范围的数组[start, stop)

```python
arr = np.arange(10)
arr
```

#### np.random.rand()

生成服从(0, 1]均匀分布的随机数

```python
import numpy as np
arr = np.random.rand(5)

arr
```

#### np.random.randn()

randn(m)从标准正态分布中返回 m 个值

#### np.linspace(start, stop, num)

生成指定数量的等间距数值

### 5.2 索引与切片

list 和 ndarray 索引不同，list 只可以[0][1]而 ndarray 可以[0,1]

```python
## 导入模块
import numpy as np
arr = [[[1,2,3],[4,5,6]],[[7,8,9],[10,11,12]]]
arr2 = np.array(arr)
print(arr2)
print(arr2[0,:])
print(arr2[0][:])

print(arr[0][:])
```

### 5.3 形状修改

#### 转置

```python
import numpy as np
arr = np.array([[1,2],[3,4]])
arr.T
```

#### 扁平化

- reshape([row,col])
  原数组不变，返回新数组
- resize
  直接改变原数组，方法同 reshape

```python
import numpy as np
arr = np.array([[1,2],[3,4]])

new_arr = arr.reshape([1,4])
new_arr
```

```python
import numpy as np
arr = np.array([[1,2],[3,4]])
arr.resize([1,4])
print(arr)
```

#### 复制

- repeat(arr,reps,axis)
  1. reps: ele 重复的次数
  2. 默认 axis 扁平化，0、1 表示 copy 的方向 x 轴、y 轴
- tile(arr,reps)
  主要是复制整个块，而不是元素

```python
arr = np.array([[1,2],[3,4]])
flat_arr = np.repeat(arr,2,1)
print(flat_arr)

flat_arr2 = np.tile(arr,2)
print(flat_arr2)

flat_arr3 = np.tile(arr,(3,2)) ## 行3次，列2次
print(flat_arr3)
```

#### 拼接

np.concatenate((a, b), axis)

注意：

- np.concatenate((a, b), 0) 与 np.vstack((a, b))一样
- np.concatenate((a, b), 1) 与 np.hstack((a, b))一样

```python
arr1 = [[1,2],[3,4]]
arr2 = [[2,1],[4,3]]

res = np.concatenate((arr1,arr2),0) ## 纵向copy
res2 = np.concatenate((arr1,arr2),1) ## 横向copy
print(res)
print(res2)
```

### 5.4 修改类型

- astype

```python
arr = np.array([[1,2],[3,4]])

str_arr = arr.astype(np.str_)
print(str_arr)
```

### 5.5 通用函数

#### 去重 unique(arr,axis)

```python
arr = np.array([[[1,2],[3,4]],[[1,2],[3,4]]])
unique_arr = np.unique(arr,axis=0)

print(unique_arr)
```

#### 交集与并集

```python
arr = [[0,1,2],[3,4,5]]
arr2 = [[3,4,5],[0,6,7]]

## 交集
intersectionArr = np.intersect1d(arr,arr2)
## 并集
unionArr = np.union1d(arr,arr2)

print(f'交集：{intersectionArr}，并集：{unionArr}')
```

#### 绝对值 abs

#### 平方根 sqrt

```python
arr = [1,2,3,4,5]
res = np.sqrt(arr)

res
```

#### 平方 square

#### 判断元素是否为空值

```python
arr = [1,2, np.nan,4]
res = np.isnan(arr)

res
```

#### 筛选 where

where 函数一般有两种使用方式：

- 单参数用法（np.where(condition)）:当只传入一个条件数组时，where 函数会返回满足该条件的元素的索引。
- 三参数用法（np.where(condition, x, y)）:当传入一个条件数组和两个数组（或标量）时，where 函数会根据条件数组中的元素是 True 还是 False，分别从第一个或第二个数组（或标量）中选取元素。

```python
arr = np.arange(10)
res = np.where(arr >= 5, 1, 0)

res
```

```python
arr = np.array([1,2,3,4,5,6])
res = np.where(arr > 3)

res
```

#### 三角函数

- sin
- cos
- tan

### 5.6 线性代数

#### 对角阵 diag

创建对角矩阵和提取二维数组的对角线元素。

```python
arr = [1,2,3]
res = np.diag(arr)

arr2 = [[1,5,7],[3,6,9],[4,6,8]]
res2 = np.diag(arr2)

print(res)
print(res2)
```

#### 求迹 trace

```python
arr = [[1,5,7],[3,6,9],[4,6,8]]
trace = np.trace(arr)

trace
```

#### 矩阵乘积 dot

```python
a=[[1,2],[3,4]]
b=[[2,3],[4,5]]
res = np.dot(a,b)
print(res)
```

#### 行列式 det

#### 特征值、特征向量 linalg.eig

```python
arr = [[2,1],[1,2]]
eig = np.linalg.eig(arr)

print(f'特征值：{eig[0]},特征向量{eig[1]}')
```

#### 矩阵的逆 linalg.inv

#### 求解线性方程组 linalg.solve

求解线性方程组 Ax=b 的解

```python
A = np.array([[3,1],[1,2]])
b = np.array([9,8])
svd = np.linalg.solve(A,b)
print('解：',svd)

## 验证
print(np.dot(A,svd))
```

#### 矩阵的奇异值分解

np.linalg.svd(a, full_matrices = 1, compute_uv = 1)可以用于矩阵的奇异值分解，返回该矩阵的左奇异值（u）、奇异值（s）、右奇异值（v）

### 5.7 统计分析

#### 沿指定轴的和 sum

np.sum(a, axis)

```python
arr = [[1,2],[3,4]]
res = np.sum(arr, 0)

print(res)
```

#### 沿指定轴平均值 mean

np.mean(a,axis)

#### 指定轴最大、最小值

- np.min(axis)
- np.max(axis)

#### 标准差 std(arr,axis)

#### 方差 var(arr,axis)

#### 沿指定轴最大、小值索引

- argmin(arr, axis)
- argmax(arr, axis)

```python
arr = np.array([[1,2],[3,5]])
res = np.argmax(arr, 0)

res
```

## 六、Pandas

```python
import pandas as pd
import numpy as np
```

### 6.1 Series

Series 是 Pandas 的核心数据结构之一，是一维数据结构。包含两个部分：index、values，基础结构都是 ndarray。

#### 6.1.1 创建

```python
dict = {'a':10, 'b':2, 'c':3}
data = pd.Series(dict)

data2 = pd.Series([1,2,3], index=['A','B','C'])
data2
```

#### 6.1.2 访问

可下标、也可通过 key

```python
dict = {'a':10, 'b':2, 'c':3}
data = pd.Series(dict)

print(data['a'], data[1])
```

#### 6.1.3 修改索引 index

```python
dict = {'a':10, 'b':2, 'c':3}
data = pd.Series(dict)
data.index = ['O','P','Q']

data
```

#### 6.1.4 拼接 concat

```python
data1 = pd.Series({'A':1,'BB':2})
data2 = pd.Series(['O','PP','QQ'],index=['R','S','T'])

data = pd.concat([data1,data2])
data
```

### 6.2 DataFrame

类似 Excel 表格的二维数据结构

#### 6.2.1 创建

```python
import numpy as np
import pandas as pd
matrix = np.random.rand(3,3)
df = pd.DataFrame(matrix,index=list('ABC'),columns=list('XYZ'))

display(df)

df1 = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})
display(df1)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>X</th>
      <th>Y</th>
      <th>Z</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>A</th>
      <td>0.883420</td>
      <td>0.997401</td>
      <td>0.645058</td>
    </tr>
    <tr>
      <th>B</th>
      <td>0.716311</td>
      <td>0.877419</td>
      <td>0.165533</td>
    </tr>
    <tr>
      <th>C</th>
      <td>0.842964</td>
      <td>0.010090</td>
      <td>0.063684</td>
    </tr>
  </tbody>
</table>
</div>

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }

</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>A</th>
      <th>B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>3</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
</div>

#### 6.2.2 列操作

##### 基础

1. df[index] = [,,,]
2. df.index
3. 按序号：df.iloc[:,:]
4. 按索引：df.loc[:, :]

```python
print(df[['X','Y']])

print(df.iloc[:,1:2]) ## 左闭右开
```

```python
df['SSS'] = [1,1,1]
df
```

##### 删除 del

```python
del df['SSS']

df
```

#### 6.2.3 行操作

##### 基础

1. iloc[][]
2. loc[][]

```python
x = df.iloc[0]
x
```

##### 创建

```python
se = pd.Series([1,2,3],index=list('XYZ'),name='t')
newDf = pd.concat([df, se.to_frame().T])

print(newDf)
```

##### 删除

```python
newDf.drop(['A'],axis=0)
```

#### 6.2.4 数据查询

```python
arr = np.array([[1,2,3],[4,5,6],[7,8,9]])
df = pd.DataFrame(arr, index=list('123'),columns=list('ABC'))

display(df)
```

##### 按区间范围

```python
df.loc['1':'2','A']
```

##### 按条件表达

```python
df.loc[df['C']>=6,:]
```

##### 按值查询

```python
df.loc['1','C']
```

##### 按列表

```python
df.loc[['1','2'],['C','B']]
```

##### 按自定义函数查找

```python
df.loc[lambda df: df['C'] > 5, :]
```

#### 6.2.5 数据统计

```python
df = pd.DataFrame(np.random.rand(3,3),columns=list('ABC'),index=[1,2,3])
df
```

##### 排序

注意，此时 index 需要是 int 类型

```python
df2 = df.sort_index(ascending=False) ## ascending=True 升序
df2
```

##### 统计指标

```python
file = pd.read_csv('./pandas/test1.CSV')
display(file)

file.describe()

## print(file['size'].mean())
```

##### 分类汇总

GroupBy 可以计算目标类别的统计特征，例如按“place_of_production”、“level”将物品分类，并计算所有数字列的统计特征

```python
file2 = pd.read_csv('./pandas/test2.CSV')

display(file2)
file2.groupby(['place_of_production','level']).describe()
```

按 place_of_production、level 排序，分析 number 的均值、和

```python
file2.groupby(['place_of_production','level'])['number'].agg([np.mean, np.sum])
```

```python
df3 = file2.groupby('place_of_production')

display(df3.describe())

for name, group in df3:
    print(name)
    print(group)
    print('=============')
```

#### 6.2.6 常用方法

##### df.dropna(inplace=True)

删除含有缺失值（NaN）的行或列

- inplace

  If False, return a copy. Otherwise, do operation in place and return None.

##### 行数、列数

- df.shape[0]
- df.shape[1]

## 八、可视化 Matplotlib

### 8.1 绘图步骤

1. 创建画板
2. 绘制图表
3. 配置图例

#### 8.1.1 创建画板

##### 单图 plt.plot

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.random.randn(10)
## 初始化一张画布.dpi分辨率,figsize画布大小
fig = plt.figure(figsize=(6,4), dpi=50)
plt.plot(x)
plt.show()
```

##### 多图

1. fig.add_subplot

```python
fig = plt.figure(figsize=(5,5), dpi=50)
## 添加子区域
ax = fig.add_subplot(2,2,1)
ax.plot(x)

ax2 = fig.add_subplot(2,2,2)
ax2.plot(x+0.99)
plt.show()
```

```python
fig = plt.figure(figsize=None, dpi=None)
fig.add_subplot(2,2,1)
plt.plot(x)
plt.show()
```

2. plt.subplot

```python
fig = plt.figure(figsize=(5,5), dpi=100)
ax = plt.subplot(2,2,1)
ax.plot(x)

plt.subplot(2,2,2)
plt.plot(x)

plt.show()
```

3. plt.subplots

```python
fig,ax = plt.subplots(3,3)

ax[0][0].plot(x)
```

#### 8.1.2 绘制图表

##### 折线图 plot

```python
import numpy as np
import matplotlib.pylab as plt
import matplotlib

## 支持中文,用来正常显示中文标签
matplotlib.rcParams['axes.unicode_minus'] = False
## 初始化数据
x = np.linspace(0,10,5)
y = np.random.randn(5)
## 预备画图
fig = plt.figure(figsize=(2,3), dpi=100)
plt.plot(x,y)
plt.show()
```

##### 散点图 scatter

```python
import numpy as np
import matplotlib.pylab as plt
import matplotlib

matplotlib.rcParams['axes.unicode_minus'] = False

num = 10
x = np.random.randn(num)
y = np.random.randn(num)

## 画图
plt.scatter(x,y, marker='o', alpha=0.2,linewidths=10, edgecolors='blue')
plt.show()
```

##### 条形图或柱状图 bar/barh

plt.bar ( x, height, width = 0.8, bottom = None, color)。

x 为一个标量序列，确定 x 轴刻度数目；height 用来确定 y 轴的刻度；width 为单个直方图的宽度；bottom 用来设置 y 边界坐标轴起点；color 用来设置直方图颜色。（只给出一个值表示全部使用该颜色，若赋值颜色列表则会逐一染色，若给出颜色列表数目少于直方图数目则会循环利用）。

```python
import matplotlib.pyplot as plt
import matplotlib

matplotlib.rcParams['axes.unicode_minus'] = False
## 柱状图数量
## x = range(1,11)
x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
y = [904.8, 903.9, 857.13, 944.49, 498.72, 416.39, 930.74, 946.14, 953.54, 953.55]
x_label = ['20210817', '20210818', '20210819', '20210820', '20210821', '20210822', '20210823', '20210824',  '20210825', '20210826']
plt.figure(figsize=(15, 5))
plt.bar(x, y, width=0.5, color='r')
plt.grid(True, linestyle=':', color='b', alpha=0.6)
## 开启网格线
plt.xticks(x, x_label)

plt.xlabel('Date')
plt.ylabel('Passenger_flow')

plt.title('daily passenger flow')
plt.show()
```

##### 饼状图 pie

plt.pie( x, labels, explode, startangle, shadow, labeldistance, radius)
解释:
其中：

- x 为（每一块的）比例，如果 sum(x) > 1,会使用 sum (x)归一化；
- labels 为（每一块）饼图外侧显示的说明文字；
- explode 为（每一块）离开中心距离，默认为 0；
- startangle 为起始绘制角度，默认图是从 x 轴正方向逆时针画起，如设定为 90，则从 y 轴正方向画起
- shadow 表示在饼图下面画一个阴影。默认值：False，即不画阴影；
- labeldistance 为 label 标记的绘制位置，相对于半径的比例，默认为 1.1，如<1 则绘制在饼图内侧；
- radius 用来控制饼图半径，默认值为 1。

```python
import matplotlib.pyplot as plt

plt.rcParams['font.sans-serif'] = ['SimHei']
labels = '地铁','常规公交','小汽车','非机动车'
size = [10,10,30,50]

plt.pie(size, labels=labels, shadow=True, autopct='%1.2f%%', startangle=90)
plt.title('占比图')
plt.show()
```

#### 8.1.3 配置图例

对所绘图形进一步添加图例元素，例如设置标题、坐标轴文字说明等，常用接口如下：

1）title: 设置图表标题；

2）axis/xlim/ylim：设置相应坐标轴范围，其中 axis 是对 xlim 和 ylim 的集成，接受 4 个参数分别作为 x 和 y 轴的范围参数；

3）grid：添加图表网格线（默认为 False）；

4）legend：在图表中添加 label 图例参数后，通过 legend 进行显示；

5）xlabel/ylabel：分别用于设置 x、y 轴标题；

6）xticks/yticks：分别用于自定义坐标刻度显示；

以上是 matplotlib 中常用的配置图例，在第二部分介绍几种常见的图表形式时，也有涉及这些配置图例的使用，读者可以通过第二部分的代码熟悉以上常用接口。

### 8.2 个人练习

```python
import matplotlib.pyplot as plt
import numpy as np

fig,axes = plt.subplots(2,2)

## 图1 折线图
x1 = np.linspace(-5,5,10)
y1 = np.random.randn(10)
axes[0][0].plot(x1,y1)

## 图2 散点图
x2 = np.linspace(-5,5,100)
y2 = np.random.randn(100)
axes[0][1].scatter(x2,y2,marker='o', alpha=0.2)

## 图3 柱状图
axes[1][0].bar([1,2,3,4,5],[9.1,9.4,10,9.6,9.2], color='b')

## 图4 饼状图
axes[1][1].pie(x=[10,10,30,50,30], labels=list('ABCDE'), autopct='%.0f%%',explode=[0, 0.2, 0, 0,0.2])

plt.show()
```

## 七、SciPy

### 7.1 简介

SciPy 内部的模块包括优化模块、线性代数模块、统计模块、傅里叶变化模块、积分模块、信号处理模块、图像处理模块、稀疏矩阵模块、插值模块等。适合做有关数学、数学运算的问题。

### 7.2 拟合与优化 optimize

#### 7.2.1 求最小值

- optimize.bruce
- optimize.leastsq

```python
def f(x):
    return 0.01*(x**4) + 20*np.sin(x)

## 图形的大小，宽度为 10 英寸，高度为 5 英寸。
plt.figure(figsize=(10,5))
x = np.arange(-15,15,0.1)

plt.xlabel = 'x'
plt.ylabel = 'y'
plt.title('optimize')
## 'b-' 表示曲线的颜色为蓝色（b），线型为实线（-）。
plt.plot(x,f(x),'b-',label='$f(x)=x^4/100+20sin(x)$')

a = f(-1.3)
## annotate 函数用于在图形上添加注释，画箭头
## xy：表示箭头指的位置。xytext：表示“min”的位置
plt.annotate('min',xy=(-1.3,a), xytext=(3,40), arrowprops=dict(facecolor='black',shrink=0.05))
plt.legend() ## 显示图例
plt.show()
```

```python
## 拟牛顿法 - 局部最优
res = optimize.fmin_bfgs(f,0) ## 0为初始值
print(res)
## 暴力求解 - 最优
tmp = (-15,15,0.1) ## 起始值、结束值以及步长
global_minX = optimize.brute(f,(tmp,))
print(global_minX)
```

#### 7.2.2 曲线拟合

最小二乘法拟合 optimize.leastsq

scipy.optimize.leastsq(func, x0, args=(), Dfun=None, full_output=0, col_deriv=0, ftol=1.49012e-08, xtol=1.49012e-08, gtol=0.0, maxfev=0, epsfcn=None, factor=100, diag=None)

找到一组参数，使得给定的残差函数（即观测值与模型预测值之间的差异）的平方和最小。

参数说明：

- func：残差函数，它接受待优化的参数和其他额外参数（如果有）作为输入，并返回残差数组。
- x0：初始猜测值，是一个一维数组，包含了待优化参数的初始估计值。
- args：传递给残差函数 func 的额外参数，是一个元组。

```python
import scipy.optimize as optimize

#定义拟合函数图形 asin(2kPIx+b)
def func(x,m):
    a,K,b = m
    return a*np.sin(2*K*np.pi*x+b)

#定义误差函数
def error(m,x,y):
    return y-func(x,m)

#生成训练数据
#给出参数的初始值
p = [20,0.5,np.pi/4]
a,K,b = p
x = np.linspace(0,2*np.pi,1000) ## 划定x范围 0-2pai，生成指定数量的等间距数值

#随机指定参数
y = func(x,[a,K,b]) ## 真实值
#randn(m)从标准正态分布中返回m个值，在本例作为噪声
y_ = y + 2*np.random.randn(len(x)) ## 真实+噪声

#进行参数估计
Para = optimize.leastsq(error,p,args=(x,y_))
a,K,b = Para[0]
print('a=',a, 'K=',K,'b=',b)

## 图形可视化
plt.figure(figsize=(20, 8))
ax1 = plt.subplot()
## 将当前的绘图活动切换到指定的子图上
plt.sca(ax1)
## 绘制散点图
plt.scatter(x, y_, color='gray', label='Sample Points', linewidth=3)
plt.xlabel='x'
plt.xlabel='y'
y = func(x, p)
plt.plot(x, y, color='red', label='Target line', linewidth=2)
## 显示图例和图形
plt.legend()
plt.show()
```

### 7.3 线性代数 linalg

与 numpy 类似

```python
from scipy import linalg

arr = np.array([[9,2,8],[2,5,6],[5,1,3]])
inv = linalg.inv(arr)

inv
```

### 7.4 统计模块

#### 直方图和概率密度函数

stats.norm.pdf(x,loc,scale)实现正态(高斯)分布。其中，

- loc 表示均值
- scale 表示方差

```python
import matplotlib.pyplot as plt
from scipy import stats
import numpy as np

x = np.linspace(-10,10,100)
plt.rcParams['font.sans-serif'] = ['SimHei']
matplotlib.rcParams['axes.unicode_minus'] = False

y1 = stats.norm.pdf(x,0,1)
y2 = stats.norm.pdf(x,1,3)
y3 = stats.norm.pdf(x,-5,3)

plt.figure(figsize=(10,5), dpi=100)
plt.plot(x,y1, color='red', label='loc=0, scale=1')
plt.plot(x,y2, color='blue',label='loc=1, scale=3')
plt.plot(x,y3, color='yellow',label='loc=-5, scale=3')

plt.legend()
plt.show()
```

#### 统计检验

如 t 分布检验。如果 p 值小于我们的阈值，那么我们就有证据反对总体均值相等的零假设。

1. statistic 越大，越显著不同。

2. 对于 pvalue：
   决策规则
   一般会事先设定一个显著性水平 α，常用的值为 0.05 或者 0.01。
   决策规则如下：

- p 值小于等于 α：在这种情况下，拒绝原假设  H0，接受备择假设 H1，意味着两个总体的均值存在显著差异。
- p 值大于 α：此时不能拒绝原假设 H0，也就是说没有足够的证据表明两个总体的均值存在显著差异。

```python
import matplotlib.pyplot as plt
from scipy import stats
a = np.random.normal(4,2,1000)
b = np.random.normal(1,2,1000)

plt.plot(a,color='red')
plt.plot(b,color='green')

stats.ttest_ind(a,b)
```

## 八、机器学习 Scikit-learn

### 8.1 SVM 分类

最终得到的决策函数为：f(x)=wTx+b。其中：

- w = coef\_
- b = intercept\_

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn import svm

## 正类
p = np.random.normal(2, 1, (200, 2))
## 负类
f = np.random.normal(0, 1, (200, 2))
## 转为dataframe
df_p = pd.DataFrame(p, columns=list('XY'))
df_p['Z'] = 1
df_f = pd.DataFrame(f, columns=list('XY'))
df_f['Z'] = 0
## 合并f和p
con = pd.concat([df_p, df_f], axis=0)
## 重置索引 0-199 0-199 --> 0-399
con.reset_index(inplace=True, drop=True)

## 区分测试集、训练集
test_num = 150
trainData = con[0:-test_num] ## 训练集必须包含2个及以上分类
testData = con[-test_num:]

## 选择训练集特征和标签
X = trainData[['X','Y']]
Z = trainData['Z']
X_test = testData[['X','Y']]
Z_test = testData['Z']
## SCV分类器
clf = svm.SVC(kernel='linear')
## 训练
clf.fit(X,Z)
## 得分
clf.score(X,Z)

print(f'系数：{clf.coef_}, {clf.intercept_}')
print(f'score:{clf.score(X_test,Z_test)}')
```

### 8.2 随机森林回归

```python
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestRegressor

## 读取文件
df = pd.read_csv('./scikit-learn/xizhimen.csv', encoding='gbk', parse_dates=True)
## 画图
plt.figure(figsize=(10,5))
plt.grid(True)
plt.plot(df.iloc[:,0], df.iloc[:,1], label="XIZHIMEN Station")
plt.legend()
plt.show()

## 新增前一天客流数据
df['pre_Date_flow'] = df.loc[:,['p_flow']].shift(1)
## 新增前5日平均客流数据
df['mean5'] = df.loc[:,['p_flow']].rolling(5).mean()
## 新增前10日平均客流数据
df['mean10'] = df.loc[:,['p_flow']].rolling(10).mean()
## 删除存在NaN的行
df.dropna(inplace=True)

X = df[['pre_Date_flow','mean5','mean10']]
Y = df['p_flow']
## 更改索引
X.index = range(X.shape[0])
## display(X)
## 设置训练集和测试集
num = int(X.shape[0] * 0.8)
X_train, X_test = X[:num], X[num:]
Y_train, Y_test = Y[:num], Y[num:]

## 预测 n_estimators为树的数量
rfr = RandomForestRegressor(n_estimators=15)
rfr.fit(X_train,Y_train)
score = rfr.score(X_test,Y_test)
res = rfr.predict(X_test)

## 画图
plt.figure(figsize=[15,5])
plt.title('The res of prediction')
plt.plot(Y_test.ravel(), label='real') ## 扁平化Y_test，处理序号问题
plt.plot(res, label='predict')
plt.legend()
plt.show()

print(f'score: {score}')
```

![png](pyStu_files/pyStu_318_0.png)

![png](pyStu_files/pyStu_318_1.png)

    score: 0.9758139051758481

### 8.3 K-means 聚类

```python
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.cluster import KMeans
from sklearn import metrics

df = pd.read_csv('./scikit-learn/in_15min.csv',encoding='gbk')
df.dropna(inplace=True)
df.drop('Station_name',axis=1,inplace=True)

## 肘方法看K值（肘的位置，就是预估的分类树）
d=[]
for i in range(1,16):
    km = KMeans(n_clusters=i, init='k-means++', n_init=10, max_iter=300, random_state=0)
    km.fit(df)
    d.append(km.inertia_) ## 记录簇内误差平方和

plt.plot(d, marker='o')
plt.xlabel('number of clusters')
plt.ylabel('distortions')
plt.show()
```

    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1440: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
      warnings.warn(
    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1440: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
      warnings.warn(
    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1440: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
      warnings.warn(
    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1440: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
      warnings.warn(
    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1440: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
      warnings.warn(
    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1440: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
      warnings.warn(
    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1440: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
      warnings.warn(
    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1440: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
      warnings.warn(
    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1440: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
      warnings.warn(
    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1440: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
      warnings.warn(
    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1440: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
      warnings.warn(
    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1440: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
      warnings.warn(
    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1440: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
      warnings.warn(
    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1440: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
      warnings.warn(
    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1440: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
      warnings.warn(

![png](pyStu_files/pyStu_320_1.png)

显然，肘部位即 k 是 6 或 7。

```python
model_kmeans = KMeans(n_clusters=6, random_state=0)
model_kmeans.fit(df)

yPre = model_kmeans.predict(df)
print(yPre+1)

## 评价指标
silhouette_s = metrics.silhouette_score(df, yPre, metric = 'euclidean') ## 欧氏距离计算样本间的距离
calinski_harabaz_s = metrics.calinski_harabasz_score(x_data, yPre)

print(f'轮廓系数：{silhouette_s}, 得分：{calinski_harabaz_s}')
```

    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1416: FutureWarning: The default value of `n_init` will change from 10 to 'auto' in 1.4. Set the value of `n_init` explicitly to suppress the warning
      super()._check_params_vs_input(X, default_n_init=10)
    F:\Anaconda\path\envs\py38\lib\site-packages\sklearn\cluster\_kmeans.py:1440: UserWarning: KMeans is known to have a memory leak on Windows with MKL, when there are less chunks than available threads. You can avoid it by setting the environment variable OMP_NUM_THREADS=2.
      warnings.warn(


    [4 3 3 3 3 3 5 5 5 5 5 2 2 1 1 5 2 2 2 6 6 2 3 1 3 3 3 1 3 3 1 3 1 3 6 5 2
     3 5 1 1 2 5 6 2 6 5 5 5 2 3 1 1 1 1 1 3 1 1 3 3 3 3 3 2 3 1 5 1 5 1 5 5 5
     5 2 2 5 1 1 3 3 1 1 1 1 1 1 1 1 1 3 1 1 4 3 3 1 5 5 5 1 5 5 5 5 2 5 5 3 4
     3 4 4 3 1 5 5 5 1 5 2 2 5 3 3 3 3 3 3 3 1 3 1 1 1 2 1 3 5 1 1 1 5 1 2 5 1
     1 1 1 1 1 1 1 1 5 1 1 5 1 1 3 1 3 4 4 1 1 3 1 1 1 1 1 1 1 3 1 1 1 5 1 1 1
     1 1 3 5 1 1 5 5 5 1 1 1 1 3 1 1 3 3 1 3 1 4 3 3 2 2 1 2 2 5 3 5 5 5 2 2 5
     2 5 1 5 3 4 4 6 3 2 5 1 1 1 1 1 1 1 1 1 1 1 2 5 5 5 5 1 1 1 1 1 1 1 1 1 1
     1 1 1 1 1 3 1 3 1 3 3 1 1 1 1 1 1]
    轮廓系数：0.3834164912580164, 得分：201.18789879013613

1.  silhouette_score：轮廓系数（Silhouette Coefficient）
    作用：评价聚类的紧密度和分离度。值的范围在 [-1, 1] 之间。 + 越接近 1，说明每个样本更紧密地聚在自己簇里，且和别的簇更分开（聚类效果好）。

        + 接近 0，说明样本可能在两个簇的边界上（聚类模糊）。

        + 小于 0，说明聚错了（样本可能被分到错误的簇）。

2.  calinski_harabasz_score：卡林斯基-哈拉巴兹指数（方差比准则）
    作用：评价聚类质量的，衡量的是簇间距离与簇内距离的比例。值越大越好：簇内越紧密、簇间越分开。

## 其他

### 星号`*`、`**`的用途

1. `*`号
   - 乘法
   - 解包 list、tuple、str
   - 定义函数时，收集参数
   - 调用函数时，分配参数
2. `**`号
   - 幂
   - 解包 dict
   - 定义函数时，关键字参数
   - 调用函数时，分配参数

### Pandas 与 Numpy 异同

    1）Numpy是数值计算的扩展包，能够高效处理N维数组，即处理高维数组或矩阵时会方便。Pandas是python的一个数据分析包，主要是做数据处理用的，以处理二维表格为主。

    2）Numpy只能存储相同类型的ndarray，Pandas能处理不同类型的数据，例如二维表格中不同列可以是不同类型的数据，一列为整数一列为字符串。

    3）Numpy支持并行计算，所以TensorFlow2.0、PyTorch都能和numpy能无缝转换。Numpy底层使用C语言编写，效率远高于纯Python代码。

    4）Pansdas是基于Numpy的一种工具,该工具是为了解决数据分析任务而创建的。Pandas提供了大量快速便捷地处理数据的函数和方法。

    5）Pandas和Numpy可以相互转换，DataFrame转化为ndarray只需要使用df.values即可，ndarray转化为DataFrame使用pd.DataFrame(array)即可。
