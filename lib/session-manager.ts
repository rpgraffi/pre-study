import { Column } from "@/models/column_model";

export interface BoardStates {
  usecase1: Column[];
  usecase2: Column[];
  usecase3: Column[];
}

export interface Session {
  id: string;
  name: string;
  date: string;
  columns: BoardStates;
}

export class SessionManager {
  private static readonly SESSIONS_KEY = "kanban-sessions";
  private static readonly SESSIONS_FOLDER = "sessions";

  static async saveSession(name: string, columns: BoardStates, sessionId?: string): Promise<void> {
    const session: Session = {
      id: sessionId || Date.now().toString(),
      name,
      date: new Date().toISOString(),
      columns,
    };

    // Save to localStorage
    const sessions = this.getSessions();
    if (!Array.isArray(sessions)) {
      localStorage.setItem(this.SESSIONS_KEY, JSON.stringify([session]));
    } else {
      if (sessionId) {
        // Update existing session
        const index = sessions.findIndex(s => s.id === sessionId);
        if (index !== -1) {
          sessions[index] = session;
        } else {
          sessions.push(session);
        }
      } else {
        // Add new session
        sessions.push(session);
      }
      localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(sessions));
    }

    // Save to file
    const blob = new Blob([JSON.stringify(session, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${this.SESSIONS_FOLDER}/${name.replace(/\s+/g, "-")}-${session.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static getSessions(): Session[] {
    try {
      const sessionsJson = localStorage.getItem(this.SESSIONS_KEY);
      if (!sessionsJson) return [];
      const parsed = JSON.parse(sessionsJson);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error loading sessions:", error);
      return [];
    }
  }

  static loadSession(sessionId: string): Session | null {
    const sessions = this.getSessions();
    return sessions.find(session => session.id === sessionId) || null;
  }

  static deleteSession(sessionId: string): void {
    const sessions = this.getSessions();
    const filteredSessions = sessions.filter(session => session.id !== sessionId);
    localStorage.setItem(this.SESSIONS_KEY, JSON.stringify(filteredSessions));
  }
} 