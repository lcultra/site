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

```bash
# 测试 Docker 是否安装正确
docker run --rm hello-world
```
