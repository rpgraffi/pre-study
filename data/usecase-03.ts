import { Task } from "@/models/task_model";

export const tasks: Task[] = [
    { id: "001", title: "Aktueller Standort", description: "Parkring 19, Garching bei München", step: "get_vehicle_state:adress" },



    { id: "100", title: "Suche im Kalender", description: "Nächster Termin", step: "get_calendar:next_event" },
    { id: "101", title: "Begründung", description: "Nächster Termin", step: "get_calendar:next_event" },
    { id: "102", title: "Name", description: "Konzert Beethoven", step: "get_calendar:next_event" },
    { id: "103", title: "Ort", description: "Kein Ort angegeben", step: "get_calendar:next_event" },
    { id: "104", title: "Details (Link)", description: "https://www.konzert.de/beethoven", step: "get_calendar:next_event" },
    


    { id: "200", title: "Websuche", description: "Link zum Konzert aus Kalender", step: "search_web_content:web-search" },
    { id: "201", title: "Suchbegriffe", description: "Link", step: "search_web_content:web-search" },
    { id: "202", title: "Ergebnis", description: "Zimmerstr. 1a, Ulm", step: "search_web_content:web-search" },
    


    { id: "300", title: "Plane Routen", description: "", step: "get_routes:destination" },
    { id: "301", title: "Anzahl Routen", description: "3 Routen", step: "get_routes:destination" },
    { id: "302", title: "Begründung", description: "Schnellste Route", step: "get_routes:destination" },
    { id: "303", title: "Begründung", description: "Kürzeste Route", step: "get_routes:destination" },

    { id: "304", title: "Ankuftszeit (ohne Zwischenstopp)", description: "14:32", step: "get_routes:destination-route_1" },
    { id: "305", title: "Dauer (ohne Zwischenstopp)", description: "1 Stunde 20 Minuten", step: "get_routes:destination-route_1" },
    { id: "306", title: "Entfernung", description: "224 km", step: "get_routes:destination-route_1" },
    { id: "307", title: "Straße", description: "über A99...", step: "get_routes:destination-route_1" },
    { id: "308", title: "Adresse", description: "Stuttgarterstr. 1a", step: "get_routes:destination-route_1" },
    

    
    { id: "400", title: "Berechne mögliche Distanz", description: "mit 20% Restkapazität", step: "calculate_distance:destination-route_1" },
    { id: "401", title: "Distanz", description: "100 km", step: "calculate_distance:destination-route_1" },
    { id: "402", title: "Begründung", description: "mit 20% Restkapazität", step: "calculate_distance:destination-route_1" },
    


    { id: "500", title: "Suche Ladestation", description: "mit Restaurant", step: "search_places:charging-place_1" },
    { id: "501", title: "Suche", description: "Bei 100km Entfernung", step: "search_places:charging-place_1" },
    { id: "502", title: "Suche", description: "Bei 20% Restkapazität", step: "search_places:charging-place_1" },

    { id: "503", title: "Gefunden Ladestation", description: "mit Restaurant", step: "get_places:charging-place_with_restaurant_1" },
    { id: "504", title: "Restaurant Name", description: "Restaurante Italiano", step: "get_places:charging-place_with_restaurant_1" },
    { id: "505", title: "Restaurant Art", description: "Italienisch", step: "get_places:charging-place_with_restaurant_1" },
    { id: "506", title: "Restaurant Bewertung", description: "4.5 Sterne", step: "get_places:charging-place_with_restaurant_1" },
    { id: "507", title: "Restaurant Preis", description: "€€", step: "get_places:charging-place_with_restaurant_1" },

    { id: "512", title: "Name", description: "AC Mer Germany GmbH", step: "get_places:charging-place_1" },
    { id: "508", title: "Ankuftszeit", description: "13:43", step: "get_places:charging-place_1" },
    { id: "509", title: "Preis", description: "60 cent pro kwh", step: "get_places:charging-place_1" },
    { id: "510", title: "Adresse", description: "Ladestr. 1a", step: "get_places:charging-place_1" },
    { id: "511", title: "Bestätigen", description: "Ausgewählt", step: "get_places:charging-place_1" },
    { id: "513", title: "Entfernung", description: "8 km", step: "get_places:charging-place_1" },
    { id: "514", title: "Straße", description: "über A99...", step: "get_places:charging-place_1" },
    { id: "515", title: "Fahrtdauer bis Ladestation", description: "13 Minuten", step: "get_places:charging-place_1" },
    { id: "516", title: "Umweg zum Laden", description: "5 minuten", step: "get_places:charging-place_1" },
    { id: "517", title: "Rating", description: "3.5 Sterne, 40 Bewertungen", step: "get_places:charging-place_1" },
    { id: "518", title: "Telefon", description: "0711 12345678", step: "get_places:charging-place_1" },
    { id: "519", title: "Ladesäulen", description: "12 Ladesäulen", step: "get_places:charging-place_1" },
    { id: "520", title: "Zahlungsoptionen", description: "Karte", step: "get_places:charging-place_1" },



    { id: "600", title: "Ankuftszeit Ziel", description: "14:37", step: "get_routes:destination_with_fastfood-route_1" },
    { id: "601", title: "Dauer bis Ziel", description: "1 Stunde 20 Minuten", step: "get_routes:destination_with_fastfood-route_1" },
    { id: "602", title: "Entfernung bis Ziel", description: "224 km", step: "get_routes:destination_with_fastfood-route_1" },
    { id: "603", title: "Ziel-Straße", description: "über A99...", step: "get_routes:destination_with_fastfood-route_1" },
    { id: "604", title: "Ziel-Adresse", description: "Stuttgarterstr. 1a", step: "get_routes:destination_with_fastfood-route_1" },
    { id: "605", title: "Start Navigation", description: "Starte Navigation...", step: "destination" },
    
    
]; 