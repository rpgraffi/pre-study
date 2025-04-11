import { Task } from "@/models/task_model";

export const tasks: Task[] = [
    { id: "001", title: "Aktueller Standort", description: "Parkring 19, Garching bei München", step: "get_vehicle_state:adress" },

    
    { id: "100", title: "Anzahl Routen", description: "3 Routen", step: "get_routes:destination" },
    { id: "101", title: "Auswahl", description: "Wähle erste Route", step: "get_routes:destination" },
    { id: "102", title: "Begründung", description: "Schnellste Route", step: "get_routes:destination" },
    { id: "103", title: "Begründung", description: "Kürzeste Route", step: "get_routes:destination" },

    { id: "104", title: "Ankuftszeit", description: "14:32", step: "get_routes:destination-route_1" },
    { id: "105", title: "Dauer", description: "1 Stunde 20 Minuten", step: "get_routes:destination-route_1" },
    { id: "106", title: "Entfernung", description: "224 km", step: "get_routes:destination-route_1" },
    { id: "107", title: "Straße", description: "über A99...", step: "get_routes:destination-route_1" },
    { id: "108", title: "Adresse", description: "Stuttgarterstr. 1a", step: "get_routes:destination-route_1" },
    
    
    { id: "200", title: "Anzahl Ladeorte", description: "2 Ergebnisse", step: "get_places:charging" },
    { id: "201", title: "Auswahl", description: "Wähle ersten Ladeplatz", step: "get_places:charging" },
    { id: "202", title: "Begründung", description: "Günstigster Ladeplatz", step: "get_places:charging" },
    
    { id: "204", title: "Ankuftszeit", description: "13:43", step: "get_places:charging-place_1" },
    { id: "205", title: "Preis", description: "60 cent pro kwh", step: "get_places:charging-place_1" },
    { id: "206", title: "Adresse", description: "Ladestr. 1a", step: "get_places:charging-place_1" },
    { id: "207", title: "Confirmation", description: "Selected", step: "get_places:charging-place_1" },
    { id: "208", title: "Name", description: "AC Mer Germany GmbH", step: "get_places:charging-place_1" },
    { id: "209", title: "Entfernung", description: "8 km", step: "get_places:charging-place_1" },
    { id: "210", title: "Straße", description: "über A99...", step: "get_places:charging-place_1" },
    { id: "211", title: "Fahrtdauer ", description: "13 Minuten", step: "get_places:charging-place_1" },
    { id: "212", title: "Umweg zum Laden", description: "5 minuten", step: "get_places:charging-place_1" },
    { id: "213", title: "Rating", description: "3.5 Sterne, 40 Bewertungen", step: "get_places:charging-place_1" },
    { id: "214", title: "Telefon", description: "0711 12345678", step: "get_places:charging-place_1" },
    { id: "215", title: "Ladesäulen", description: "12 Ladesäulen", step: "get_places:charging-place_1" },
    { id: "216", title: "Zahlungsoptionen", description: "Karte", step: "get_places:charging-place_1" },
    
    { id: "300", title: "Anzahl Routen", description: "1 Route", step: "get_routes:destination_with_charging" },
    { id: "301", title: "Auswahl", description: "Wähle erste Route", step: "get_routes:destination_with_charging" },

    { id: "304", title: "Ankuftszeit", description: "14:32", step: "get_routes:destination_with_charging-route_1" },
    { id: "305", title: "Dauer", description: "1 Stunde 20 Minuten", step: "get_routes:destination_with_charging-route_1" },
    { id: "306", title: "Entfernung", description: "224 km", step: "get_routes:destination_with_charging-route_1" },
    { id: "307", title: "Straße", description: "über A99...", step: "get_routes:destination_with_charging-route_1" },
    { id: "308", title: "Adresse", description: "Stuttgarterstr. 1a", step: "get_routes:destination_with_charging-route_1" },
    
    
    { id: "400", title: "Start Navigation", description: "Navigate...", step: "destination" },
];