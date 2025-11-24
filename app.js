 mean // Helper to generate a unique ID
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Get all events from localStorage
function getEvents() {
    const data = localStorage.getItem('eventAppData');
    return data ? JSON.parse(data).events : [];
}

// Save all events to localStorage
function saveEvents(events) {
    localStorage.setItem('eventAppData', JSON.stringify({ events: events }));
}

// Get a single event by its ID
function getEventById(eventId) {
    const events = getEvents();
    return events.find(event => event.id === eventId);
}

// Get attendees for a specific event
function getAttendees(eventId) {
    const event = getEventById(eventId);
    return event ? event.attendees : [];
}

// Save attendees for a specific event
function saveAttendees(eventId, attendees) {
    const events = getEvents();
    const eventIndex = events.findIndex(event => event.id === eventId);
    if (eventIndex !== -1) {
        events[eventIndex].attendees = attendees;
        saveEvents(events);
    }
}

function goHome() {
    window.location.href = 'events.html';
}