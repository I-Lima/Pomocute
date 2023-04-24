import { useRef, useState } from "react";
import { useTimer } from "../../Utils/Timer";
import { View } from "react-native";
import { Dimension, } from "../../Constants/Styles";
import ButtonPlay from "../../Components/ButtonPlay";
import Timer from "../../Components/Timer";
import ButtonRefresh from "../../Components/ButtonRefresh";

interface ButtonPlayRef {
  changeTypeToPlay: () => void;
}

function Home() {
  const { formattedTime, startTimer, pauseTimer, resetTimer } = useTimer(10);
  const [isRunning, setIsRunning] = useState(false);
  const widthHome = isRunning ? {width: Dimension.WIDTH - 50} : null;
  const buttonPlayRef = useRef<ButtonPlayRef>(null);

  const handlePlay = () => {
    setIsRunning(true);
    startTimer();
  };

  const handleRefresh = () => {
    resetTimer();

    if(buttonPlayRef.current)
      buttonPlayRef.current.changeTypeToPlay();

    setIsRunning(false);
  };

  return(
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Timer time={formattedTime} color="yellow" />

      <View style={{ height: Dimension.HEIGHT / 6 }} />

      <View style={[{ flexDirection: 'row', justifyContent:'space-between' }, widthHome]}>
        <ButtonPlay color="yellow" onPressPlay={handlePlay} onPressPause={pauseTimer} ref={buttonPlayRef} />

        {isRunning && <ButtonRefresh color="yellow" onPressRefresh={handleRefresh} /> }
      </View>
    </View>
  );
};

export default Home;
