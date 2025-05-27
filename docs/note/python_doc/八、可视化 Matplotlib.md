# 八、可视化 Matplotlib

## 8.1 绘图步骤

1. 创建画板
2. 绘制图表
3. 配置图例

### 8.1.1 创建画板

#### 单图 plt.plot

```python
import matplotlib.pyplot as plt
import numpy as np

x = np.random.randn(10)
# 初始化一张画布.dpi分辨率,figsize画布大小
fig = plt.figure(figsize=(6,4), dpi=50)
plt.plot(x)
plt.show()
```

#### 多图

1. fig.add_subplot

```python
fig = plt.figure(figsize=(5,5), dpi=50)
# 添加子区域
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

### 8.1.2 绘制图表

#### 折线图 plot

```python
import numpy as np
import matplotlib.pylab as plt
import matplotlib

# 支持中文,用来正常显示中文标签
matplotlib.rcParams['axes.unicode_minus'] = False
# 初始化数据
x = np.linspace(0,10,5)
y = np.random.randn(5)
# 预备画图
fig = plt.figure(figsize=(2,3), dpi=100)
plt.plot(x,y)
plt.show()
```

#### 散点图 scatter

```python
import numpy as np
import matplotlib.pylab as plt
import matplotlib

matplotlib.rcParams['axes.unicode_minus'] = False

num = 10
x = np.random.randn(num)
y = np.random.randn(num)

# 画图
plt.scatter(x,y, marker='o', alpha=0.2,linewidths=10, edgecolors='blue')
plt.show()
```

#### 条形图或柱状图 bar/barh

plt.bar ( x, height, width = 0.8, bottom = None, color)。

x 为一个标量序列，确定 x 轴刻度数目；height 用来确定 y 轴的刻度；width 为单个直方图的宽度；bottom 用来设置 y 边界坐标轴起点；color 用来设置直方图颜色。（只给出一个值表示全部使用该颜色，若赋值颜色列表则会逐一染色，若给出颜色列表数目少于直方图数目则会循环利用）。

```python
import matplotlib.pyplot as plt
import matplotlib

matplotlib.rcParams['axes.unicode_minus'] = False
# 柱状图数量
# x = range(1,11)
x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
y = [904.8, 903.9, 857.13, 944.49, 498.72, 416.39, 930.74, 946.14, 953.54, 953.55]
x_label = ['20210817', '20210818', '20210819', '20210820', '20210821', '20210822', '20210823', '20210824',  '20210825', '20210826']
plt.figure(figsize=(15, 5))
plt.bar(x, y, width=0.5, color='r')
plt.grid(True, linestyle=':', color='b', alpha=0.6)
# 开启网格线
plt.xticks(x, x_label)

plt.xlabel('Date')
plt.ylabel('Passenger_flow')

plt.title('daily passenger flow')
plt.show()
```

#### 饼状图 pie

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

### 8.1.3 配置图例

对所绘图形进一步添加图例元素，例如设置标题、坐标轴文字说明等，常用接口如下：

1）title: 设置图表标题；

2）axis/xlim/ylim：设置相应坐标轴范围，其中 axis 是对 xlim 和 ylim 的集成，接受 4 个参数分别作为 x 和 y 轴的范围参数；

3）grid：添加图表网格线（默认为 False）；

4）legend：在图表中添加 label 图例参数后，通过 legend 进行显示；

5）xlabel/ylabel：分别用于设置 x、y 轴标题；

6）xticks/yticks：分别用于自定义坐标刻度显示；

以上是 matplotlib 中常用的配置图例，在第二部分介绍几种常见的图表形式时，也有涉及这些配置图例的使用，读者可以通过第二部分的代码熟悉以上常用接口。

## 8.2 个人练习

```python
import matplotlib.pyplot as plt
import numpy as np

fig,axes = plt.subplots(2,2)

# 图1 折线图
x1 = np.linspace(-5,5,10)
y1 = np.random.randn(10)
axes[0][0].plot(x1,y1)

# 图2 散点图
x2 = np.linspace(-5,5,100)
y2 = np.random.randn(100)
axes[0][1].scatter(x2,y2,marker='o', alpha=0.2)

# 图3 柱状图
axes[1][0].bar([1,2,3,4,5],[9.1,9.4,10,9.6,9.2], color='b')

# 图4 饼状图
axes[1][1].pie(x=[10,10,30,50,30], labels=list('ABCDE'), autopct='%.0f%%',explode=[0, 0.2, 0, 0,0.2])

plt.show()
```