import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface Event {
    id: string;
    title: string;
    date: Date;
    color: string;
    type: 'event' | 'deadline' | 'holiday';
}

const EVENTS: Event[] = [
    { id: '1', title: 'Doctreen Internship Ends', date: new Date(2025, 4, 31), color: 'bg-blue-500', type: 'deadline' },
    { id: '2', title: 'B.Tech Graduation', date: new Date(2025, 7, 15), color: 'bg-green-500', type: 'event' },
    { id: '3', title: 'ACM Meeting', date: new Date(2025, 0, 15), color: 'bg-purple-500', type: 'event' },
    { id: '4', title: 'Project Deadline', date: new Date(2025, 0, 20), color: 'bg-red-500', type: 'deadline' },
    { id: '5', title: 'Republic Day', date: new Date(2025, 0, 26), color: 'bg-orange-500', type: 'holiday' },
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showEventDetails, setShowEventDetails] = useState(false);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const goToToday = () => {
        setCurrentDate(new Date());
        setSelectedDate(new Date());
    };

    const isToday = (day: number) => {
        const today = new Date();
        return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
    };

    const isSelected = (day: number) => {
        if (!selectedDate) return false;
        return day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear();
    };

    const getEventsForDay = (day: number) => {
        return EVENTS.filter(event => {
            const eventDate = event.date;
            return eventDate.getDate() === day &&
                eventDate.getMonth() === month &&
                eventDate.getFullYear() === year;
        });
    };

    const selectedDateEvents = selectedDate
        ? EVENTS.filter(event => {
            const eventDate = event.date;
            return eventDate.getDate() === selectedDate.getDate() &&
                eventDate.getMonth() === selectedDate.getMonth() &&
                eventDate.getFullYear() === selectedDate.getFullYear();
        })
        : [];

    // Build calendar grid
    const calendarDays: (number | null)[] = [];

    // Previous month's days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        calendarDays.push(null); // We'll show empty or prev month
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push(i);
    }

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setShowEventDetails(true);
    };

    return (
        <div className="w-full h-full bg-white flex relative overflow-hidden">
            {/* Sidebar Toggle (Mobile) */}
            <div className="md:hidden absolute top-4 left-4 z-30">
                <button
                    onClick={() => setShowSidebar(true)}
                    className="p-2 bg-gray-100 rounded-lg text-gray-600 shadow-sm"
                    aria-label="Open sidebar"
                >
                    <ChevronRight className={showSidebar ? 'rotate-180' : ''} size={20} />
                </button>
            </div>

            {/* Sidebar Overlay */}
            {showSidebar && (
                <div className="absolute inset-0 bg-black/20 z-40 md:hidden" onClick={() => setShowSidebar(false)} />
            )}

            {/* Sidebar */}
            <div className={`
                absolute md:static top-0 left-0 h-full w-64 bg-gray-50 border-r border-gray-200 p-4 flex flex-col z-50 transform transition-transform duration-300 shadow-xl md:shadow-none
                ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="flex justify-between items-center mb-4 md:hidden">
                    <span className="font-bold text-lg">Calendar</span>
                    <button onClick={() => setShowSidebar(false)} className="p-1" aria-label="Close sidebar"><ChevronLeft size={20} /></button>
                </div>

                <button
                    onClick={goToToday}
                    className="w-full mb-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                >
                    Today
                </button>

                {/* Mini Calendar */}
                <div className="mb-6">
                    <div className="text-sm font-semibold text-gray-600 mb-2">
                        {MONTHS[month]} {year}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="flex-1 overflow-y-auto">
                    <h3 className="font-semibold text-gray-800 mb-3">Upcoming Events</h3>
                    <div className="space-y-2">
                        {EVENTS.slice(0, 5).map(event => (
                            <div key={event.id} className="flex items-center gap-2 text-sm">
                                <div className={`w-2 h-2 rounded-full ${event.color}`} />
                                <div className="flex-1 truncate">{event.title}</div>
                                <div className="text-xs text-gray-400">
                                    {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Calendar Types */}
                <div className="pt-4 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-2 text-sm">Calendars</h3>
                    <div className="space-y-1 text-sm">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            Personal
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            Work
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="w-2 h-2 rounded-full bg-orange-500" />
                            Holidays
                        </label>
                    </div>
                </div>
            </div>

            {/* Main Calendar */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-gray-200 pl-16 md:pl-6">
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button onClick={prevMonth} className="p-2 hover:bg-white rounded-md shadow-sm transition-all" aria-label="Previous month">
                                <ChevronLeft size={18} />
                            </button>
                            <button onClick={nextMonth} className="p-2 hover:bg-white rounded-md shadow-sm transition-all" aria-label="Next month">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                        <h2 className="text-lg md:text-xl font-semibold truncate">
                            {MONTHS[month]} {year}
                        </h2>
                    </div>
                    <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm md:text-base whitespace-nowrap" aria-label="Add event">
                        <Plus size={18} />
                        <span className="hidden md:inline">Add Event</span>
                    </button>
                </div>

                {/* Days Header */}
                <div className="grid grid-cols-7 border-b border-gray-200">
                    {DAYS.map(day => (
                        <div key={day} className="py-2 md:py-3 text-center text-xs md:text-sm font-medium text-gray-500">
                            {day.slice(0, 3)}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="flex-1 grid grid-cols-7 auto-rows-fr overflow-y-auto">
                    {calendarDays.map((day, index) => {
                        const dayEvents = day ? getEventsForDay(day) : [];
                        return (
                            <div
                                key={index}
                                className={`border-b border-r border-gray-100 p-1 min-h-[60px] md:min-h-[80px] cursor-pointer hover:bg-gray-50 transition-colors ${day === null ? 'bg-gray-50' : ''
                                    }`}
                                onClick={() => day && handleDateSelect(new Date(year, month, day))}
                            >
                                {day && (
                                    <>
                                        <div className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full text-xs md:text-sm font-medium mb-1 ${isToday(day)
                                            ? 'bg-red-500 text-white'
                                            : isSelected(day)
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'text-gray-700'
                                            }`}>
                                            {day}
                                        </div>
                                        <div className="space-y-0.5">
                                            {dayEvents.slice(0, 2).map(event => (
                                                <div
                                                    key={event.id}
                                                    className={`text-[10px] px-1 py-0.5 rounded truncate text-white ${event.color} hidden md:block`}
                                                >
                                                    {event.title}
                                                </div>
                                            ))}
                                            <div className="flex gap-1 flex-wrap md:hidden">
                                                {dayEvents.map(event => (
                                                    <div key={event.id} className={`w-1.5 h-1.5 rounded-full ${event.color}`} />
                                                ))}
                                            </div>
                                            {dayEvents.length > 2 && (
                                                <div className="text-[10px] text-gray-400 px-1 hidden md:block">
                                                    +{dayEvents.length - 2} more
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Event Details Sidebar / Overlay */}
            {selectedDate && (
                <>
                    {/* Mobile Overlay Background */}
                    <div className={`fixed inset-0 bg-black/20 z-40 md:hidden ${showEventDetails ? 'block' : 'hidden'}`} onClick={() => setShowEventDetails(false)} />

                    <div className={`
                    absolute md:static top-0 right-0 h-full w-72 md:w-72 bg-gray-50 border-l border-gray-200 p-4 z-50 transform transition-transform duration-300 shadow-xl md:shadow-none
                    ${showEventDetails ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
                `}>
                        <div className="flex justify-between items-center mb-4 md:hidden">
                            <h3 className="font-semibold text-lg">Details</h3>
                            <button onClick={() => setShowEventDetails(false)} className="p-1 bg-gray-200 rounded-full" aria-label="Close details"><ChevronRight size={18} /></button>
                        </div>

                        <h3 className="font-semibold text-lg mb-2 hidden md:block">
                            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </h3>
                        <h3 className="font-semibold text-lg mb-4 md:hidden">
                            {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </h3>

                        {selectedDateEvents.length > 0 ? (
                            <div className="space-y-3">
                                {selectedDateEvents.map(event => (
                                    <div key={event.id} className="bg-white rounded-lg p-3 shadow-sm border">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${event.color}`} />
                                            <span className="font-medium">{event.title}</span>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1 capitalize">{event.type}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No events scheduled</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
