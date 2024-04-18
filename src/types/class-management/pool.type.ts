export interface IFilterPools {
  network?: string;
  page?: number;
  sort?: string;
  dex?: string;
  isStable?: number;

}
export interface IVolumn {
  h24: string;
}

export interface IAttributePools {
  base_token_price_usd: string;
  base_token_price_native_currency: string;
  quote_token_price_usd: string;
  quote_token_price_native_currency: string;
  base_token_price_quote_token: string;
  quote_token_price_base_token: string;
  address: string;
  name: string;
  pool_created_at: string;
  fdv_usd: string;
  volume_usd: IVolumn;
  reserve_in_usd: string;
}

export interface ITypeRelationshipsPools {
  id: string;
  type: string;
}

export interface IDataRelationshipsPools {
  data: ITypeRelationshipsPools;
}

export interface IRelationshipsPools {
  base_token: IDataRelationshipsPools;
  quote_token: IDataRelationshipsPools;
  dex: IDataRelationshipsPools;
}

export interface IDetailPool {
  id: string;
  attributes: IAttributePools;
  relationships: IRelationshipsPools;
}

export interface IDetailPoolCustom {
  id?: string;
  base_token_price_usd?: string;
  base_token_price_native_currency?: string;
  quote_token_price_usd?: string;
  quote_token_price_native_currency?: string;
  base_token_price_quote_token?: string;
  quote_token_price_base_token?: string;
  address?: string;
  name?: string;
  pool_created_at?: string;
  fdv_usd?: string;
  volume?: string;
  reserve_in_usd: string;
  fee?: number | null;
  ratio?: number;
  base_token?: IDataRelationshipsPools;
  quote_token?: IDataRelationshipsPools;
  dex?: IDataRelationshipsPools;
}

export interface IResponsePool {
  data: IDetailPool[];
}
export interface IAttributeNetwork {
  name: string;
}

export interface IResponseNetwork {
  id: string;
  type: string;
  attributes: IAttributeNetwork;
}
