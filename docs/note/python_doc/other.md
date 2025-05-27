# 其他other

## 星号`*`、`**`的用途

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

## Pandas 与 Numpy 异同

    1）Numpy是数值计算的扩展包，能够高效处理N维数组，即处理高维数组或矩阵时会方便。Pandas是python的一个数据分析包，主要是做数据处理用的，以处理二维表格为主。
    
    2）Numpy只能存储相同类型的ndarray，Pandas能处理不同类型的数据，例如二维表格中不同列可以是不同类型的数据，一列为整数一列为字符串。
    
    3）Numpy支持并行计算，所以TensorFlow2.0、PyTorch都能和numpy能无缝转换。Numpy底层使用C语言编写，效率远高于纯Python代码。
    
    4）Pansdas是基于Numpy的一种工具,该工具是为了解决数据分析任务而创建的。Pandas提供了大量快速便捷地处理数据的函数和方法。
    
    5）Pandas和Numpy可以相互转换，DataFrame转化为ndarray只需要使用df.values即可，ndarray转化为DataFrame使用pd.DataFrame(array)即可。