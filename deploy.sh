#!/usr/bin/env sh
###
 # @Author: cbw
 # @Date: 2023-09-02 21:46:50
 # @LastEditors: cbw
 # @LastEditTime: 2023-09-03 13:15:42
 # @Description: 
### 

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:aisuandebowen/Hut.git master:gh-pages

cd -