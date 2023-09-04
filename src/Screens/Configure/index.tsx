import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '../../Components/Header';
import { Colors, Dimension, Fonts } from '../../Constants/Styles';
import DeviceInfo from 'react-native-device-info';
import Accordion from '../../Components/Accordion';

interface ColorComponentProps {
  selected: boolean;
  color: string;
  onPress: () => void;
}

interface InputComponentProps {
  title: string;
  value: string;
  onChangeText: (time: string) => void;
}

type colorTypes = 'y' | 'g' | 'p' | 'b';

function Configure() {
  const [color, setColor] = useState<colorTypes>('y');
  const [focusTimer, setFocusTimer] = useState('25');
  const [restTimer, setRestTimer] = useState('5');
  const [biggerRestTimer, setBiggerRestTimer] = useState('10');

  const AccordionTimerChildren = () => {
    const width = Dimension.WIDTH / 4.8,
      height = Dimension.WIDTH / 8;

    const InputComponent = (props: InputComponentProps) => {
      return (
        <View style={{ marginVertical: 6, flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={[Fonts.ROBOTO_BOLD, {color: 'black', fontSize: 18}]}>{props.title}</Text>

          <View style={{ width, height, backgroundColor: Colors.CUSTOM_LOCAL, borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput style={{ fontSize: 30, padding: 2, width: '100%', textAlign: 'center' }} value={props.value} maxLength={2} keyboardType='numeric' onChangeText={value => props.onChangeText(value)} />
          </View>
        </View>
      );
    }

    return (
      <View style={{ justifyContent: 'flex-start'  }} >
        <InputComponent title='Tempo de foco' value={focusTimer} onChangeText={setFocusTimer} />
        <InputComponent title='Tempo de descanso' value={restTimer} onChangeText={setRestTimer} />
        <InputComponent title='Tempo de descanso maior' value={biggerRestTimer} onChangeText={setBiggerRestTimer} />
      </View>
    );
  }


  const AccordionColorChildren = () => {
    const ColorComponent = (props: ColorComponentProps) => {
      const size = (Dimension.WIDTH - 10) / 6;

      return (
        <TouchableOpacity
        style={{
          backgroundColor: props.color,
          borderColor: 'black',
          borderWidth: props.selected ? 3 : 1.5,
          borderRadius: 5,
          height: size,
          width: size
        }}
        onPress={props.onPress}
      />
      );
    }

    const handleChangeColor = (color: colorTypes ) => {
      setColor(color);
    }

    return (
      <View>
        <Text style={[{ fontSize: 18, textAlign: 'center', color: 'black'}, Fonts.ROBOTO_BOLD]}>
          Escolha a cor para seu app
        </Text>

        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }} >
          <ColorComponent selected={color === 'y'} color={Colors.BACKGROUND_YELLOW} onPress={() => handleChangeColor('y')} />
          <ColorComponent selected={color === 'g'} color={Colors.BACKGROUND_GREEN} onPress={() => handleChangeColor('g')} />
          <ColorComponent selected={color === 'p'} color={Colors.BACKGROUND_PINK} onPress={() => handleChangeColor('p')} />
          <ColorComponent selected={color === 'b'} color={Colors.BACKGROUND_BLUE} onPress={() => handleChangeColor('b')} />
        </View>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <View>
        <Header title='Configuração' backFunction={() => {}} />

        <View style={{ alignItems: 'center', paddingVertical: 6}} >
          <Accordion title='Tempo' childrenComponent={AccordionTimerChildren} iconName='alarm' />

          <Accordion title='Cor' childrenComponent={AccordionColorChildren} iconName='color-palette' />
        </View>
      </View>

      <View style={{ paddingVertical: 10, alignItems: 'center' }}>
        <Text style={[{fontSize: 16, color: 'black'}, Fonts.ROBOTO_REGULAR]}>Versão: {DeviceInfo.getVersion()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default Configure;
