export interface ProjectResponse {
  success: boolean;
  data: Project[];
}

export interface Project {
  id: number;
  name: string;
  task_type: string;
  domain: string;
  click_regions: ClickRegion[];
  power: number;
  is_active: boolean;
  active_until: string;
  order: number;
  task_link_id: number;
  pws: number;
  monthly_clicks: number;
  today_stats: TodayStats;
  today_plan: TodayPlan;
}

export interface ClickRegion {
  id: number;
  weight: number;
}

export interface TodayStats {
  schedule_count: number;
  schedule_expenses: number;
  boost_count: number;
  boost_expenses: number;
}

export interface TodayPlan {
  scheduled: number;
  boosted: number;
}