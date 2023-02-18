import React, {useState, useRef} from 'react';
import {Modal, TouchableWithoutFeedback, View, Text} from 'react-native';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef();

  const handlePress = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalVisible(false);
    }
  };

  return (
    <View>
      <Modal visible={modalVisible} ref={modalRef}>
        <TouchableWithoutFeedback onPress={handlePress}>
          <View>
            <Text>This is the modal content</Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View>
          <Text>Open Modal</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default App;
