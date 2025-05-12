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

## 检测conda是否安装成功
返回true
```
python
import torch
torch.cuda.is_available()
```

## python镜像源

清华

```
-i https://pypi.tuna.tsinghua.edu.cn/simple
```

## jupyter转markdown
```
pip install nbconvert

jupyter nbconvert --to markdown test.ipynb
```

## nbconvert改图片路径
```
jupyter nbconvert mynotebook.ipynb --to markdown --template=nbconvert_imgPath_template --TemplateExporter.extra_template_basedirs=. --NbConvertApp.output_files_dir="markdown-img/{notebook_name}.assets"
```

## 监控GPU状况
```bash
for /L %i in () do @nvidia-smi & timeout /t 1 >nul
```
