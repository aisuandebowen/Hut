# 六、Pandas

```python
import pandas as pd
import numpy as np
```

## 6.1 Series

Series 是 Pandas 的核心数据结构之一，是一维数据结构。包含两个部分：index、values，基础结构都是 ndarray。

### 6.1.1 创建

```python
dict = {'a':10, 'b':2, 'c':3}
data = pd.Series(dict)

data2 = pd.Series([1,2,3], index=['A','B','C'])
data2
```

### 6.1.2 访问

可下标、也可通过 key

```python
dict = {'a':10, 'b':2, 'c':3}
data = pd.Series(dict)

print(data['a'], data[1])
```

### 6.1.3 修改索引 index

```python
dict = {'a':10, 'b':2, 'c':3}
data = pd.Series(dict)
data.index = ['O','P','Q']

data
```

### 6.1.4 拼接 concat

```python
data1 = pd.Series({'A':1,'BB':2})
data2 = pd.Series(['O','PP','QQ'],index=['R','S','T'])

data = pd.concat([data1,data2])
data
```

## 6.2 DataFrame

类似 Excel 表格的二维数据结构

### 6.2.1 创建

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

### 6.2.2 列操作

#### 基础

1. df[index] = [,,,]
2. df.index
3. 按序号：df.iloc[:,:]
4. 按索引：df.loc[:, :]

```python
print(df[['X','Y']])

print(df.iloc[:,1:2]) # 左闭右开
```

```python
df['SSS'] = [1,1,1]
df
```

#### 删除 del

```python
del df['SSS']

df
```

### 6.2.3 行操作

#### 基础

1. iloc[][]
2. loc[][]

```python
x = df.iloc[0]
x
```

#### 创建

```python
se = pd.Series([1,2,3],index=list('XYZ'),name='t')
newDf = pd.concat([df, se.to_frame().T])

print(newDf)
```

#### 删除

```python
newDf.drop(['A'],axis=0)
```

### 6.2.4 数据查询

```python
arr = np.array([[1,2,3],[4,5,6],[7,8,9]])
df = pd.DataFrame(arr, index=list('123'),columns=list('ABC'))

display(df)
```

#### 按区间范围

```python
df.loc['1':'2','A']
```

#### 按条件表达

```python
df.loc[df['C']>=6,:]
```

#### 按值查询

```python
df.loc['1','C']
```

#### 按列表

```python
df.loc[['1','2'],['C','B']]
```

#### 按自定义函数查找

```python
df.loc[lambda df: df['C'] > 5, :]
```

### 6.2.5 数据统计

```python
df = pd.DataFrame(np.random.rand(3,3),columns=list('ABC'),index=[1,2,3])
df
```

#### 排序

注意，此时 index 需要是 int 类型

```python
df2 = df.sort_index(ascending=False) # ascending=True 升序
df2
```

#### 统计指标

```python
file = pd.read_csv('./pandas/test1.CSV')
display(file)

file.describe()

# print(file['size'].mean())
```

#### 分类汇总

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

### 6.2.6 常用方法

#### df.dropna(inplace=True)

删除含有缺失值（NaN）的行或列

- inplace

  If False, return a copy. Otherwise, do operation in place and return None.

#### 行数、列数

- df.shape[0]
- df.shape[1]