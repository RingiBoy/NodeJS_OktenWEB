// Всі дії виконувати з допомогою модулів (вручну нічого не створюємо)
// Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson
// Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами user ({. name: "Andrii", age: 22, city: "Lviv" }),  відповідно перший - onlineUsers, другий - inPersonUsers;

const fs = require("fs");
const path = require("path");
const fsPromises = require("fs/promises");

// fs.writeFile(path.join(__dirname, "file2.txt"), x, (err)=>{
//     if (err){
//         console.log(err);
//         throw err;
//     }
// });

// fs.truncate(path.join(__dirname, "file2.txt"), (err) => {
//   if (err) {
//     console.log(err);
//     throw err;
//   }
// });

// fs.writeFile(path.join(__dirname, "main", ))

// fs.appendFile(path.join(__dirname, 'app.js'), ( '\nconst onlineUsers = [{name: "Andrii", age: 21, city: "Lviv" },{name: "Andrii", age: 2222, city: "Lviv" },{name: "Andrii", age: 44, city: "Lviv" }];\nconst inPersonUsers = [{name: "Dmitriy", age: 37, city: "Kyiv" },{name: "Alex", age: 37, city: "Kyiv" },{name: "Serj", age: 37, city: "Kyiv" }];').toString(), (err)=>{
//     if (err){
//         console.log(err);
//     }
// })

// і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів, але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.
// fs.createWriteStream(path.join(__dirname, "main","inPerson","inPerson.txt"), (err)=>{
//     if (err){
//         console.log(err);
//     }
// })
// fs.createWriteStream(path.join(__dirname, "main","online", "online.txt"), (err)=>{
//     if (err){
//         console.log(err);
//     }
// })

// function writeTextInPerson(arr){
//     fs.appendFile(path.join(__dirname, "main" ,`inPerson`,`inPerson.txt`), ((JSON.stringify(`${arr}`))), (err)=>{
//         if (err){
//             console.log(err);
//         }
//     })
// }



const onlineUsers = [
  { name: "Andrii", age: 21, city: "Lviv" },
  { name: "Andrii", age: 2222, city: "Lviv" },
  { name: "Andrii", age: 44, city: "Lviv" },
];
const inPersonUsers = [
  { name: "Dmitriy", age: 37, city: "Kyiv" },
  { name: "Alex", age: 37, city: "Kyiv" },
  { name: "Serj", age: 37, city: "Kyiv" },
];

const mainPath = path.join(__dirname, "main");

async function createData() {
  await fsPromises.mkdir(mainPath);

  await Promise.all([
    fsPromises.mkdir(path.join(mainPath, "online")),
    fsPromises.mkdir(path.join(mainPath, "inPerson")),
    writeAndAppendFile("online", onlineUsers),
    writeAndAppendFile("inPerson", inPersonUsers),
  ]);
}

async function writeAndAppendFile(pathFolder, users) {
  const data = users.map(
    (value) => `\nNAME:${value.name} AGE:${value.age} CITY: ${value.city}\n`
  );
  return fsPromises.writeFile(
    path.join(mainPath, pathFolder, "user.txt"),
    data
  );
}

// createData();
// Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу. (ті, що були в папці inPerson будуть в папці online)


async function swap(firstFolder, secondFolder){
   const  [dataFirstFile, dataFromSecondData]= await Promise.all([
        fsPromises.readFile(path.join(mainPath, firstFolder, 'user.txt'), 'utf8'),
        fsPromises.readFile(path.join(mainPath, secondFolder, 'user.txt'), 'utf8')
    ]);

    await Promise.all([
        fsPromises.appendFile(path.join(mainPath, firstFolder, 'user.txt'), dataFromSecondData, {flag:'w'}),
        fsPromises.appendFile(path.join(mainPath, secondFolder, 'user.txt'), dataFirstFile, {flag:'w'})

    ])
}


swap('inPerson', 'online')