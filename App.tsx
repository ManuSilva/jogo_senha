import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Alert } from 'react-native';
import { Button, Provider as PaperProvider } from "react-native-paper";

//Definindo PROPs para o valor input e seu Use State

interface Valor_input {
  valor: string;
  onChangeValor: Dispatch<SetStateAction<string>>;
  button_ok: boolean;
  onChangeButton: Dispatch<SetStateAction<boolean>>;
  valor_secret: string,
  onChangeValorSecret: Dispatch<SetStateAction<string>>;
}


//------------- Segmento da tela com o ScrollView  ---------------------//
function Tela_Scrow({ valor, onChangeValor, button_ok, onChangeButton, valor_secret, onChangeValorSecret }: Valor_input) {

  const [array, setArray] = useState([]);
  const [id, setid] = useState(1);


  useEffect(() => {

    var qtd_bull = 0;
    var qtd_cow = 0;
    var valor_secret_aux = valor_secret;

    if (button_ok == true && valor != '' && valor.length == 4) {
      setid(id + 1);

      //Validar BULL (Mesmo numero na mesma posição)
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {

          if (valor.substring(i, i + 1) == valor_secret_aux.substring(j, j + 1) && i == j) {
            qtd_bull++;
            valor_secret_aux = valor_secret_aux.substring(0, j) + 'X' + valor_secret_aux.substring(j + 1, 4)
            break;

          }
        }
      }
      //Validar COW (Mesmo numero na posição diferente)
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {

          if (valor.substring(i, i + 1) == valor_secret_aux.substring(j, j + 1) && i != j) {
            qtd_cow++;
            break;
          }
        }
      }

      array.push({ 'name': valor, 'id': id, 'code': qtd_bull + 'B ' + qtd_cow + 'C' });
      setArray(array);
      onChangeValor('');


      if (valor_secret_aux == 'XXXX') {
        setArray([]);
        setid(1);
        onChangeValor('');
        var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        nums.sort(function () { return Math.random() - 0.5 });
        onChangeValorSecret(nums.slice(0, 4).toString().split(',').join(''));

        Alert.alert(
          "Parabéns",
          "Você acertou o valor " + valor_secret,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }


    }

  }, [button_ok]);





  onChangeButton(false);


  const item = array.map((item, index) => (
    <View key={item.id} style={styles.item}>
      <Text>{item.id}</Text>
      <Text>{item.name}</Text>
      <Text>{item.code}</Text>
    </View>
  ))

  return (
    <View style={styles.container_list}>
      <View style={styles.header}>
        <Text style={styles.texto}>SEQ</Text>
        <Text style={styles.texto}>NÚMERO</Text>
        <Text style={styles.texto}>RESULT</Text>
      </View>
      <ScrollView>
        {item}
      </ScrollView>
    </View>
  );
}


//-------------  Segmento de tela para input de texto ---------------------//
function Input({ valor, onChangeValor }: Valor_input) {

  return (
    <View style={styles.container_input}>
      <Text style={styles.texto}>Informe uma sequência numérica sem digítos repetidos:</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeValor}
        value={valor}
        placeholder="0000 - 9999"
        keyboardType="numeric"
        maxLength={4}
      />

    </View>
  );
}

//------------- Segmento de tela para Botão ---------------------//
function Botao({ button_ok, onChangeButton }: Valor_input) {

  const handleButtonPress = () => {
    onChangeButton(true);
  };

  return (
    <View style={styles.container_botao}>
      <Button icon="cursor-pointer" mode="contained" onPress={handleButtonPress}>
        Confirmar
        </Button>
    </View>
  );
}

// --------------------------------------------------------------------//
//                            Executar APP
// --------------------------------------------------------------------//

export default function App() {
  const [valor, onChangeValor] = React.useState<string>('')
  const [button_ok, onChangeButton] = useState<boolean>(false)

  var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  nums.sort(function () { return Math.random() - 0.5 });

  const [valor_secret, onChangeValorSecret] = React.useState<string>(nums.slice(0, 4).toString().split(',').join(''))

  return (
    <View style={styles.container}>
      <Tela_Scrow valor={valor} onChangeValor={onChangeValor} button_ok={button_ok} onChangeButton={onChangeButton} valor_secret={valor_secret} onChangeValorSecret={onChangeValorSecret} />
      <Input valor={valor} onChangeValor={onChangeValor} button_ok={button_ok} onChangeButton={onChangeButton} />
      <Botao valor={valor} onChangeValor={onChangeValor} button_ok={button_ok} onChangeButton={onChangeButton} />
      <StatusBar style="auto" />
    </View>
  );
}

// --------------------------------------------------------------------//
//                            STYLES
// --------------------------------------------------------------------//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#f5f9eb',
    padding: 30,
  },
  container_input: {
    backgroundColor: '#ffffff',
    paddingTop: 50,
    paddingLeft: 10,
    flex: 0.5,
    borderWidth: 1,
    borderColor: '#20232a',
    marginVertical: '1%',
  },
  container_botao: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 30,
    flex: 0.2,
    borderWidth: 1,
    borderColor: '#20232a',
  },
  texto: {
    fontSize: 15,
    fontWeight: "bold"
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 10,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#32cdc3',
  },
  container_list: {
    flex: 1,
    flexDirection: 'column',
    padding: 0,
  },
  button: {
    flexDirection: "row",
    backgroundColor: '#E9DBAB',
    alignItems: 'center',
  },
});
