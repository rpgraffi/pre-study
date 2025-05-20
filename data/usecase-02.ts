import { Task } from "@/models/task_model";

export const tasks: Task[] = [
    { id: "001", title: "Aktueller Standort", description: "Parkring 19, Garching bei München", step: "get_vehicle_state:adress" },


    { id: "100", title: "Suche Kontakt", description: "", step: "get_contact:name" },
    { id: "101", title: "Anzahl Kontakte", description: "3 Kontakte", step: "get_contact:name" },
    { id: "102", title: "Begründung Kontakt Auswahl", description: "Höchste Übereinstimmung", step: "get_contact:name" },
    { id: "103", title: "Name", description: "Susanne Brommer", step: "get_contact:name" },
    { id: "104", title: "Email", description: "susanne.brommer@bmw.de", step: "get_contact:name" },
    


    { id: "200", title: "Suche E-Mail Content", description: "", step: "search_email_content:email-search" },
    { id: "201", title: "Suchbegriffe", description: "Adresse, Straße, Standort", step: "search_email_content:email-search" },
    { id: "202", title: "Ergebnis", description: "Zimmerstr. 1a, Ulm", step: "search_email_content:email-search" },
    { id: "203", title: "Begründung Adresse", description: "Höchste Übereinstimmung", step: "search_email_content:email-search" },

    

    { id: "300", title: "Plane Routen", description: "", step: "get_routes:destination" },
    { id: "301", title: "Anzahl Routen", description: "3 Routen", step: "get_routes:destination" },
    { id: "302", title: "Begründung Routen Auswahl", description: "Schnellste Route", step: "get_routes:destination" },

    { id: "303", title: "Ankuftszeit (ohne Zwischenstopp)", description: "14:32", step: "get_routes:destination-route_1" },
    { id: "304", title: "Dauer (ohne Zwischenstopp)", description: "1 Stunde 5 Minuten", step: "get_routes:destination-route_1" },
    { id: "305", title: "Entfernung", description: "224 km", step: "get_routes:destination-route_1" },
    { id: "306", title: "Straße", description: "über A99...", step: "get_routes:destination-route_1" },
    { id: "307", title: "Adresse", description: "Stuttgarterstr. 1a", step: "get_routes:destination-route_1" },
    


    { id: "400", title: "Berechne mögliche Distanz", description: "mit 20% Restkapazität", step: "calculate_distance:destination-route_1" },
    { id: "401", title: "Distanz", description: "100 km", step: "calculate_distance:destination-route_1" },
    { id: "402", title: "Begründung", description: "mit 20% Restkapazität", step: "calculate_distance:destination-route_1" },

    

    { id: "500", title: "Suche Ladestation", description: "", step: "get_places:charging-place_1" },
    { id: "501", title: "Ankuftszeit", description: "13:43", step: "get_places:charging-place_1" },
    { id: "505", title: "Name", description: "AC Mer Germany GmbH", step: "get_places:charging-place_1" },
    { id: "502", title: "Preis", description: "60 cent pro kwh", step: "get_places:charging-place_1" },
    { id: "503", title: "Adresse", description: "Ladestr. 1a", step: "get_places:charging-place_1" },
    { id: "504", title: "Bestätigen", description: "Ausgewählt", step: "get_places:charging-place_1" },
    { id: "506", title: "Entfernung", description: "99 km", step: "get_places:charging-place_1" },
    { id: "507", title: "Straße", description: "über A99...", step: "get_places:charging-place_1" },
    { id: "508", title: "Fahrtdauer bis Ladestation", description: "13 Minuten", step: "get_places:charging-place_1" },
    { id: "509", title: "Umweg zum Laden", description: "5 minuten", step: "get_places:charging-place_1" },
    { id: "510", title: "Rating", description: "3.5 Sterne, 40 Bewertungen", step: "get_places:charging-place_1" },
    { id: "511", title: "Telefon", description: "0711 12345678", step: "get_places:charging-place_1" },
    { id: "512", title: "Ladesäulen", description: "12 Ladesäulen", step: "get_places:charging-place_1" },
    { id: "513", title: "Zahlungsoptionen", description: "Karte", step: "get_places:charging-place_1" },



    { id: "600", title: "Ankuftszeit Ziel", description: "14:37", step: "get_routes:destination_with_fastfood-route_1" },
    { id: "601", title: "Dauer bis Ziel", description: "1 Stunde 20 Minuten", step: "get_routes:destination_with_fastfood-route_1" },
    { id: "602", title: "Entfernung bis Ziel", description: "224 km", step: "get_routes:destination_with_fastfood-route_1" },
    { id: "603", title: "Ziel-Straße", description: "über A99...", step: "get_routes:destination_with_fastfood-route_1" },
    { id: "604", title: "Ziel-Adresse", description: "Zimmerstr. 1a, Ulm", step: "get_routes:destination_with_fastfood-route_1" },
    { id: "605", title: "Start Navigation", description: "Starte Navigation...", step: "destination" },
    
    
    
];