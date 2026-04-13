export interface GroupProject {
  id: number;
  name: string;
  has_notifications: boolean;
  cap_chance: number;
  secret_code: string;
  is_active: boolean;
  last_requested_at: string;
  started_tasks: number;
  notfounds_24h: number;
  errors_24h: number;
}

export interface GroupProjectResponse {
  success: boolean;
  data: GroupProject[];
}