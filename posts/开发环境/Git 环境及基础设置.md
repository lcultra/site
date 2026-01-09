---
title: Git 环境及基础设置
date: 2022-12-28
description: Git 用户配置、常用命令、分支、标签与远程协作一页速查
---

# Git 环境及基础设置

## 用户配置

```bash
git config --global user.name "<username>" # 设置用户名
git config --global user.email "<email>" # 设置邮箱
git config --list # 查看配置信息
```

## 初始化仓库

```bash
git init # 将一个目录变成git仓库
```

## 状态、暂存、提交

```bash
git status # 查看仓库文件状态
git diff  # 比较工作区文件与暂存区文件的区别
git diff --cached # 比较暂存区的文件与当前分支上次 commit 的区别

git add <file> <file> <file> # 将文件添加到暂存区

git commit # 打开默认编辑器填写提交说明
git commit -m "<备注>" # 直接填写备注并提交
```

## 版本控制

每个版本都有一个对应的commit id，同时可以使用下面方法表示：

| 当前版本        | HEAD     |
| --------------- | -------- |
| 上个版本        | HEAD^    |
| 上上个版本      | HEAD^^   |
| ......          | ......   |
| 往上100个版本是 | HEAD~100 |

```bash
git reflog # 查看每个版本的commit id
git log # 查看当前版本过去的提交历史
git reset --hard <commit_id> # 将工作区回到某个版本
```

## 撤销/回滚

```bash
git checkout -- <file> # 撤销工作区修改或删除
git reset HEAD <file> # 把暂存区的文件撤销到工作区
```

## 远程仓库

### 与 GitHub 建立连接

```bash
ssh-keygen -t ed25519 -C "<email>" # 创建 SSH Key

# 在 GitHub 上添加公钥。
cat ~/.ssh/id_rsa.pub
```

### 本地仓库与远程仓库建立连接

- 常规：先在 GitHub 建库，再 `git clone` 到本地

```bash
git clone <url> # 从远程现有仓库克隆
git remote -v # 查看远程库的信息
git push <远程库名 = origin> <分支 = master> # 推送到远程仓库
```

- 反向：先在本地建库，再添加远程

```bash
# 建立连接
git remote add origin git@github.com:<username>/<repo>.git
# 第一次推送用 -u 关联远程分支
git push -u origin <branch>
```

- 远程库管理

```bash
git remote -v # 查看远程库的信息
git remote rm origin # 删除已有的远程库
```

## 分支管理

### 分支基础操作

```bash
git branch # 查看分支
git branch <branch-name> # 创建分支
git checkout <branch-name> # 切换分支
git checkout -b <branch-name> # 创建并切换分支
git merge <name> # 合并某分支到当前分支，使用Fast forward
git merge --no-ff -m "<备注>" <branch-name> # 禁用 Fast forward，多一次 commit 保留合并信息
git branch -d <branch-name> # 删除分支
git branch -D <branch-name> # 强制删除分支，可以删除未合并的分支(无法恢复)
```

### 解决分支冲突

合并分支时，如果当前分支有新的提交，可能冲突，需要手动解决后再提交。

```bash
git log --graph # 查看分支合并图
```

### 将当前分支的暂存区移动到栈

```bash
git stash # 隐藏当前分支的暂存区
git stash list # 查看栈里的暂存区
git stash apply <> # 恢复
git stash drop <> # 删除
git stash pop <> # 恢复并删除
```

### 分支管理之多人协作

```bash
git push <远程库名 = origin> <分支 = master> # 试图推送自己的修改
git pull # 提示推送失败（是因为远程分支比本地分支的版本新）用此命令尝试合并冲突

# 如果继续提示失败则使用下面命令继续 git push
git branch --set-upstream-to=origin/<branch> <branch> #创建本地分支和远程分支的链接关系

# git push 成功后，如果合并有冲突，则手动解决冲突后commit。
git push origin <branch-name> # 解决冲突后继续提交
```

### 分支之变基

```bash
git rebase <branch-name> # 将当前分支变基到目标分支去，使分支合并图看起来是一条直线
```

> [_变基官方文档_](https://git-scm.com/book/zh/v2/Git-%E5%88%86%E6%94%AF-%E5%8F%98%E5%9F%BA)

## 标签

> 标签：`commit id`的`域名`
> `commit id` 和`标签`的关系就是`ip`和`域名`的关系

### 创建标签

```bash
git tag # 查看所有标签
git tag <tagname> # 给当前分支的最新一次commit打标签
git tag v0.9 <tagname> <commit id> # 给某一次commit打标签
git tag -a <tagname> -m "说明" <commit id> # 带说明的打标签
```

### 标签操作

```bash
git show <tagname> # 查看标签信息
git tag -d <tagname> # 删除标签
git push origin <tagname> # 推送一个标签到远程库（commit时默认不提交）
git push origin --tags # 一次性推送全部标签
```

### 删除远程标签

```bash
git tag -d <tagname> # 先从本地删除
git push origin :refs/tags/<tagname> # 然后从远程删除
```

## 忽略特殊文件

- [GitHub 各种 `.gitignore` 配置文件仓库](https://github.com/github/gitignore)

- 在 Git 工作区目录创建 `.gitignore` 并提交，支持子目录单独配置

```bash
git add -f App.class # 强制添加到Git
git check-ignore -v <file name> # 查看某文件是否被.gitignore了
```
