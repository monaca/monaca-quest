CordovaQuest
===============

# ディレクトリ構造

 Project -- RPGツクールで編集出来るプロジェクト一式
 Dist 
   -- Resource  不要ファイル削除ツールで減らしたリソース一式。  
   -- Mac       RPGツクールでデプロイしたMac用ゲーム。（手作業でリソース一式を減らす）
   -- Win       同Win用ゲーム
   -- Mobile    同iOS/Android用ゲーム

 

# すぐにプレイしてみる

1. Macの場合

 Dist/Mac/Game.app

を実行してください


# RPGツクールで開く

 RPGツクールmvで、

    Project/Game.rpgproject

を開いてください。

# デプロイ

　Mac, Win, Mobileをそれぞれ、Distディレクトリ以下の適切なディレクトリにデプロイしてください。
　デプロイ後、リソースを減らすため、以下の不要ファイル削除ツールで減らしてください。

# 不要ファイル削除ツール(試作版)

http://liply.net/2015/11/08/packager/

Projectのディレクトリを指定する（デプロイしたディレクトリではないことに注意）
吐き出しディレクトリを指定する（ここでは、Dist/Resourceを想定）
=> 実行すると、リソースを減らしてくれる。

デプロイ済みアプリに適用するためには、以下を手作業で行う必要がある。

1. Macの場合

 Dist/Mac/Game.app/Contents/Resources/app.nw

以下のリソースディレクトリ(img)などを、上で吐き出したリソースディレクトリで
置き換える。
(package.jsonだけは、app.nwにあるオリジナルのものを残しておく)




