import { collection, getDocs, addDoc, serverTimestamp, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore";
import { useEffect, useState} from "react";
import { useParams } from "react-router";
import { db } from "../firebaseConfig";
import { CommentCard } from "../components/CommentCard";

type Fight = {
  id: string;
  title: string;
  fighterA: string;
  fighterARecord: string;
  fighterB: string;
  fighterBRecord: string;
  commentsEnabled: boolean;
};

type Event = {
  eventId: string;
  name: string;
  date: Timestamp;
  status: string;
  fights: Fight[];
};

type Comment = {
  id: string;
  fightId: string;
  eventId: string;
  text: string;
  userName: string;
  createdAt: Timestamp;
};
export const FightPage: React.FC = () => {

    const { fightId } = useParams<{ fightId: string }>();
    console.log("🔥 fightId from URL:", fightId);

    const [fight, setFight] = useState<Fight | null>(null);
    const [event, setEvent] = useState<Event | null>(null);
    const [commentText, setCommentText] = useState("");
const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchFight = async () => {
            const eventsRef = collection(db, "events");
            const q = query(eventsRef, where("status", "==", "upcoming"));
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const data = snapshot.docs[0].data() as Event;
                const foundFight = data.fights.find((f) => f.id === fightId);
                setEvent(data);
                setFight(foundFight || null);
            }
        };

        fetchFight();
    }, [fightId]);
    
    
    useEffect(() => {
  if (!fightId) return;
    console.log("fightId frorm the URRL:", fightId);
  const commentsRef = collection(db, "comments");
  
  const q = query(commentsRef, where("fightId", "==", fightId), orderBy("createdAt", "asc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
   const fetched: Comment[] = snapshot.docs.map((doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    fightId: data.fightId,
    eventId: data.eventId,
    text: data.text,
    userName: data.userName,
    createdAt: data.createdAt,
  };
});
setComments(fetched);
  });

  return () => unsubscribe();
}, [fightId]);

    if (!fight) return <p className="text-white">Fight not found...</p>

     return (
    <div className="p-4 text-white mt-20 pb-40">
      <h1 className="text-3xl font-bold mb-2 text-center">{fight.title}</h1>
      <p className="mb-2 text-center">{event?.name}</p>
      <p className="mt-10 text-center text-2xl">{fight.fighterA} ({fight.fighterARecord}) <span className="offwhite">vs</span> {fight.fighterB} ({fight.fighterBRecord})</p>

      {/* Add comments section component here */}
      <div className="mt-12 max-w-xl mx-auto">
 


{/* post comment */}
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      if (!commentText.trim() || !fightId || !event?.eventId) return;

      await addDoc(collection(db, "comments"), {
        fightId,
        eventId: event.eventId,
        text: commentText.trim(),
        userName: "Anonymous", // Change later if using auth
        createdAt: serverTimestamp(),
      });

      setCommentText("");
    }}
    className="mb-6"
  >
    <textarea
      className="w-full p-3 rounded subdark text-white"
      rows={3}
      placeholder="Write your comment..."
      value={commentText}
      onChange={(e) => setCommentText(e.target.value)}
    />
    <button
      type="submit"
      className="mt-2 px-4 py-2 bg-white text-black font-semibold rounded"
    >
      Post
    </button>
  </form>


{/* comments map */}
  <div className="space-y-4 h-[500px] overflow-y-scroll custom-scroll">
     <h2 className="text-xl font-bold mb-4">Comments</h2>
    {comments.length === 0 && <p className="text-gray-400">No comments yet.</p>}

     {comments.map((c) => (
       <CommentCard key={c.id} userName={c.userName} text={c.text} />
    ))}
 
  </div>
</div>
    </div>
  );
}