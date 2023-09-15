import { Inter } from "next/font/google";
import { getFeaturedEvents } from "../../dummy-data";
import EventList from "@/components/events/eventList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const featuredEvents = getFeaturedEvents();

  return (
    <>
      <div>
        <EventList items={featuredEvents} />
      </div>
    </>
  );
}
