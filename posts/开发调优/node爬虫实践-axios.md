---
title: node爬虫实践-axios
date: 2026-01-26
description: node爬虫实践中关于axios的使用方法
---

# node爬虫实践-axios

### 请求QPS限制

::: info 场景：服务器对请求频率有限制
要求：两次请求的间隔不能小于 minInterval，不包括 http 请求时间&响应时间
:::

::: code-group

<<< ./code/axios-throttle.ts
<<< ./code/create-request-throttle.ts

:::

### http 代理

::: info 场景描述
服务器对网络IP有限制
:::

::: code-group

<<< ./code/axios-proxy.ts

:::
