CordovaQuest
===============

# ディレクトリ構造

 Project -- RPGツクールで編集出来るプロジェクト一式
 Dist 
   -- Resource  不要ファイル削除ツールで減らしたリソース一式。  
   -- Mac       RPGツクールでデプロイしたMac用ゲーム。（手作業でリソース一式を減らす）
   -- Win       同Win用ゲーム
   -- Mobile    同iOS/Android用ゲーム

 

# 最初にすること

 まずは、npmモジュールをインストールしてください。

   $ npm install
　
 次に、gulpでリソースファイルを設定してください。

1. Macの場合

   $ gulp mac

2. Winの場合

   $ gulp win

3. Mobileの場合

   $ gulp mobile


# ゲームをプレイする

　リソースファイルの設定が出来たら、以下でゲームを開始してください。

1. Macの場合

 Dist/Mac/Project/Game.app

を実行してください

2. Winの場合

 Dist/Win/Project/Game.exe
 
を実行してください

3. Mobileの場合

 Dist/Moible/Project/www/index.html

をブラウザで開いてください。

# RPGツクールで開く

 RPGツクールmvで、

    Project/Game.rpgproject

を開いてください。

# デプロイ

　Mac, Win, Mobileをそれぞれ、Distディレクトリ以下の適切なディレクトリにデプロイしてください。
（すでに雛形がデプロイされているので、通常はこの操作は必要ありません）


# その他
  
  不要ファイル削除ツールは

http://liply.net/2015/11/08/packager/

というGUIアプリを元に、gulpでから実行出来るようにしたものです。

 SE（サウンドエフェクト）の削除判定が甘かったので、SEについては
すべてデプロイするように改修しています。


# 外部プラグインから、隠しアイテム(OnsenUI2.0)を出現させる

JavaScriptで、18番目のフラグをonにします。すなわち、以下を実行してください。

    $gameSwitches.setValue( 18 , true );


# Monaca-Quest専用の不要削除機能

    Diet/file_list.txt

に必要なリソースファイルを記述すれば、

    $ gulp diet

で、それ以外の不要なファイルを削除します。削除されるのは、Mobileだけです。
なので、Mobileについて

    $ gulp mobile
    $ gulp diet

でデプロイしてください。

なお、ダイエットの対象となっているのは、

      var targetDirs = [ 'audio/bgm' , 'audio/me' , 'audio/se' ,
//                     'data',
                     'img/animations' , 'img/characters' , 'img/enemies', 'img/faces' ,
                     'img/pictures' , 'img/tilesets' , 'img/titles1' , 'img/titles2' ];

だけです。これ以外のディレクトリについては、ダイエットの対象となりません。

