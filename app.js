// Helper to generate a unique ID
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Get all events from localStorage
function getEvents() {
    const events = localStorage.getItem('events');
    return events ? JSON.parse(events) : [];
}

// Save all events to localStorage
function saveEvents(events) {
    localStorage.setItem('events', JSON.stringify(events));
}

// Get a single event by its ID
function getEventById(eventId) {
    const events = getEvents();
    return events.find(event => event.id === eventId);
}

// Get tickets for a specific event (alias for getAttendees)
function getTicketsForEvent(eventId) {
    const allTickets = getAllTickets();
    return allTickets.filter(ticket => ticket.eventId === eventId);
}

// Helper to get all tickets from localStorage
function getAllTickets() {
    const tickets = localStorage.getItem('tickets');
    return tickets ? JSON.parse(tickets) : [];
}

// Helper to save all tickets to localStorage
function saveAllTickets(tickets) {
    localStorage.setItem('tickets', JSON.stringify(tickets));
}

// Get attendees for a specific event (now an alias for getTicketsForEvent)
function getAttendees(eventId) {
    return getTicketsForEvent(eventId);
}

// Save a new attendee/ticket.
function saveAttendee(eventId, newAttendee) {
    const allTickets = getAllTickets();
    // Add eventId to the new attendee object to link it
    newAttendee.eventId = eventId;
    allTickets.push(newAttendee);
    saveAllTickets(allTickets);
}

function goHome() {
    window.location.href = 'events.html';
}

// Function to clear all registered tickets and reset to initial data
function resetTicketData() {
    // Remove the current tickets from localStorage
    localStorage.removeItem('tickets');
    // Re-initialize data from events-data.js
    const { tickets } = getInitialData();
    localStorage.setItem('tickets', JSON.stringify(tickets));
}

// Function to clear all tickets and log out
function clearAllTickets() {
    if (confirm('Are you sure you want to delete ALL ticket data? This will also log you out.')) {
        localStorage.removeItem('tickets');
        sessionStorage.removeItem('isLoggedIn');
        window.location.reload(); // Reload to show the login screen
    }
}