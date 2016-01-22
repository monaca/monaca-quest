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

2. Winの場合

 Dist/Win/Project/Game.exe
 
を実行してください


# RPGツクールで開く

 RPGツクールmvで、

    Project/Game.rpgproject

を開いてください。

# デプロイ

　Mac, Win, Mobileをそれぞれ、Distディレクトリ以下の適切なディレクトリにデプロイしてください。
（すでに雛形がデプロイされているので、通常はこの操作は必要ありません）

# リソースファイルのみのデプロイ

　上記で雛形がデプロイされていれば、あとはリソースだけデプロイすれば更新が可能です。Distディレクトリで
　gulpを使えるようにしてください。


    $ npm install
　  
　あとは、以下でリソースをプラットフォームごとに

    $ gulp [プラットフォーム]

デプロイできます。プラットフォームには、mac,win,mobileのどれかを入れます。
例：

    $ gulp mac

　なお、不要ファイル削除ツールは

http://liply.net/2015/11/08/packager/

というGUIアプリを元に、gulpでから実行出来るようにしたものです。





