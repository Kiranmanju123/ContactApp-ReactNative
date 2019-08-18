import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard,AsyncStorage,Alert } from 'react-native';
import {Form,Item,Input,Label,Button} from 'native-base'

export default class EditContactScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      fname:"",
      lastname:"",
      phone:"",
      email:"",
      address:"",
      key:""
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener("willFocus",() => {
     var key= this.props.navigation.getParam("key","")
     this.getContact(key)

    });
  }

  getContact = async key => {
    await AsyncStorage.getItem(key)
    .then(contactJsonString => {
      var contact = JSON.parse(contactJsonString)
      //set key in this object
      contact["key"]=key;
      //set state
      this.setState(contact)
    })
    .catch(error => {
      console.log(error)
    })
  }

  updateContact = async (key) => {
    if(
      this.state.fname !=="" &&
      this.state.lastname !=="" &&
      this.state.phone!=="" &&
      this.state.email !=="" &&
      this.state.address !==""
    )
    {
      var contact = {
        fname:this.state.fname,
        lastname:this.state.lastname,
        phone:this.state.phone,
        email:this.state.email,
        address:this.state.address,
      }
      await AsyncStorage.mergeItem(key,JSON.stringify(contact))
      .then(() => {
        this.props.navigation.goBack()
      })
      .catch(error => {
        console.log(error)
      })

    }

  }

  static navigationOptions ={
    title:"Edit Contact"
  };
  render() {
    return (
      <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      >
      <View style={styles.container}>
        <Form>
          <Item>
            <Label style={styles.inputItem}>
              FirstName
            </Label>
            <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            onChangeText={fname => this.setState({fname})}
            value={
              this.state.fname
            }
            />
          </Item>
          <Item>
            <Label style={styles.inputItem}>
              LastName
            </Label>
            <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            onChangeText={lastname => this.setState({lastname})}
            value={
              this.state.lastname
            }
            />
          </Item>
          <Item>
            <Label style={styles.inputItem}>
              Email
            </Label>
            <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            onChangeText={email => this.setState({email})}
            value={
              this.state.email
            }
            />
          </Item>
          <Item>
            <Label style={styles.inputItem}>
              PhoneNo
            </Label>
            <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            onChangeText={phone => this.setState({phone})}
            value={
              this.state.phone
            }
            />
          </Item>
          <Item>
            <Label style={styles.inputItem}>
              Address
            </Label>
            <Input
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="default"
            onChangeText={address => this.setState({address})}
            value={
              this.state.address
            }
            />
          </Item>
        </Form>
        <Button
        full
        rounded
        style={styles.button}
        onPress= {() => {
          this.updateContact(this.state.key)
        }}
        >
          <Text style={styles.buttonText} > Update</Text>
        </Button>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
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
  }
});

