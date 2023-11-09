## 常见问题

### 版本回退

1. 查看提交记录

   复制指定`commit`的版本`id`。

   ```
   git log
   ```

2. 版本回退

   ```
   git reset
   ```

   - `git reset --soft`

     暂存区、工作区保持不变，本地仓库回滚到**指定版本`commit`完成后的那一刻**。

   - `git reset --mixed`

     工作区保持不变，本地仓和暂存区	回滚到指定版本。

   - `git reset --hard`

     本地仓、暂存区、工作区都回滚到指定版本。
   ![图片](https://github.com/aisuandebowen/Hut/assets/58322181/5606c9aa-3ee9-4a5f-93d7-a68c71ede7b4)


### 修改commit message

```
git commit --amend
```

### 查看修改内容

查看工作区和版本库里面最新版本的区别：

```
git diff <file>
```

#### 版本比对

` git diff [first-branch]...[second-branch] `

优化处理：

1. 只显示变更文件

   ```
   git diff --name-only
   ```

2. 变动文件状态(添加,修改,还是删除)

   ```
   git diff --name-status
   ```

### 复制修改内容

1. 记录 commit_id
2. `git cherry-pick <commit_id>`

### 远程强制覆盖本地
```
git fetch -all
git reset --hard origin/<branch>
git pull
```

一键copy
```
git fetch --all &&  git reset --hard origin/<branch> && git pull
```

### 查看commit id属于哪个分支
```
git branch --contains <commit id>
git branch --contains <commit id> -r // 加远程
```
