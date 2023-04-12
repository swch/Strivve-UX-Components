
export type APIFilter = number | {
  [key: string]: string | string[];
} | null;

export type MerchantSite = {
  id: string;
  name: string;
  account_link: any[];
  images: any[];
}

export interface StrivveServiceInterface {
  getMerchantSite(id: string): Promise<MerchantSite | undefined>;
  getMerchantSites(filters: APIFilter): Promise<MerchantSite[]>;
  createJob(data: any): Promise<any>;
  createCardholder(data: any): Promise<any>;
  createCard(data: any): Promise<any>;
  authorizeCardholder(data: any): Promise<any>;
  createCardholderQuery(id: string): any;
  postCreds(body: any): Promise<any>;
}