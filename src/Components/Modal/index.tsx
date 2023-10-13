import React, { ReactNode } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { HomeTypes } from "../../types";

interface ModalComponentPropsTypes {
  children: ReactNode;
}

function ModalComponent(props: ModalComponentPropsTypes) {
  const modalState = useSelector((state: HomeTypes.StateType) => state.modal);

  return (
    <Modal visible={modalState.modalVisible} transparent={true} >
      <View style={styles.background} />

      {props.children}
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#AAA',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.3
  }
});

export default ModalComponent;
