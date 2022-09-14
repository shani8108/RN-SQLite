import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Init, AddNewItems, SelectAllItems } from './DataBase';

export default function App() {
  const [val, setVal] = useState('***');
  const [name, setName] = useState('***');
  const [price, setPrice] = useState('***');
  const [listOfProduct, setListOfProduct] = useState([]);

  useEffect(() => {
    Init().then(() => {
      console.log("DB create good");
    }).catch(() => {
      console.log("DB create failed");
    });
  }, []);


  return (
    <View style={styles.container}>
      <Text>SQLite Sample!</Text>
      <StatusBar style="auto" />
      <View>
        <Button title='Promise' onPress={() => {
          setVal("1234")
          const prom = new Promise((res, rej) => {
            let a = 10;
            if (a === 10)
              res();
            else
              rej();
          });
          prom.then(() => {
            alert("good");
            setVal("54321")
          }).catch(() => {
            alert("fail");
          });
        }}>
        </Button>
        <View><Text>{val}</Text></View>
        <View>
          <TextInput placeholder='enter name of product' onChangeText={(txtName) => {
            setName(txtName);
          }}></TextInput>
          <TextInput placeholder='enter price of product' onChangeText={(txtPrice) => {
            setPrice(txtPrice);
          }}></TextInput>
          <Button title='Promise DB' onPress={() => {
            //{ name }, { price }
            AddNewItems("cola", 10).then((result) => {
              console.log(result);
              console.log("sucsess insert to db");
            }).catch((err) => {
              console.log(err);
            });
          }}>
          </Button>
        </View>
        <View>
          <Button title='Select All' onPress={() => {
            SelectAllItems().then((result) => {
              console.log(result.rows._array);
              setListOfProduct(result.rows._array);
            }).catch((err) => {
              console.log(err);
            });
          }}>
          </Button>
          <ScrollView>
            {listOfProduct.map((x) => {
              return (<View key={x.ID}>
                <Text>{x.ID} : {x.Name} : {x.Price}</Text>
              </View>)
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
