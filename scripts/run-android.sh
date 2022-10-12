echo -e "\033[1;31m\033[40mLimpando a pasta do Android...\033[0m"
cd android && ./gradlew clean
echo -e "\033[1;31m\033[40mGerando apk de build e instalando\033[0m"
react-native run-android
echo -e "\033[1;31m\033[40mIniciando...\033[0m"
react-native start