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

# 不要ファイル削除ツール(試作版)

  上記にデプロイした後、不要なリソースファイルを削除するには

    $ gulp プラットフォーム

で実行できます。プラットフォームには、mac,win,mobileのどれかを入れます。
例：

    $ gulp mac

　なお、不要ファイル削除ツールは

http://liply.net/2015/11/08/packager/

というGUIアプリを元に、gulpでから実行出来るようにしたものです。





