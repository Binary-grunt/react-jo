import { EventCard } from "./EventCard";
import imageTicket from '@/assets/images/GamesTicketOptions.svg'
import { useEventStore } from "@/stores/useEventStore";
import { useEffect } from "react";


export const EventContent: React.FC = () => {

    const { events, fetchEvents } = useEventStore(state => ({
        events: state.events,
        fetchEvents: state.fetchEvents,
    }));

    useEffect(() => {
        if (events.length === 0) {
            fetchEvents();
        }
    }, [fetchEvents, events.length]);

    return (
        <div className="container grid gap-8 md:py-4 px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8" >
                <div className="grid gap-1">
                    <h1 className="text-3xl font-bold tracking-tight">2024 Olympic Games</h1>
                    <p className="text-gray-500 dark:text-gray-400">Secure your tickets to the biggest event of the year.</p>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {events.map(event => (
                    <EventCard
                        key={event.eventId}
                        eventId={event.eventId}
                        title={event.title}
                        description={event.description}
                        imageSrc={imageTicket}
                        basePrice={event.basePrice}
                        quantityAvailable={event.quantityAvailable}
                    />
                ))}
            </div >
        </div>
    )
}