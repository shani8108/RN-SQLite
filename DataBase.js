import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase("i=Item.db");

export function Init() {
    //declare Tables Model
    const prom = new Promise((resolve, reject) => {
        //success=>resolve
        //fail=> reject
        database.transaction((tx => {
            //create one time table

            tx.executeSql('CREATE TABLE IF NOT EXISTS ITEMS (ID INTEGER PRIMARY KEY NOT NULL,Name TEXT NOT NULL,Price INTEGER NOT NULL )'
                , [], () => {
                    console.log("Sucsess from create table items")
                    resolve();
                }, (_, err) => {
                    console.log("error from create table items")
                    console.log(err);
                    reject();
                })
        }));
    });
    return prom;
}

export function AddNewItems(name, price) {
    //declare Tables Model
    const prom = new Promise((resolve, reject) => {
        //success=>resolve
        //fail=> reject
        database.transaction((conn => {
            //create one time table

            conn.executeSql('INSERT INTO ITEMS (Name ,Price) VALUES (?,?)'
                , [name, price], (_, result) => {
                    console.log("Sucsess from insert to table items")
                    console.log(result);
                    resolve(result);
                }, (_, err) => {
                    console.log("error from insert to table items")
                    console.log(err);
                    reject(err);
                })
        }));
    });
    return prom;
}

export function SelectAllItems() {
    //declare Tables Model
    const prom = new Promise((resolve, reject) => {
        //success=>resolve
        //fail=> reject
        database.transaction((conn => {
            //create one time table

            conn.executeSql('SELECT * FROM ITEMS'
                , [], (_, result) => {
                    console.log("Sucsess from select all items")
                    console.log(result);
                    resolve(result);
                }, (_, err) => {
                    console.log("error from select all items")
                    console.log(err);
                    reject(err);
                })
        }));
    });
    return prom;
}