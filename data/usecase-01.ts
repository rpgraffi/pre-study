import { Task } from "@/models/task_model";

export const tasks: Task[] = [
    { id: "001", title: "Aktueller Standort", description: "Parkring 19, Garching bei München", step: "get_vehicle_state:adress" },

    { id: "100", title: "Plane Routen", description: "", step: "get_routes:destination" },
    { id: "101", title: "Anzahl Routen", description: "3 Routen", step: "get_routes:destination" },
    { id: "102", title: "Auswahl", description: "Wähle erste Route", step: "get_routes:destination" },
    { id: "103", title: "Begründung", description: "Schnellste Route", step: "get_routes:destination" },
    
    { id: "104", title: "Ankuftszeit (ohne Stopp)", description: "14:32", step: "get_routes:destination-route_1" },
    { id: "105", title: "Dauer (ohne Stopp)", description: "1 Stunde 20 Minuten", step: "get_routes:destination-route_1" },
    { id: "106", title: "Entfernung", description: "224 km", step: "get_routes:destination-route_1" },
    { id: "107", title: "Straße", description: "über A99...", step: "get_routes:destination-route_1" },
    { id: "108", title: "Adresse", description: "Stuttgarterstr. 1a", step: "get_routes:destination-route_1" },
    


    { id: "200", title: "Suche Restaurant", description: "", step: "get_places:fastfood" },
    { id: "201", title: "Info", description: "Entlang der Route", step: "get_places:fastfood" },
    { id: "202", title: "Orte gefunden", description: "3 Ergebnisse", step: "get_places:fastfood" },
    { id: "203", title: "Begründung", description: "Einziger McDonalds", step: "get_places:fastfood" },
    
    { id: "208", title: "Name", description: "McDonalds", step: "get_places:fastfood-place_1" },
    { id: "205", title: "Ankuftszeit beim Restaurant", description: "13:43", step: "get_places:fastfood-place_1" },
    { id: "206", title: "Adresse", description: "Kreuzstr. 1a", step: "get_places:fastfood-place_1" },
    { id: "209", title: "Entfernung", description: "8 km", step: "get_places:fastfood-place_1" },
    { id: "210", title: "Straße", description: "über A99...", step: "get_places:fastfood-place_1" },
    { id: "211", title: "Fahrtdauer zum Restaurant", description: "13 Minuten", step: "get_places:fastfood-place_1" },
    { id: "212", title: "Umweg zum Restaurant", description: "5 minuten", step: "get_places:fastfood-place_1" },
    { id: "213", title: "Bewertung", description: "3.5 Sterne, 40 Bewertungen", step: "get_places:fastfood-place_1" },
    { id: "214", title: "Telefon", description: "0711 12345678", step: "get_places:fastfood-place_1" },



    { id: "304", title: "Ankuftszeit Ziel", description: "14:37", step: "get_routes:destination_with_fastfood-route_1" },
    { id: "305", title: "Dauer bis Ziel", description: "1 Stunde 20 Minuten", step: "get_routes:destination_with_fastfood-route_1" },
    { id: "306", title: "Entfernung bis Ziel", description: "224 km", step: "get_routes:destination_with_fastfood-route_1" },
    { id: "307", title: "Ziel-Straße", description: "über A99...", step: "get_routes:destination_with_fastfood-route_1" },
    { id: "308", title: "Ziel-Adresse", description: "Stuttgarterstr. 1a", step: "get_routes:destination_with_fastfood-route_1" },
    { id: "309", title: "Start Navigation", description: "Starte Navigation...", step: "destination" },
    
    
];