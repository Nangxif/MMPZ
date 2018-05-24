# MMPZ
# 买卖铺子，做自己的买卖
## 项目开启流程：
### 一、安装Webstorm、MongoDB以及Robomongo
### 二、开启mongoDB数据库
#### 1.在控制台输入
  `cd C:\Program Files\MongoDB\Server\3.6\bin` //后面的地址是安装的MongoDB的bin目录的地址
#### 2.在控制台输入
  `mongod --dbpath F:\MMPZ\db`  //后面的地址是项目目录的db文件夹地址
  运行结果
  ![cmd](https://github.com/Nangxif/MMPZ/blob/master/public/img/cmd.png)
### 三、通过Robomongo或MongoDB Compass Community连接数据库开启的端口
  ![连接](https://github.com/Nangxif/MMPZ/blob/master/public/img/connent.png)
  连接成功之后可以查看、修改、删除数据库
  ![连接](https://github.com/Nangxif/MMPZ/blob/master/public/img/table.png)
### 四、打开项目，并打开app.js入口文件，右键运行run 'app.js'
### 五、开启项目可能遇到的问题
  如果MongoDB数据库打开失败，则删除项目db文件夹里面的东西，再重新生成。如果删除db文件夹里面的数据之后，项目得以成功打开，那么控制台会报错（goodsrclist数组undefined），这是正常的，只要以管理员身份登录后台，录入所有商品信息即可解决此问题。
### 六、目录结构
  目录一<br>
  ![连接](https://github.com/Nangxif/MMPZ/blob/master/public/img/index_1.jpg)<br>
  目录二<br>
  ![连接](https://github.com/Nangxif/MMPZ/blob/master/public/img/index_2.jpg)<br>
