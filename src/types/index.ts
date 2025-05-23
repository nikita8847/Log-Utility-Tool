export const ApiSequence = {
  search: 'search_full_catalog_refresh',
  on_search: 'on_search_full_catalog_refresh',
  inc_search: 'search_inc_refresh',
  inc_onsearch: 'on_search_inc_refresh',
  select: 'select',
  on_select: 'on_select',
  select_out_of_stock: 'select_out_of_stock',
  on_select_out_of_stock: 'on_select_out_of_stock',
  init: 'init',
  on_init: 'on_init',
  confirm: 'confirm',
  on_confirm: 'on_confirm',
  cancel: 'cancel',
  on_cancel: 'on_cancel',
  on_status_pending: 'on_status_pending',
  on_status_packed: 'on_status_packed',
  on_status_picked: 'on_status_picked',
  on_status_out_for_delivery: 'on_status_out_for_delivery',
  on_status_delivered: 'on_status_delivered',
  on_status_rto_delivered: 'on_status_rto_delivered',
  on_update: 'on_update',
  update: 'update',
  update_settlement_part_cancel: 'update_settlement_part_cancel',
  on_update_part_cancel: 'on_update_part_cancel',
  update_liquidated: 'update_liquidated',
  on_update_interim_liquidated: 'on_update_interim_liquidated',
  on_update_liquidated: 'on_update_liquidated',
  update_settlement_liquidated: 'update_settlement_liquidated',
  catalog_rejection: 'catalog_rejection',
  update_address: 'update_address',
  on_update_address: 'on_update_address',
  update_instructions: 'update_instructions',
  on_update_instructions: 'on_update_instructions',
} as const;

export type ApiSequence =keyof typeof ApiSequence; 


export interface FlowPayload {
  [key: string]: string;
}

export interface FormData {
  domain: string;
  version: string;
  bppId: string;
  bapId: string;
  flowName: string;
}
