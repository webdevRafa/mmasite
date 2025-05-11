import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Timestamp } from "firebase/firestore";


type Event = {
    eventId: string;
    name: string;
    date: Timestamp;
    status: "upcoming" | "live" | "past";
    fights: Fight[];
};

type Fight = {
    id: string;
    title: string;
    fighterA: string;
    fighterARecord: string;
    fighterB: string;
    fighterBRecord: string;
    commentsEnabled: boolean;
};

export const UpcomingEvent: React.FC = () => {
    const [event, setEvent] = useState<Event | null>(null);
    useEffect(() => {
        const fetchEvent = async () => {
            const eventsRef = collection(db, "events");
            const q = query(eventsRef, where("status", "==", "upcoming"));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                const data = snapshot.docs[0].data() as Event;
                setEvent(data);
            }
        };

        fetchEvent();
    }, []);

    if (!event) return <p>Loading...</p>;

    return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
      <p className="text-gray-500 mb-10">{event.date.toDate().toDateString()}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {event.fights.map((fight) => (
          <div
            key={fight.id}
            className="p-4 subdarker cursor-pointer"
            onClick={() => window.location.href = `/fight/${fight.id}`}
          >
            <p className="font-semibold text-2xl">{fight.title}</p>
            <p>{fight.fighterA} ({fight.fighterARecord}) vs {fight.fighterB} ({fight.fighterBRecord})</p>
          </div>
        ))}
      </div>
    </div>
  );
}