import { Task } from "@/models/task_model";

export const tasks: Task[] = [
    { id: "01", title: "Aktueller Standort", description: "Parkring 19, Garching bei München", step: "vehicle" },

    
    { id: "02", title: "Ankuftszeit", description: "13:43", step: "charging" },
    { id: "03", title: "Preis", description: "60 cent pro kwh", step: "charging" },
    { id: "04", title: "Adresse", description: "Ladestr. 1a", step: "charging" },
    { id: "05", title: "Confirmation", description: "Selected", step: "charging" },
    { id: "06", title: "Name", description: "AC Mer Germany GmbH", step: "charging" },
    { id: "07", title: "Entfernung", description: "8 km", step: "charging" },
    { id: "08", title: "Straße", description: "über A99...", step: "charging" },
    { id: "09", title: "Fahrtdauer ", description: "13 Minuten", step: "charging" },
    { id: "10", title: "Umweg zum Laden", description: "5 minuten", step: "charging" },
    { id: "11", title: "Rating", description: "3.5 Sterne, 40 Bewertungen", step: "charging" },
    { id: "12", title: "Telefon", description: "0711 12345678", step: "charging" },
    { id: "13", title: "Ladesäulen", description: "12 Ladesäulen", step: "charging" },
    { id: "14", title: "Zahlungsoptionen", description: "Karte", step: "charging" },

    { id: "15", title: "Ankuftszeit", description: "14:32", step: "destination" },
    { id: "16", title: "Dauer", description: "1 Stunde 20 Minuten", step: "destination" },
    { id: "17", title: "Entfernung", description: "224 km", step: "destination" },
    { id: "18", title: "Straße", description: "über A99...", step: "destination" },
    { id: "19", title: "Adresse", description: "Stuttgarterstr. 1a", step: "destination" },

    { id: "20", title: "Start Navigation", description: "Navigate...", step: "destination" },
];