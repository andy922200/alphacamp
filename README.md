# My Restaurant List with Database 我的餐廳清單資料庫
運用 Node.js, mongoDB 製作的前後端應用程式，使用者可以隨機 建立、編輯、更新、刪除檔案

## 環境建置與需求
* [Node.js version 10.16.0 (LTS)](https://nodejs.org/en/)
* [Express 4.17.1](https://www.npmjs.com/package/express)
* [Express-Handlebars 3.1.0](https://www.npmjs.com/package/handlebars)
* [body-parser 1.19.0](https://www.npmjs.com/package/body-parser)
* [method-override 3.0.0]()
* [mongoose 5.6.0]()

## How to use? 如何使用？
1. 利用 git 或是 cmd 在目標資料夾下輸入以下指令
```
git clone https://github.com/andy922200/alphacamp.git
```
2. 打開終端機，切換到 Full_Version_Restaurant_List 資料夾
```
cd "alphacamp/Full_Version_Restaurant_List"
```
3. 接著，安裝相關的套件
```
npm install 
```
4. 輸入以下指令
```
npm run dev
```
5. 新增 Restaurant 資料庫 (預設為 /localhost/restaurant)，並透過終端機指令連線(預設為安裝在根目錄下, port #: 27017)
```
cd ~/mongodb/bin/ 
./mongod --dbpath /Users/[your username]/mongodb-data --bind_ip 127.0.0.1
```
6. 最後打開瀏覽器，輸入 localhost:3000 就可開始使用

## 螢幕截圖
![Index](./public/img/ "indexScreenshot")