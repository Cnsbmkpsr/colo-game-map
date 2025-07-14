import { makeAutoObservable, runInAction } from "mobx";
import { RealtimeService } from "../../shared/services/realTimeDBService";
import { troopStore } from "../game/troopStore";
import { Civilisation } from "../game/types";
import { CONFIG } from "./config";
import { mapStore } from "../map/mapStore";

const passwordCollection = new RealtimeService("password");

let remainingTime = CONFIG.roundDuration; // Default round duration

class AdminStore {
  isAdmin = false;
  isPaused = true;
  currentTeamIndex = 0;
  activeTeamIndex = 0;
  roundTimer: NodeJS.Timeout | null = null;
  roundStartTime: number = Date.now();
  remainingTime: number = CONFIG.roundDuration;
  loggedInTeam: Civilisation | null = null;
  sessionId: string = Math.floor(Math.random() * 1000000).toString(); // Unique session ID for this admin instance
  leaderSessionId: string = ""; // ID of the session that is currently the master
  private realtimeService: RealtimeService;
  private leaderSessionIdService: RealtimeService;

  constructor() {
    makeAutoObservable(this);
    this.realtimeService = new RealtimeService("adminStore");
    this.leaderSessionIdService = new RealtimeService("sessionId");
    this.loadState();
  }

  async checkPassword(password: string) {
    const passwordData = await passwordCollection.read();
    if (passwordData?.data === password) {
      this.setAdmin(true);
    }
  }

  setAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin;
  }

  beMasterSession() {
    runInAction(async () => {
      await this.leaderSessionIdService.set(this.sessionId);
    });
  }

  setRemainingTime(time: number) {
    remainingTime = time;
  }

  get getAdmin() {
    return this.isAdmin;
  }

  get isMasterSession(): boolean {
    return this.leaderSessionId === this.sessionId;
  }

  startRounds() {
    runInAction(() => {
      if (this.isPaused) {
        this.isPaused = false;
        this.roundStartTime = Date.now();
        this.runRounds();
        this.syncState(); // Synchronize state with the backend
      }
    });
  }

  pauseRounds() {
    runInAction(() => {
      if (!this.isPaused) {
        this.isPaused = true;
        if (this.roundTimer) {
          clearTimeout(this.roundTimer);
          this.roundTimer = null;
        }
        // Calculate remaining time when paused
        const elapsedTime = Date.now() - this.roundStartTime;
        this.remainingTime -= elapsedTime;
        this.syncState(); // Synchronize state with the backend
      }
    });
  }

  runRounds() {
    if (this.isPaused || !this.isMasterSession) return;

    this.roundStartTime = Date.now();
    this.roundTimer = setTimeout(() => {
      runInAction(() => {
        this.switchTeam();
        this.runRounds();
      });
    }, this.remainingTime);
  }

  switchTeam() {
    runInAction(async () => {
      await mapStore.applyGhostPositions();
      troopStore.moveUnitsForActiveTeam();

      this.activeTeamIndex = (this.activeTeamIndex + 1) % CONFIG.teams.length;
      this.remainingTime = CONFIG.roundDuration;
      remainingTime = CONFIG.roundDuration;
      this.roundStartTime = Date.now();
      this.syncState(); // Synchronize state with the backend
    });
  }

  setTeamLogin(team: Civilisation) {
    runInAction(() => {
      this.loggedInTeam = team;
    });
  }

  get isLoggedInTeam(): boolean {
    return !!this.loggedInTeam;
  }

  get currentTeam(): Civilisation {
    return CONFIG.teams[this.currentTeamIndex];
  }

  get activeTeam(): Civilisation {
    return CONFIG.teams[this.activeTeamIndex];
  }

  get nextTeams(): Civilisation[] {
    return CONFIG.teams
      .slice(this.activeTeamIndex + 1)
      .concat(CONFIG.teams.slice(0, this.activeTeamIndex));
  }

  // Sync state with backend
  syncState() {
    const state = {
      isPaused: this.isPaused,
      activeTeamIndex: this.activeTeamIndex,
      remainingTime: remainingTime,
    };
    this.realtimeService.set(JSON.stringify(state));
  }

  // Load state from backend
  async loadState() {
    // Real-time service
    const stateData = await this.realtimeService.read();
    if (stateData && stateData.data) {
      const state = JSON.parse(stateData.data);
      runInAction(() => {
        this.isPaused = state.isPaused;
        this.activeTeamIndex = state.activeTeamIndex;
        this.remainingTime = state.remainingTime;
      });
    }

    // Leader session ID service
    const leaderSessionIdData = await this.leaderSessionIdService.read();
    if (leaderSessionIdData && leaderSessionIdData.data) {
      runInAction(() => {
        this.leaderSessionId = leaderSessionIdData.data;
      });
    }
  }
}

const adminStore = new AdminStore();
export { adminStore };
