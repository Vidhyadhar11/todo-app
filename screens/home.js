import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Keyboard, Pressable } from 'react-native'
import { firebase } from '../config';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const todoRef = firebase.firestore().collection('todos');
    const [addData, setaddData] = useState('');
    const navigation = useNavigation();

    //fetch or read the data from firestore
    useEffect(() => {
        todoRef
        .orderBy('createdAt', 'desc')
        .onSnapshot(
            querySnapshot => {
                const todos =[]
                querySnapshot.forEach((doc) => {
                    const {heading} = doc.data()
                    todos.push({
                        id: doc.id,
                        heading,
                    })
                })
                setTodos(todos)
            }
        )
    }, [])

    //delete a todo from firestore db
    const deleteTodo = (todos) => {
        todoRef
        .doc(todos.id)
        .delete()
        .then(() => {
            //show a sucessful alert
            alert("Deleted Sucessfully")
        })
        .catch(error => {
            alert(error);
        })
    }

    //add a todo
    const addTodo = () => {
        //check if we have a todo
        if (addData && addData.length > 0){
            //get the timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                heading: addData,
                createAt: timestamp
            };
            todoRef
            .add(data)
            .then(() => {
                setaddData('');
                //release keyboard
                Keyboard.dismiss();
            })
            .catch(error => {
                alert(error);
            })
        } 
    }

    return (  
        <View style = {{flex:1}}>
            <View style= {styles.formContainer}>
                <TextInput 
                style= {styles.input}
                placeholder='Add A New Todo'
                placeholderTextColor='#3a3a3a'
                onChangeText={(heading ) => setaddData(heading)}
                value={addData}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                />
                <TouchableOpacity style= {styles.button} onPress={addTodo}>
                    <Text style= {styles.buttonText}>Add</Text>    
                </TouchableOpacity>          
            </View>
            <FlatList 
                data = {todos}
                numColumns ={1}
                renderItem = {({item}) => (
                    <View>
                        <Pressable
                        style= {styles.container}
                        onPress= {() => navigation.navigate('Detail', {item})}
                        >
                             <FontAwesome 
                                name= 'trash-o'
                                color='red'
                                onPress= {() => deleteTodo(item)}
                                style={styles.todoIcon}
                             /> 
                             <View style= {styles.innerContainer}>
                                <Text style= {styles.itemHeading}>
                                    {item.heading[0].toUpperCase() + item.heading.slice(1)}
                                </Text>
                            </View> 
                        
                        </Pressable>
                    
                    </View>
                )}
            />
        </View>
    )
    
}
export default Home

const styles =StyleSheet.create({
    container:{
        backgroundColor: '#d9d9d9',
        padding: 10,
        borderRadius: 15,
        margin: 5,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    innerContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        marginLeft: 45,
    },
    itemHeading: {
        fontWeight: 'bold',
        fontSize: 18,
        marginRight: 22
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 100,
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f29d7e',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5,
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#bdacc3',
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#3a3a3a',
        fontSize: 20
    },
    todoIcon: {
        marginTop: 5,
        fontSize: 20,
        marginLeft: 14,
    },

})