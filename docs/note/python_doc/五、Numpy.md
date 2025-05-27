# 五、Numpy

## 5.1 生成数组


### matrix
用于表示二维矩阵。它是 numpy 模块中的一个类,专门用于线性代数运算.
+ `*`运算符默认是矩阵乘法
+ 内置线性代数方法如 `.T`(转置)、`.I` (求逆)、`.H` (共轭转置)：
```
np.matrix([
    [0,1,0,0],
    [0,0,1,1],
    [0,1,0,0],
    [1,0,1,0],
], dtype=float)
```
### ones

全是 1 的矩阵

```python
import numpy as np

matrix1 = np.ones([4,4])
matrix1
```

### zeros_like(matrix)

以 matirx 为规格生成全是元素 0 的矩阵

```python
import numpy as np

matrix1 = np.ones([4,4])
matrix2 = np.zeros_like(matrix1)
matrix2
```

### np.array(arr)

复制，生成新数组

```python
import numpy as np

arr = [[1,2],[3,4]]
arr1 = np.array(arr)
arr1
```

### np.asarray(arr)

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

### np.random.normal

生成服从正太分布的随机数数组

```python
import numpy as np

arr = np.random.normal(2,1,20) # 均值2、标准差1、20个
arr
```

### np.arange(start, stop, step)

生成固定范围的数组[start, stop)

```python
arr = np.arange(10)
arr
```

### np.random.rand()

生成服从(0, 1]均匀分布的随机数

```python
import numpy as np
arr = np.random.rand(5)

arr
```

### np.random.randn()

randn(m)从标准正态分布中返回 m 个值

### np.linspace(start, stop, num)

生成指定数量的等间距数值

## 5.2 索引与切片

list 和 ndarray 索引不同，list 只可以[0][1]而 ndarray 可以[0,1]

```python
# 导入模块
import numpy as np
arr = [[[1,2,3],[4,5,6]],[[7,8,9],[10,11,12]]]
arr2 = np.array(arr)
print(arr2)
print(arr2[0,:])
print(arr2[0][:])

print(arr[0][:])
```

## 5.3 形状修改

### 转置

```python
import numpy as np
arr = np.array([[1,2],[3,4]])
arr.T
```

### 扁平化

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

### 复制

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

flat_arr3 = np.tile(arr,(3,2)) # 行3次，列2次
print(flat_arr3)
```

### 拼接

np.concatenate((a, b), axis)

注意：

- np.concatenate((a, b), 0) 与 np.vstack((a, b))一样
- np.concatenate((a, b), 1) 与 np.hstack((a, b))一样

```python
arr1 = [[1,2],[3,4]]
arr2 = [[2,1],[4,3]]

res = np.concatenate((arr1,arr2),0) # 纵向copy
res2 = np.concatenate((arr1,arr2),1) # 横向copy
print(res)
print(res2)
```

## 5.4 修改类型

- astype

```python
arr = np.array([[1,2],[3,4]])

str_arr = arr.astype(np.str_)
print(str_arr)
```

## 5.5 通用函数

### 去重 unique(arr,axis)

```python
arr = np.array([[[1,2],[3,4]],[[1,2],[3,4]]])
unique_arr = np.unique(arr,axis=0)

print(unique_arr)
```

### 交集与并集

```python
arr = [[0,1,2],[3,4,5]]
arr2 = [[3,4,5],[0,6,7]]

# 交集
intersectionArr = np.intersect1d(arr,arr2)
# 并集
unionArr = np.union1d(arr,arr2)

print(f'交集：{intersectionArr}，并集：{unionArr}')
```

### 绝对值 abs

### 平方根 sqrt

```python
arr = [1,2,3,4,5]
res = np.sqrt(arr)

res
```

### 平方 square

### 判断元素是否为空值

```python
arr = [1,2, np.nan,4]
res = np.isnan(arr)

res
```

### 筛选 where

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

### 三角函数

- sin
- cos
- tan

## 5.6 线性代数

### 对角阵 diag

创建对角矩阵和提取二维数组的对角线元素。

```python
arr = [1,2,3]
res = np.diag(arr)

arr2 = [[1,5,7],[3,6,9],[4,6,8]]
res2 = np.diag(arr2)

print(res)
print(res2)
```

### 求迹 trace

```python
arr = [[1,5,7],[3,6,9],[4,6,8]]
trace = np.trace(arr)

trace
```

### 矩阵乘积 dot

```python
a=[[1,2],[3,4]]
b=[[2,3],[4,5]]
res = np.dot(a,b)
print(res)
```

连乘：
```python
from functools import reduce

matrices = [A, B, C]
result = reduce(np.dot, matrices)
```


### 行列式 det

### 特征值、特征向量 linalg.eig

```python
arr = [[2,1],[1,2]]
eig = np.linalg.eig(arr)

print(f'特征值：{eig[0]},特征向量{eig[1]}')
```

### 矩阵的逆 linalg.inv

### 求解线性方程组 linalg.solve

求解线性方程组 Ax=b 的解

```python
A = np.array([[3,1],[1,2]])
b = np.array([9,8])
svd = np.linalg.solve(A,b)
print('解：',svd)

# 验证
print(np.dot(A,svd))
```

### 矩阵的奇异值分解

np.linalg.svd(a, full_matrices = 1, compute_uv = 1)可以用于矩阵的奇异值分解，返回该矩阵的左奇异值（u）、奇异值（s）、右奇异值（v）

## 5.7 统计分析

### 沿指定轴的和 sum

np.sum(a, axis)

```python
arr = [[1,2],[3,4]]
res = np.sum(arr, 0)

print(res)
```

### 沿指定轴平均值 mean

np.mean(a,axis)

### 指定轴最大、最小值

- np.min(axis)
- np.max(axis)

### 标准差 std(arr,axis)

### 方差 var(arr,axis)

### 沿指定轴最大、小值索引

- argmin(arr, axis)
- argmax(arr, axis)

```python
arr = np.array([[1,2],[3,5]])
res = np.argmax(arr, 0)

res
```