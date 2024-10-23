import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
<<<<<<< HEAD
import { collection, addDoc, onSnapshot } from 'firebase/firestore'; 
import { db, auth } from '../../firebaseConfig'; // Import Firestore and Auth config
=======
import { auth, db } from '../../firebaseConfig.js';  // Import Firestore db from firebaseConfig
import { collection, addDoc } from 'firebase/firestore';  // Import Firestore functions



>>>>>>> origin/AnikaSaveItemtoDB

export default function HomeScreen() {
  const [shoppingList, setShoppingList] = useState([]);  // State for shopping list
  const [newItem, setNewItem] = useState('');  // State for new item input
  const [newItemCategory, setNewItemCategory] = useState('');

<<<<<<< HEAD
  // Fetch real-time updates from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'groceryLists'), (snapshot) => {
      const lists = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setShoppingList(lists);
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  // Function to add a new item to Firestore
  const addItemToList = async () => {
    if (newItem.trim() === '') {
      Alert.alert('Error', 'Please enter an item');
      return;
    }

    try {
      // Add new item with all required fields to Firestore
      await addDoc(collection(db, 'groceryLists'), {
        itemName: newItem,
        addedBy: auth.currentUser.email,  // Assumes user is logged in
        isPurchased: false,
        addedDate: new Date(),
        houseCode: 'your-household-code',  // Replace with actual household code
        category: 'Groceries'  // Example category
      });
      setNewItem(''); // Clear the input
    } catch (error) {
      console.error("Error adding item to Firestore: ", error);
=======
  // Function to add a new item to the shopping list
  const addItemToList = async () => {
    if (newItem.trim() === '' || newItemCategory.trim() ==='') {
      Alert.alert('Error', 'Please enter an item and its category');
      return;
    }

    const newItemObj = { itemName: newItem, addedBy: 'insertUser', isPurchased: false, addedDate: Date.now().toString(), houseCodeCategory: newItemCategory };

    try {
      // Add the item to Firestore collection
      const docRef = await addDoc(collection(db, 'items'), newItemObj);



      // Update local state after successful Firestore addition
      setShoppingList([...shoppingList, { id: docRef.id, ...newItemObj }]);
      // Clear the input field
      setNewItem('');
      setNewItemCategory('');
    } catch (error) {
      Alert.alert('Error', 'Failed to add item. Please try again.');
      console.error(error);
>>>>>>> origin/AnikaSaveItemtoDB
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Add a new item..."
        value={newItem}
        onChangeText={setNewItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Add item category..."
        value={newItemCategory}
        onChangeText={setNewItemCategory}
      />

      <Button title="Add Item" onPress={addItemToList} />

      <FlatList
        data={shoppingList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
<<<<<<< HEAD
            <Text>{item.itemName} - {item.addedBy}</Text>
            <Text>{item.category}</Text>
=======
            <Text>{item.itemName}</Text>
            <Text>Category: {item.houseCodeCategory}</Text>
>>>>>>> origin/AnikaSaveItemtoDB
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
    marginBottom: 5,
    borderRadius: 4,
  },
});
