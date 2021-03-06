# saas-request-management

組織で利用している SaaS の登録ユーザを管理・申請受付する

# モチベーション

SaaS の利用が組織で増えていく中で、どの部署の誰が、なんというアカウントで SaaS を利用しているかの管理が煩雑になっている。  
IDaaS などのアカウント一元化によってその問題の一部を解決できるかもしれないが、対応しているサービスにも限度がある。  
そのため、社員と各種SaaS のユーザ情報を紐づけて管理するための仕組みの必要性を感じた。

加えて、各種 SaaS への登録申請・登録処理のコストは利用する SaaS が増えるほど増大する。  
SaaS のアカウント管理には API が利用できるものも増えている。  
これらを利用者が柔軟に選択できるような仕組みを提供することで登録処理の負担が提言することを期待する。  

また、申請側は SaaS によって登録申請をする窓口や申請様式が異なることに困惑する。  
そのため、同一の入口から必要な事項を入力すれば登録の申請が完了することが望ましい。  

これらの問題を解決するために、プラグイン形式でSaaS ごとにユーザの申請フォームの作成や、ユーザの追加削除処理を追加できるプラットフォームを作りたいと思った。
