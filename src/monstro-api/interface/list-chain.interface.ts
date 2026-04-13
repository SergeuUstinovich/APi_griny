export interface DomainData {
  id: number;
  Status: string;
  Vebmaster_Id: string;
  Current_domain: string;
  Yandex_Metrika: number;
}

export interface ChainsResponse {
  id: number;
  data: DomainData[];
}