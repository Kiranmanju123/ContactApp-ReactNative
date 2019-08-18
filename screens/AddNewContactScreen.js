import React from 'react';
import {StyleSheet, Text, View,Keyboard,AsyncStorage,Alert,TouchableWithoutFeedback,ScrollView } from 'react-native';
import {Form,Item,Input,Label,Button} from 'native-base'

export default class AddNewContactScreen extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      fname:"",
      lastname:"",
      phone:"",
      email:"",
      address:""
    }
  }

  static navigationOptions ={
    title:"Add New Contact"
  };

  saveContact = async () => {
    if (
      this.state.fname !=="" &&
      this.state.lastname !=="" &&
      this.state.phone !=="" &&
      this.state.email !=="" &&
      this.state.address !=="" 

    ) {
      //create contact object
      var contact = {
        fname: this.state.fname,
        lastname: this.state.lastname,
        phone: this.state.phone,
        email: this.state.email,
        address: this.state.address
      }
      await AsyncStorage.setItem( Date.now().toString(),
      JSON.stringify(contact)
      )
      .then(() => {
        this.props.navigation.goBack()
      })
      .catch(error => {
        console.log("Error Storing",error)
      }) 

     
    } else
     {
      Alert.alert("All fields are required!!!")
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
      onPress={ () => {
        Keyboard.dismiss
      }}
      >
      <ScrollView style={styles.container}>
       <Form>
         <Item style={styles.inputItem}>
           <Label>First Name:</Label>
           <Input
           autoCorrect={false}
           autoCapitalize="none"
           keyboardType="default"
           onChangeText={fname=>this.setState({fname})}
           />

         </Item>

         <Item style={styles.inputItem}>
           <Label>Last Name:</Label>
           <Input
           autoCorrect={false}
           autoCapitalize="none"
           keyboardType="default"
           onChangeText={lastname=>this.setState({lastname})}
           />

         </Item>

         <Item style={styles.inputItem}>
           <Label>PhoneNo:</Label>
           <Input
           autoCorrect={false}
           autoCapitalize="none"
           keyboardType="number-pad"
           onChangeText={phone=>this.setState({phone})}
           />

         </Item>

         <Item style={styles.inputItem}>
           <Label>Email:</Label>
           <Input
           autoCorrect={false}
           autoCapitalize="none"
           keyboardType="email-address"
           onChangeText={email=>this.setState({email})}
           />

         </Item>

         <Item style={styles.inputItem}>
           <Label>Address:</Label>
           <Input
           autoCorrect={false}
           autoCapitalize="none"
           keyboardType="default"
           onChangeText={address=>this.setState({address})}
           />

         </Item>




       </Form>
       <Button
       style={styles.button}
       full
       onPress = { () => {
         this.saveContact();
       }}
       ><Text style={styles.buttonText}>Save</Text>
       </Button>
       <View style={styles.empty}></View>
      </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    height: 500
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  },
  empty: {
    height: 500,
    backgroundColor: "#FFF"
  }
});