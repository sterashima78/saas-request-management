# saas-request-management

組織で利用している SaaS の登録ユーザを管理・申請受付する

# モチベーション

SaaS の利用が組織で増えていく中で、どの部署の誰が、なんというアカウントで SaaS を利用しているかの管理が煩雑になっている。  
IDaaS などのアカウント一元化によってその問題の一部を解決できるかもしれないが、対応しているサービスにも限度がある。  
そのため、社員と各種 SaaS のユーザ情報を紐づけて管理するための仕組みの必要性を感じた。

加えて、各種 SaaS への登録申請・登録処理のコストは利用する SaaS が増えるほど増大する。  
SaaS のアカウント管理には API が利用できるものも増えている。  
これらを利用者が柔軟に選択できるような仕組みを提供することで登録処理の負担が提言することを期待する。

また、申請側は SaaS によって登録申請をする窓口や申請様式が異なることに困惑する。  
そのため、同一の入口から必要な事項を入力すれば登録の申請が完了することが望ましい。

これらの問題を解決するために、プラグイン形式で SaaS ごとにユーザの申請フォームの作成や、ユーザの追加削除処理を追加できるプラットフォームを作りたいと思った。

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# プロトタイピング中の動作確認

## ユーザが登録できる

```
$ curl -X POST -H "Content-Type: application/json" -d '{"name":"piyo"}' localhost:3000/users
$ curl -X POST -H "Content-Type: application/json" -d '{"name":"hoge"}' localhost:3000/users
$ curl -X POST -H "Content-Type: application/json" -d '{"name":"hoge"}' localhost:3000/users
$ curl -X POST -H "Content-Type: application/json" -d '{"name":"foo"}' localhost:3000/users
$ cat data.user.tsv
piyo
hoge
foo
```

## ユーザ名を入れるとそのユーザでシステムに入れる

```
$ curl -X POST -H "Content-Type: application/json" -d '{"name":"piyo"}' localhost:3000/users
$ curl -H "Authorization: piyo" localhost:3000/hoge
hoge
$ curl -H "Authorization: hogehoge" localhost:3000/hoge
{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}
```

## ユーザが登録されているサービスへの登録申請ができる

```
$ curl -X POST -H "Content-Type: application/json" -d '{"name":"piyo"}' localhost:3000/users
{"name":"piyo"}

$ curl -X POST -H "Content-Type: application/json" \
               -H "Authorization: piyo" \
               -d '{"name": "demo"}' \
               localhost:3000/applications
{"id":1,"type":"demo","createdBy":"piyo"}

$ curl -X POST -H "Content-Type: application/json" \
               -H "Authorization: hogehoge" \
               -d '{"name": "demo"}' \
               localhost:3000/applications
{"statusCode":403,"message":"Forbidden resource","error":"Forbidden"}

$ curl -X POST -H "Content-Type: application/json" \
               -H "Authorization: piyo" \
               -d '{"name": "test"}' \
               localhost:3000/applications
{"statusCode":400,"message":"Error"}

```

## 申請一覧が見れる

```
$ curl -X POST -H "Content-Type: application/json" -d '{"name":"piyo"}' localhost:3000/users
{"name":"piyo"}

$ curl -X POST -H "Content-Type: application/json" -d '{"name":"hoge"}' localhost:3000/users
{"name":"piyo"}

$ curl localhost:3000/applications/types
{"applications":[{"name":"demo"},{"name":"demo2"}]}

$ curl -X POST -H "Content-Type: application/json" \
               -H "Authorization: piyo" \
               -d '{"name": "demo"}' \
               localhost:3000/applications
{"id":1,"type":"demo","createdBy":"piyo"}
$ curl -X POST -H "Content-Type: application/json" \
               -H "Authorization: piyo" \
               -d '{"name": "demo2"}' \
               localhost:3000/applications
{"id":2,"type":"demo2","createdBy":"piyo"}
$ curl -X POST -H "Content-Type: application/json" \
               -H "Authorization: hoge" \
               -d '{"name": "demo2"}' \
               localhost:3000/applications
{"id":3,"type":"demo2","createdBy":"hoge"}
$ curl -X POST -H "Content-Type: application/json" \
               -H "Authorization: hoge" \
               -d '{"name": "demo2"}' \
               localhost:3000/applications
{"id":4,"type":"demo2","createdBy":"hoge"}
$ curl -H "Authorization: piyo"  localhost:3000/applications
[{"id":1,"type":"demo","createdBy":"piyo"},{"id":2,"type":"demo2","createdBy":"piyo"}]
$ curl -H "Authorization: hoge"  localhost:3000/applications
[{"id":3,"type":"demo2","createdBy":"hoge"},{"id":4,"type":"demo2","createdBy":"hoge"}]
```

## ユーザが登録されているサービスへの登録削除申請ができる
