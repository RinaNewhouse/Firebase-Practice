// Practice for Logging in and Out of Users

// Import to Allow for Hooks --> Such as The Really Common Ones of useState and useEffect
import React from 'react'

// Import to Allow for Style Changes of Elements Within This J.S. Page
import './App.css'

// Import To Allow for User Authentication and Database
import { auth, db } from './firebase/init'

// Allows You To Make and See Posts
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc } from "firebase/firestore"

// Import for Allowing Users To Sign Up, Log In, Log Out, and Remain Logged In Even After Reloading the Page
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"

// Function to Allow for Application to Run, Function, and Operate Smoothly and Without Problems (creo)
function App() {
  // Use States for Defining Users and Load State
  const [user, setUser] = React.useState({})
  const [loading, setLoading] = React.useState(true)

  // (C) *CREATE YOUR POST HERE*
  function createPost() {
    const post = {
      title: "Work Hard",
      description: "See Results",
      uid: user.uid,
    }
    addDoc(collection(db, "posts"), post)
  }

  // (R) *READ ALL POSTS HERE*
  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"))
    const posts = docs.map(elem => ({...elem.data(), id: elem.id}))
  }

  // --Read Post By ID Only
  async function getPostById(id) {
    const postRef = doc(db, "posts", id)
    const postSnap = await getDoc(postRef)
    return post = postSnap.data()
  }

  // --Read Post By Query Only
  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef)
    console.log(docs.map(doc => doc.data()))
  }

  // (U) *UPDATE POSTS HERE*
  async function updatePost() {
    const hardCodedId = "56L5VAiMKs53cYsWGhhf"
    const postRef = doc(db, "posts", hardCodedId)
    const post = await getPostById(hardcodedId)
    console.log(post)
    const updatedPost = {
      ...post,
      title: "Land a 300k job"
    }
    console.log(updatedPost)
    updateDoc(postRef, updatedPost)
  }

  // (D) *DELETE POSTS HERE*
  function deletePost() {
    const hardCodedId = "56L5VAiMKs53cYsWGhhf"
    const postRef = doc(db, "posts", hardCodedId)
    deleteDoc(postRef)
  }

  // Use Effect for Allowing Users to Remain Logged In Even After Reloading the Page
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      console.log(user)
      if (user) {
        setUser(user)
      }
    })
  }, [])

  // Function for Signing Up People
  function register() {
    console.log('register')
    createUserWithEmailAndPassword(auth, 'email@email.com', 'test123')
      .then((user) => {
        console.log(user)
      })
      .catch((error => {
        console.log(error)
      }))
  }

  // Function for Logging In People
  function login() {
    console.log('login')
    signInWithEmailAndPassword(auth, 'email@email.com', 'test123')
      .then(({user}) => {
        setUser(user)
      })
      .catch((error => {
        console.log(error)
      }))
  }

  // Function for Logging Out People
  function logout() {
    signOut(auth)
    setUser({})
  }

  // 1) Buttons
  // 2) If Still in Loading State, show it; If Not, Show Email
  return (
    <div className="App">
      <button onClick={register}>Sign Up</button>
      <button onClick={login}>Log In</button>
      <button onClick={logout}>Log Out</button>
      {loading ? 'loading...' : user.email}
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>All Posts</button>
      <button onClick={getPostById}>Get Post by ID</button>
      <button onClick={getPostByUid}>Get Post by UID</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

// Export to Allow for App to Run
export default App;
