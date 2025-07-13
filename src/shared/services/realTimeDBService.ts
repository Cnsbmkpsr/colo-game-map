import { get, getDatabase, onValue, ref, remove, set } from "firebase/database";
import { app } from "../../firebase";
import { Position } from "../../features/game/types";

const db = getDatabase(app);

interface Data {
  id: string;
  data: any;
}

export class RealtimeService {
  rootRef = ref(db);
  keyName: string;
  keyRef: any;

  constructor(keyName: string) {
    this.keyName = keyName;
    this.keyRef = ref(db, keyName);
  }

  async set(data: string): Promise<void> {
    try {
      await set(this.keyRef, data as any);
      console.log(`Document créé avec succès: ${this.keyName}`);
    } catch (error) {
      console.error("Erreur lors de la création du document :", error);
    }
  }

  async read(): Promise<Data | null> {
    try {
      const docSnap = await get(this.keyRef);
      if (docSnap.exists() && docSnap.key) {
        return { id: docSnap.key, data: docSnap.val() };
      } else {
        console.log(`Document introuvable: ${this.keyName}`);
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la lecture du document :", error);
      return null;
    }
  }

  async delete(): Promise<void> {
    try {
      await remove(this.keyRef);
      console.log(`Document supprimé avec succès: ${this.keyName}`);
    } catch (error) {
      console.error("Erreur lors de la suppression du document :", error);
    }
  }

  async saveGhostPosition(
    unitId: string,
    position: { x: number; y: number },
    team: string
  ): Promise<void> {
    try {
      const ghostPositionRef = ref(db, `ghostPositions/${team}/${unitId}`);
      console.log(
        `Saving ghost position at path: ghostPositions/${team}/${unitId} with data:`,
        position
      );
      await set(ghostPositionRef, position);
      console.log("Ghost position saved successfully");
    } catch (error) {
      console.error("Error saving ghost position:", error);
    }
  }

  async fetchGhostPositions(
    team: string
  ): Promise<Record<string, Record<string, Position>> | null> {
    try {
      const ghostPositionRef = ref(db, `ghostPositions/${team}`);
      console.log(`Fetching ghost positions from path: ghostPositions/${team}`);
      const docSnap = await get(ghostPositionRef);
      if (docSnap.exists()) {
        console.log("Ghost positions fetched successfully:", docSnap.val());
        const rawPositions: Record<string, { x: number; y: number }> =
          docSnap.val();
        const convertedPositions: Record<string, Record<string, Position>> = {
          [team]: Object.fromEntries(
            Object.entries(rawPositions).map(
              ([unitId, pos]: [string, Position]) => [
                unitId,
                { x: pos.x, y: pos.y },
              ]
            )
          ),
        };
        return convertedPositions;
      } else {
        console.log("No ghost positions found for team:", team);
        return null;
      }
    } catch (error) {
      console.error("Error fetching ghost positions:", error);
      return null;
    }
  }

  async clearGhostPositions(team: string): Promise<void> {
    try {
      const ghostPositionRef = ref(db, `ghostPositions/${team}`);
      await remove(ghostPositionRef);
      console.log(`Ghost positions cleared successfully for team: ${team}`);
    } catch (error) {
      console.error("Error clearing ghost positions:", error);
    }
  }

  watch(callback: (data: Data | null) => void): () => void {
    const unsub = onValue(this.keyRef, (docSnap) => {
      if (docSnap.exists() && docSnap.key) {
        callback({ id: docSnap.key, data: docSnap.val() });
      } else {
        callback(null);
      }
    });
    return unsub;
  }
}
