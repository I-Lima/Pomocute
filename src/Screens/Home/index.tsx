import { useState } from "react";
import { useTimer } from "../../Utils/Timer";
import { View } from "react-native";
import { Dimension, } from "../../Constants/Styles";
import ButtonPlay from "../../Components/ButtonPlay";
import Timer from "../../Components/Timer";

function Home() {
  const { formattedTime, startTimer, pauseTimer, resetTimer } = useTimer(200);
  const [isRunning, setIsRunning] = useState(false);
  const widthHome = isRunning ? {width: Dimension.WIDTH - 50} : null;

  const handlePlay = () => {
    setIsRunning(true);

    startTimer();
  };

  const handleRefresh = () => {
    setIsRunning(false);

    resetTimer();
  };

  return(
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    }}>
      <Timer time={formattedTime} color="yellow" />

      <View style={{
        height: Dimension.HEIGHT / 6
      }} />

      <View style={[{
        flexDirection: 'row',
        justifyContent:'space-between',
      }, widthHome]}>
        <ButtonPlay type="play" color="yellow" onPressPlay={handlePlay} onPressPause={pauseTimer} />

        {isRunning && (
          <ButtonPlay type="refresh" color="yellow" onPressRefresh={handleRefresh} />
        )}
      </View>
    </View>
  );
};

export default Home;
