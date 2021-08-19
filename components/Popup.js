import React from 'react';
import {Modal,Button} from 'native-base';
import {StyleSheet} from 'react-native';


const Popup = (props)=>{
    const {title,text,showModal,setShowModal,buttons} = props;
    const {buttonYes} = buttons;
    
    return (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="300px">
                <Modal.CloseButton colorScheme="emerald"/>
                <Modal.Header>{title}</Modal.Header>
                <Modal.Body mt={5}>{text}</Modal.Body>
                <Modal.Footer>
                    <Button.Group variant="ghost" colorScheme="emerald" space={2}>
                        <Button onPress={()=>{
                            setShowModal(false)
                            buttonYes.click()
                            }}
                        >
                            {buttonYes.title}
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
      
    )
}

export default Popup;

const styles = StyleSheet.create({
    loader: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 50,
        height: 50
    }
})