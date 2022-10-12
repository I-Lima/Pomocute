#!/usr/bin/env bash

echo -e "\033[1;31m\033[40mLimpando a pasta do Android...\033[0m"
cd android && ./gradlew clean
echo -e "\033[1;31m\033[40mDesinstalando apk no device.\033[0m"
./gradlew uninstallRelease
echo -e "\033[1;31m\033[40mGerando apk de release e instalando.\033[0m"
cd ..
react-native run-android --variant=release
echo -e "\033[1;31m\033[40mProcesso finalizado!\033[0m"
