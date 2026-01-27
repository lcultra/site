---
title: Ubuntu-Docker安装
date: 2026-01-27
description: 介绍 Docker 在 Ubuntu上的安装方法
---

# Ubuntu-Docker安装

:::info
本文档操作系统 Ubuntu 24.04 64位
:::

## 卸载旧版本

如果系统存在旧版本的 Docker，使用以下命令卸载旧版本

```bash
for pkg in docker \
           docker-engine \
           docker.io \
           docker-doc \
           podman-docker \
           containerd \
           runc;
do
    sudo apt remove $pkg;
done
```

## 脚本一键安装

```bash
curl -fsSL get.docker.com -o get-docker.sh

sh get-docker.sh --mirror Aliyun
```

## 使用 APT 安装

更新/安装依赖

```bash
apt update

apt install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

安装软件源 `GPG` 密钥

```bash
# 阿里云源
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 官方源
# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

更新 Docker 软件源

```bash
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 官方源
# echo \
#   "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
#   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

安装

```bash
apt update

apt install docker-ce docker-ce-cli containerd.io
```

## 简单使用

### 启动

```bash
# 测试 Docker 是否安装正确
docker run --rm hello-world

# 输出一个 “Hello World”，之后终止容器
docker run ubuntu:24.04 /bin/echo 'Hello world'

# 启动一个 bash 终端，允许用户进行交互
docker run -t -i ubuntu:24.04 /bin/bash
```

### 运行

```bash
# 查看镜像
docker images

# 查看容器信息
docker container ls
docker container ls -a # 所有状态

# 使用 `-d` 参数守护态运行
docker run -d --name redis -p 6379:6379 redis

# 终止容器允许
docker container stop <container-id>

docker container start <container-id>

docker container rm <container-id>
```

### 部署redis

# 创建 redis 配置文件

```bash
mkdir -p ~/redis
vim ~/redis/redis.conf

```

写入：

```bash
bind 0.0.0.0
protected-mode no
port 6379

requirepass asd123

```

启动容器

```bash
docker run -d \
  --name redis-server \
  -p 6379:6379 \
  -v ~/redis/redis.conf:/usr/local/etc/redis/redis.conf \
  redis:7 \
  redis-server /usr/local/etc/redis/redis.conf
```

```bash
# 进入容器终端
docker exec -i -t <container-id> bash

# 远程连接redis，指定上面设定的用户名和密码
redis-cli -h IP -p 6379 --user default --pass asd123
```
