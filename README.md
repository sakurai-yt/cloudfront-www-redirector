# CloudFront WWW リダイレクタ

`www`なしのリクエストを`www`付きのURLにリダイレクトするためのLambda@Edge関数です。  
このプロジェクトは、ドメインの一貫性を保つことでSEOの向上に役立ち、HTTPS対応のリダイレクトもサポートします。

## 📌 主な機能
- `example.com` から `www.example.com` へのリダイレクトを実現
- **HTTPS**対応のリダイレクトが可能
- **301 Moved Permanently** を返し、SEO効果を向上
- CloudFrontとLambda@Edgeに対応

## 🚀 使用方法

### 前提条件
- AWSアカウントをお持ちであること。
- Lambda と CloudFront の基本的な知識があること。
- Node.js ランタイムに関する基本的な理解。

---

### 1. このリポジトリをクローンする
```bash
git clone https://github.com/sakurai-yt/cloudfront-www-redirector.git
cd cloudfront-www-redirector
```

---

### 2. Lambda 関数のデプロイ

1. AWS Lambda コンソールに移動し、「関数を作成」をクリック。
2. ランタイムには **Node.js 18.x** を選択します。
3. このリポジトリの`index.mjs`ファイルをLambdaエディタにコピーします。
4. 「バージョンを発行」をクリックして、Lambda関数のバージョンを作成します。
5. CloudFrontディストリビューションの **Viewer Request** または **Origin Request** イベントに、このLambda関数をアタッチします。

---

### 3. テストイベントの実行

以下のJSONを使用して、Lambda関数のテストを実行できます。  
このテストでは、`www`なしのリクエストを送信し、`www`付きのURLにリダイレクトされることを確認します。

#### テストイベントの例
```json
{
  "Records": [
    {
      "cf": {
        "request": {
          "headers": {
            "host": [
              {
                "key": "Host",
                "value": "example.com"
              }
            ]
          },
          "uri": "/test-path",
          "method": "GET"
        }
      }
    }
  ]
}
```

---

### 4. CloudFront の設定

1. AWS CloudFront コンソールで、対象のディストリビューションを選択します。
2. **Behaviors** タブで、Lambda関数をアタッチするビヘイビアを編集します。
3. **Viewer Request** または **Origin Request** のイベントにLambda関数を設定し、保存します。
4. CloudFrontの変更が反映されるまでに15～30分かかる場合があります。

---

### 🛠 トラブルシューティング

- **権限エラー**: Lambda関数にアタッチされているIAMロールに、以下のポリシーが含まれているか確認してください：
  - `AWSLambdaBasicExecutionRole`
  - `AWSLambdaEdgePolicy` (必要に応じて作成)
  
- **CloudWatch ログの確認**: Lambda関数が期待通りに動作しない場合、AWS CloudWatch にログが出力されます。

- **バージョンの発行**: CloudFrontにアタッチする前に、Lambda関数のバージョンを発行する必要があります。

---

### 📄 ライセンス
このプロジェクトは MIT ライセンスの下で提供されています。詳細については [LICENSE](LICENSE) ファイルをご覧ください。

---

### 💬 サポート
質問や問題がある場合は、GitHubのIssueセクションから報告してください。

---

### 🌐 リンク
- [AWS Lambda ドキュメント](https://docs.aws.amazon.com/lambda/)
- [CloudFront ドキュメント](https://docs.aws.amazon.com/cloudfront/)