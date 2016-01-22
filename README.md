CordovaQuest
===============


# すぐにプレイしてみる

1. Macの場合

 Dist/Mac/Game.app

を実行してください


# RPGツクールで開く

 RPGツクールmvで、

    Project/Game.rpgproject

を開いてください。

# 不要ファイル削除ツール(試作版)

http://liply.net/2015/11/08/packager/

Projectのディレクトリを指定する（デプロイしたディレクトリではないことに注意）
吐き出しディレクトリを指定する
=> 実行すると、リソースを減らしてくれる。

すでにデプロイしたアプリに適用するためには

1. Macの場合

 Dist/Mac/Game.app/Contents/Resources/app.nw

以下のリソースディレクトリ(img)などを、上で吐き出したリソースディレクトリで
置き換える。
(package.jsonだけは、app.nwにあるオリジナルのものを残しておく)




