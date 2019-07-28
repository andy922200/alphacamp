# My Expense-Tracker
# 我的開銷帳本資料庫
採用 Node.js, MySQL 製作的前後端應用程式，使用者可以隨機 建立、編輯、更新、刪除檔案，並串接 Facebook & Google & Github 方便使用者登入。

## 環境建置與需求
* [Node.js version 10.16.0 (LTS)](https://nodejs.org/en/)
* [以及一連串的套件清單，請閱讀 package.json](https://tinyurl.com/y4kfg2gg)

## How to use? 如何使用？
1. 利用 git 或是 cmd 在目標資料夾下輸入以下指令
```
git clone https://github.com/andy922200/alphacamp.git
```
2. 打開終端機，切換到 expense-tracker 資料夾
```
cd "alphacamp/expense-tracker"
```
3. 接著，安裝相關的套件
```
npm install 
```
4. 輸入以下指令
```
npm run dev
```
5. 等待修改
```
cd ~/mongodb/bin/ 
./mongod --dbpath /Users/[your username]/mongodb-data --bind_ip 127.0.0.1
```
7. 打開瀏覽器，輸入 localhost:3000 即可使用
## 螢幕截圖
![Demo](./public/img/Demo_Version1.gif "demo")