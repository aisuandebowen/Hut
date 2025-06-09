# conda

## 常用命令

创建环境

```
conda create -n name python=3.8
```

激活环境

```
conda activate name
```

退出环境

```
conda deactivate
```

环境列表

```
conda info -e
conda env list
```

删除环境

```
conda remove -n name --all
```

克隆环境

```
conda create -n newE --clone oldE
```

## 检测 conda 是否安装成功

返回 true

```
python
import torch
torch.cuda.is_available()
```

## conda瘦身
```
 conda clean -p
```
Conda 会删除：
1. 已被更新或卸载的旧版本包文件。
2. 未被任何环境使用的孤立包文件。

其他常用清理选项:
+ conda clean -t：清理临时文件（--tarballs）。
+ conda clean -a：清理所有缓存（包括包、索引、临时文件等）。
