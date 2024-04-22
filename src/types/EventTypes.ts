export type EventPropsType = {
    eventId?: number,
    title: string,
    description: string,
    imageSrc?: string,
    basePrice?: number,
    quantityAvailable: number
}

export type Event = {
    eventId?: number;
    title: string;
    description: string;
    basePrice: number;
    quantityAvailable: number;
}


export type EventResponse = {
    success: boolean;
    data: any;
}


export interface EventState {
    events: Event[];
    fetchEvents: () => Promise<void>;
    getTicketPrice: (eventId: number, ticketType: string) => Promise<any>;
    addEvent: (eventData: Event) => Promise<void>;
    updateEvent: (eventId: number, eventData: Event) => Promise<void>;
    deleteEvent: (eventId: number) => Promise<void>;
}