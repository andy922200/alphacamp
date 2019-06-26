# My Restaurant List with Database 
# 我的餐廳清單資料庫
運用 Node.js, mongoDB 製作的前後端應用程式，使用者可以隨機 建立、編輯、更新、刪除檔案

## 環境建置與需求
* [Node.js version 10.16.0 (LTS)](https://nodejs.org/en/)
* [bcryptjs 2.4.3](https://www.npmjs.com/package/bcryptjs)
* [body-parser 1.19.0](https://www.npmjs.com/package/body-parser)
* [connect-flash 0.1.1](https://www.npmjs.com/package/connect-flash)
* [dotenv 8.0.0](https://www.npmjs.com/package/dotenv)
* [Express 4.17.1](https://www.npmjs.com/package/express)
* [Express-Handlebars 3.1.0](https://www.npmjs.com/package/handlebars)
* [express-session 1.16.2](https://www.npmjs.com/package/express-session)
* [express-validator 6.0.0](https://www.npmjs.com/package/express-validator)
* [method-override 3.0.0](https://www.npmjs.com/package/method-override)
* [mongoose 5.6.0](https://www.npmjs.com/package/mongoose)
* [passport 0.4.0](https://www.npmjs.com/package/passport)
* [passport-facebook 3.0.0](https://www.npmjs.com/package/passport-facebook)
* [passport-local 1.0.0](https://www.npmjs.com/package/passport-local)

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
### 第三版 個人化
#### 註冊/登入頁面，有表格提示訊息
![Index](./public/img/Demo_Version3-1.gif "login/logout/register")
#### 每人獨立清單
![Index](./public/img/Demo_Version3-2.gif "personalized lists")

### 第二版 介面與功能優化
#### 首頁 
##### 篩選器、介面調整、搜尋功能、滑鼠 :hover 顏色變化
![Index](./public/img/Demo_Version2-1.gif "index")
#### 加入與編輯頁面
##### 添加表單驗證
![Edit/Add](./public/img/Demo_Version2-2.gif "edit/add")
#### 餐廳內容頁面
##### 新增刪除按鈕與位置調整
![Detail](./public/img/Demo_Version2-3.gif "detail")
### 初始版 具備基本 CRUD 和 RWD 
![Index](./public/img/Demo_Version1.gif "index")