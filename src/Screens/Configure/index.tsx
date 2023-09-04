import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '../../Components/Header';
import { Colors, Dimension, Fonts } from '../../Constants/Styles';
import DeviceInfo from 'react-native-device-info';
import Accordion from '../../Components/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { changeBiggerRestTimer, changeFocusTimer, changeRestTimer } from '../../actions/timerActions';
import { ChangeColor } from '../../actions/colorActions';

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

export type colorTypes = 'y' | 'g' | 'p' | 'b';

export interface timerStateProps {
  focusTimer: number;
  restTimer: number;
  biggerRestTimer: number;
}

function Configure() {
  const timerState: timerStateProps = useSelector(state => state.timer);
  const colorState: colorTypes = useSelector(state => state.color);
  const dispatch = useDispatch();

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

    const handleFocusTimer = (value: string) => dispatch(changeFocusTimer(value));
    const handleRestTimer = (value: string) => dispatch(changeRestTimer(value));
    const handleBiggerRestTimer = (value: string) => dispatch(changeBiggerRestTimer(value));

    return (
      <View style={{ justifyContent: 'flex-start'  }} >
        <InputComponent title='Tempo de foco' value={String(timerState.focusTimer/60)} onChangeText={handleFocusTimer} />
        <InputComponent title='Tempo de descanso' value={String(timerState.restTimer/60)} onChangeText={handleRestTimer} />
        <InputComponent title='Tempo de descanso maior' value={String(timerState.biggerRestTimer/60)} onChangeText={handleBiggerRestTimer} />
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
      dispatch(ChangeColor(color));
    }

    return (
      <View>
        <Text style={[{ fontSize: 18, textAlign: 'center', color: 'black'}, Fonts.ROBOTO_BOLD]}>
          Escolha a cor para seu app
        </Text>

        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20 }} >
          <ColorComponent selected={colorState.color === 'y'} color={Colors.BACKGROUND_YELLOW} onPress={() => handleChangeColor('y')} />
          <ColorComponent selected={colorState.color === 'g'} color={Colors.BACKGROUND_GREEN} onPress={() => handleChangeColor('g')} />
          <ColorComponent selected={colorState.color === 'p'} color={Colors.BACKGROUND_PINK} onPress={() => handleChangeColor('p')} />
          <ColorComponent selected={colorState.color === 'b'} color={Colors.BACKGROUND_BLUE} onPress={() => handleChangeColor('b')} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Header title='Configuração' backFunction={() => console.log('TIMER', timerState)} />

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
