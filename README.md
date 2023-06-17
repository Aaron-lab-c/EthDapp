# EthDapp
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.5.

## Version
Angular：16.0.5

NodeJS：18.16.0

## Initial setup
1、下載EthDapp_Contract合約

2、開啟Ganache啟動模擬節點(記得配置truffle-config.js的路徑位置)

3、Truffle compile

4、Truffle migrate

5、在Angular專案路徑下執行npm install指令，初始化套件模組。

6、ng serve --open

## npm command line
npm是Node.js預設的用JavaScript編寫的軟體套件管理系統。

·npm install -g moduleName：-g將套件安裝為全域，任何專案都可以用，因此不會把該套件寫入專案的dependencies中，不會保存在專案的node_modules目錄中，如果有人拿你的專案進行npm install就不會初始化該套件。

·npm install --save moduleName:--save會將套件安裝到專案的node_modules目錄中，也會寫入專案的dependencies中，因此當在做npm install初始化專案套件時會把該套件也進行安裝。

補充:在 Angular 專案中，使用 npm install 指令時，預設是將套件安裝為專案的相依性，而不需要加上 -g 或 --save 參數。
具體來說，執行 npm install 指令時，套件會被安裝在專案的 node_modules 目錄中，同時該套件會被自動加入到 package.json 檔案的「相依性(dependencies)」部分。當其他人複製或下載你的專案並執行 npm install 時，這些相依套件會被自動安裝。

·npm uninstall moduleName:刪除指定名稱的package。

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
