function getInitialData() {
    // IMPORTANT:
    // This is the master list of all events and tickets.
    // When you add a new event or ticket, you must add it here.
    // This data will be loaded into the application.

    const events = [
        {
            id: 'evt-powerfm-2024',
            name: 'Power FM Love Family Fun Day',
            date: '2024-08-10',
            time: '10:00 AM',
            venue: 'Harare Gardens',
            description: 'A fun day for the whole family with music, games, and food. Hosted by Power FM.'
        },
        // Add other events here
        // {
        //     id: 'evt-another-event-2024',
        //     name: 'Another Event',
        //     date: '2024-09-15',
        //     time: '06:00 PM',
        //     venue: 'Some Other Place',
        //     description: 'Description for another event.'
        // }
    ];

    const tickets = [
        {
            id: 'tkt-001-powerfm',
            eventId: 'evt-powerfm-2024',
            names: ['John Doe'],
            checkedIn: false
        },
        {
            id: 'tkt-002-powerfm',
            eventId: 'evt-powerfm-2024',
            names: ['Jane Smith', 'Peter Pan'],
            checkedIn: true
        },
        // Add other tickets for any event here
        // {
        //     id: 'tkt-001-another',
        //     eventId: 'evt-another-event-2024',
        //     names: ['Alice'],
        //     checkedIn: false
        // }
    ];

    return { events, tickets };
}

// This function will check if data exists in localStorage and load it from the initial data if not.
function initializeData() {
    if (!localStorage.getItem('events') || !localStorage.getItem('tickets')) {
        const { events, tickets } = getInitialData();
        localStorage.setItem('events', JSON.stringify(events));
        localStorage.setItem('tickets', JSON.stringify(tickets));
    }
}