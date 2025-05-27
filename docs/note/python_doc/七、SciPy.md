# 七、SciPy

## 7.1 简介

SciPy 内部的模块包括优化模块、线性代数模块、统计模块、傅里叶变化模块、积分模块、信号处理模块、图像处理模块、稀疏矩阵模块、插值模块等。适合做有关数学、数学运算的问题。

## 7.2 拟合与优化 optimize

### 7.2.1 求最小值

- optimize.bruce
- optimize.leastsq

```python
def f(x):
    return 0.01*(x**4) + 20*np.sin(x)

# 图形的大小，宽度为 10 英寸，高度为 5 英寸。
plt.figure(figsize=(10,5))
x = np.arange(-15,15,0.1)

plt.xlabel = 'x'
plt.ylabel = 'y'
plt.title('optimize')
# 'b-' 表示曲线的颜色为蓝色（b），线型为实线（-）。
plt.plot(x,f(x),'b-',label='$f(x)=x^4/100+20sin(x)$')

a = f(-1.3)
# annotate 函数用于在图形上添加注释，画箭头
# xy：表示箭头指的位置。xytext：表示“min”的位置
plt.annotate('min',xy=(-1.3,a), xytext=(3,40), arrowprops=dict(facecolor='black',shrink=0.05))
plt.legend() # 显示图例
plt.show()
```

```python
# 拟牛顿法 - 局部最优
res = optimize.fmin_bfgs(f,0) # 0为初始值
print(res)
# 暴力求解 - 最优
tmp = (-15,15,0.1) # 起始值、结束值以及步长
global_minX = optimize.brute(f,(tmp,))
print(global_minX)
```

### 7.2.2 曲线拟合

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
x = np.linspace(0,2*np.pi,1000) # 划定x范围 0-2pai，生成指定数量的等间距数值

#随机指定参数
y = func(x,[a,K,b]) # 真实值
#randn(m)从标准正态分布中返回m个值，在本例作为噪声
y_ = y + 2*np.random.randn(len(x)) # 真实+噪声

#进行参数估计
Para = optimize.leastsq(error,p,args=(x,y_))
a,K,b = Para[0]
print('a=',a, 'K=',K,'b=',b)

# 图形可视化
plt.figure(figsize=(20, 8))
ax1 = plt.subplot()
# 将当前的绘图活动切换到指定的子图上
plt.sca(ax1)
# 绘制散点图
plt.scatter(x, y_, color='gray', label='Sample Points', linewidth=3)
plt.xlabel='x'
plt.xlabel='y'
y = func(x, p)
plt.plot(x, y, color='red', label='Target line', linewidth=2)
# 显示图例和图形
plt.legend()
plt.show()
```

## 7.3 线性代数 linalg

与 numpy 类似

```python
from scipy import linalg

arr = np.array([[9,2,8],[2,5,6],[5,1,3]])
inv = linalg.inv(arr)

inv
```

## 7.4 统计模块

### 直方图和概率密度函数

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

### 统计检验

如 t 分布检验。如果 p 值小于我们的阈值，那么我们就有证据反对总体均值相等的零假设。

1. statistic 越大，越显著不同。

2. 对于 pvalue：
   决策规则
   一般会事先设定一个显著性水平 α，常用的值为 0.05 或者 0.01。
   决策规则如下：

- p 值小于等于 α：在这种情况下，拒绝原假设  H0，接受备择假设 H1，意味着两个总体的均值存在显著差异。
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