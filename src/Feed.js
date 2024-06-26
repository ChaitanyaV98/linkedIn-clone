import React, { useState, useEffect } from "react";
import "./Feed.css";
import CreateIcon from "@mui/icons-material/Create";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import InputOption from "./InputOption";
import Post from "./Post";
import { db,  } from "./firebase";
import { collection, getDocs, onSnapshot, addDoc, serverTimestamp,query, orderBy} from 'firebase/firestore';
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";

function Feed() {
    const user = useSelector(selectUser)
    const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     //realtime listener to firebase
//     db.collection("posts").onSnapshot((snapshot) =>
//       setPosts(
//         snapshot.docs.map((doc) => ({
//           id: doc.id,
//           data: doc.data(),
//         }))
//       )
//     );
//   }, []);

//   const sendPost = (e) => {
//     e.preventDefault();
//     db.collecion('posts').add({
//         name:"Chaitanya Vadthya",
//         description: "This is a test",
// message:input,
// photoUrl:"",
// timestamp: serverTimestamp()
//     })
//     setInput("")
//   };
useEffect(() => {
    //real time listener to the firestore posts collection
    //onSnapshot: Listens to changes in the posts collection and updates the posts state with the latest data
        // Create a Firestore query with ordering by timestamp in descending order
        const postsQuery = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(postsQuery, (snapshot) => 
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const sendPost = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "posts"), {
      name:user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl||"",
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} />
            <button onClick={sendPost} type="submit">
              Send
            </button>
          </form>
        </div>
        <div className="feed_inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Events" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>
      {/*posts*/}
      <FlipMove>
      {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
        <Post key={id} name={name} description={description} message={message} photoUrl={photoUrl} />
      ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
