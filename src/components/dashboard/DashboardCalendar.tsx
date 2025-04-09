import {useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {BookOpen, Calendar as CalendarIcon, Clock, MapPin, Plus, Users} from "lucide-react";
import {format} from "date-fns";
import {fr} from "date-fns/locale";
import AnimatedSection from "@/components/AnimatedSection";
import {toast} from "sonner";

// Sample data for events
const events = [
  {
    id: 1,
    title: "Introduction au management",
    date: new Date(2023, 5, 15), // June 15, 2023
    time: "09:00 - 12:00",
    location: "Salle A",
    participants: 10,
    type: "formation"
  },
  {
    id: 2,
    title: "Excel avancé - Session 1",
    date: new Date(2023, 5, 22), // June 22, 2023
    time: "14:00 - 17:00",
    location: "Salle B",
    participants: 8,
    type: "formation"
  },
  {
    id: 3,
    title: "Réunion d'équipe",
    date: new Date(2023, 5, 18), // June 18, 2023
    time: "10:00 - 11:30",
    location: "Salle de conférence",
    participants: 5,
    type: "meeting"
  },
  {
    id: 4,
    title: "Communication professionnelle",
    date: new Date(2023, 5, 20), // June 20, 2023
    time: "09:00 - 17:00",
    location: "Salle C",
    participants: 12,
    type: "formation"
  },
  {
    id: 5,
    title: "Revue de projet",
    date: new Date(2023, 5, 25), // June 25, 2023
    time: "11:00 - 12:00",
    location: "Salle de réunion",
    participants: 4,
    type: "meeting"
  }
];

// Function to check if a date has events
const hasEvents = (date: Date) => {
  return events.some(event => 
    date.getDate() === event.date.getDate() && 
    date.getMonth() === event.date.getMonth() && 
    date.getFullYear() === event.date.getFullYear()
  );
};

// Function to get events for a date
const getEventsForDate = (date: Date) => {
  return events.filter(event => 
    date.getDate() === event.date.getDate() && 
    date.getMonth() === event.date.getMonth() && 
    date.getFullYear() === event.date.getFullYear()
  );
};

const DashboardCalendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };
  
  const eventsForSelectedDate = getEventsForDate(selectedDate);
  
  const handleCreateEvent = () => {
    toast.info("Cette fonctionnalité sera disponible prochainement", {
      description: "La création d'événement n'est pas implémentée dans cette démo"
    });
  };

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Calendrier</h1>
            <p className="text-muted-foreground">Gérez vos sessions de formation et événements</p>
          </div>
          <Button onClick={handleCreateEvent}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel événement
          </Button>
        </div>
      </AnimatedSection>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <AnimatedSection delay={100} className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Calendrier</CardTitle>
              <div className="flex items-center">
                <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>
                  Aujourd'hui
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-3">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  month={date}
                  onMonthChange={setDate}
                  className="p-3 pointer-events-auto mx-auto"
                  locale={fr}
                  modifiers={{
                    hasEvent: hasEvents,
                  }}
                  modifiersClassNames={{
                    hasEvent: "bg-primary/20 font-bold",
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
        
        <AnimatedSection delay={200}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Événements</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {format(selectedDate, "dd MMMM yyyy", { locale: fr })}
                </span>
              </CardTitle>
              <CardDescription>
                {eventsForSelectedDate.length === 0
                  ? "Aucun événement pour cette date"
                  : `${eventsForSelectedDate.length} événement${eventsForSelectedDate.length > 1 ? "s" : ""}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventsForSelectedDate.length === 0 ? (
                  <div className="flex h-40 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center text-muted-foreground">
                    <CalendarIcon className="mb-2 h-10 w-10 opacity-30" />
                    <p>Aucun événement pour cette date</p>
                    <p className="text-sm">Cliquez sur "Nouvel événement" pour en créer un</p>
                  </div>
                ) : (
                  eventsForSelectedDate.map((event) => (
                    <div 
                      key={event.id} 
                      className={`rounded-md border p-4 ${
                        event.type === 'formation' 
                          ? 'border-l-4 border-l-primary' 
                          : 'border-l-4 border-l-blue-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{event.title}</h3>
                        <span className={`rounded-full px-2 py-1 text-xs ${
                          event.type === 'formation' 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {event.type === 'formation' ? 'Formation' : 'Réunion'}
                        </span>
                      </div>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          {event.participants} participant{event.participants > 1 ? "s" : ""}
                        </div>
                        {event.type === 'formation' && (
                          <div className="flex items-center">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Détails de la formation
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default DashboardCalendar;
