import { useRef, useState } from "react";
import { useTimer } from "../../Utils/Time";
import { View } from "react-native";
import { Colors, Dimension } from "../../Constants/Styles";
import ButtonPlay from "../../Components/ButtonPlay";
import Timer from "../../Components/Timer";
import ButtonRefresh from "../../Components/ButtonRefresh";
interface ButtonPlayRef {
  changeTypeToPlay: () => void;
}

function Home() {
  const { formattedTime, startTimer, pauseTimer, resetTimer } = useTimer(8);
  const [isRunning, setIsRunning] = useState(false);
  const widthHome = isRunning ? {width: Dimension.WIDTH - 50} : null;
  const buttonPlayRef = useRef<ButtonPlayRef>(null);
  const [type, setType] = useState('');
  const color = 'white';

  const handlePlay = () => {
    setIsRunning(true);
    startTimer();
    setType('start');
  };

  const handlePause = () => {
    pauseTimer();
    setType('pause');
  }

  const handleRefresh = () => {
    resetTimer();

    if(buttonPlayRef.current)
      buttonPlayRef.current.changeTypeToPlay();

    setIsRunning(false);
    setType('restart');
  };

  // TO DO: Create counter before start.
  // TO DO: adapt component to restart after timeout.
  return(
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: Colors.BACKGROUND_YELLOW}}>
      <Timer time={formattedTime} color={color} functionality={type} />

      <View style={{ height: Dimension.HEIGHT / 6 }} />

      <View style={[{ flexDirection: 'row', justifyContent:'space-between' }, widthHome]}>
        <ButtonPlay color={color} onPressPlay={handlePlay} onPressPause={handlePause} ref={buttonPlayRef} />

        {isRunning && <ButtonRefresh color={color} onPressRefresh={handleRefresh} /> }
      </View>
    </View>
  );
};

export default Home;
