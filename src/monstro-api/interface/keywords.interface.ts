export interface KeywordsResponse {
  success: boolean;
  data: Keyword[];
  meta: Meta;
}

export interface Keyword {
  id: number;
  kw: string;
  vitals: string[] | null;
  target_page: string;
  last_position: number;
  pws: number;
  is_active: boolean;
  monthly_clicks: number;
  fixed_clicks: number | null;
  lr: number;
  notfound_count: number;
  auto_boost_amount: number;
  auto_boost_period: number | null;
  scheduled_clicks: number;
  boosted_clicks: number;
  can_set_task_count: boolean;
  today_stats: KeywordTodayStats;
}

export interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface KeywordTodayStats {
  schedule_count: number;
  schedule_expenses: number;
  boost_count: number;
  boost_expenses: number;
}