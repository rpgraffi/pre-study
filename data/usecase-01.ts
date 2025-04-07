import { Task } from "@/models/task_model";

export const tasks: Task[] = [
    { id: "01", title: "Ankuftszeit Ladestation", description: "13:43", step: "charging" },
    { id: "02", title: "Preis Ladestation", description: "60 cent pro kwh", step: "charging" },
    { id: "05", title: "Adresse Ladestation", description: "Ladestr. 1a", step: "charging" },
    { id: "06", title: "Confirmation Ladestation", description: "Selected", step: "charging" },
    { id: "13", title: "Straße bis Ladestation", description: "Über A99...", step: "charging" },
    { id: "08", title: "Confirm", description: "Name der Ladestation", step: "charging" },
    { id: "09", title: "Name der Ladestation", description: "AC Mer Germany GmbH", step: "charging" },
    { id: "10", title: "Entfernung Ladestation", description: "8 km", step: "charging" },
    { id: "11", title: "Fahrtdauer Ladestation", description: "13 Minuten", step: "charging" },
    { id: "12", title: "Confirm", description: "Fahrtdauer bis Endziel", step: "end" },
    { id: "03", title: "Ankuftszeit Endziel", description: "14:32", step: "end" },
    { id: "04", title: "Entfernung Endziel", description: "224 km", step: "end" },
    { id: "14", title: "Straße bis zum Endziel", description: "Über A99...", step: "end" },
    { id: "07", title: "Adresse Endziel", description: "Stuttgarterstr. 1a", step: "end" },
    { id: "15", title: "Zeit für Umweg", description: "5 minuten", step: "end" },
    { id: "16", title: "Start Navigation", description: "Navigate...", step: "end" },
];