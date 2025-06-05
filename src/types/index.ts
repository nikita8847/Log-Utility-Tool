

export const igm2FlowCombinedSequence = {
  issue_open: 'issue_open',
  on_issue_processing_1: 'on_issue_processing_1',
  on_issue_info_required_1: 'on_issue_info_required_1',
  issue_info_provided_1: 'issue_info_provided_1',
  on_issue_processing_2: 'on_issue_processing_2',
  on_issue_info_required_2: 'on_issue_info_required_2',
  issue_info_provided_2: 'issue_info_provided_2',
  on_issue_resolution_proposed: 'on_issue_resolution_proposed',
  issue_resolution_accepted: 'issue_resolution_accepted',
  on_issue_resolved: 'on_issue_resolved',
  issue_closed: 'issue_closed',
  on_issue_processing: 'on_issue_processing',
  issue_esclated: 'issue_esclated',
  on_issue_gro_processing: 'on_issue_gro_processing',
  on_issue_gro_resolution_proposed: 'on_issue_gro_resolution_proposed',
  issue_gro_resolution_accepted: 'issue_gro_resolution_accepted',
  on_issue_gro_resolved: 'on_issue_gro_resolved',
  issue_gro_close: 'issue_gro_close',
  issue_lsp_open: 'issue_lsp_open',
  on_issue_lsp_processing: 'on_issue_lsp_processing',
  on_issue_lsp_info_required: 'on_issue_lsp_info_required',
  on_issue_info_required: 'on_issue_info_required',
  issue_info_provided: 'issue_info_provided',
  issue_info_lsp_info_provided: 'issue_info_lsp_info_provided',
  on_issue_lsp_resolution_proposed: 'on_issue_lsp_resolution_proposed',
  issue_lsp_resolution_accepted: 'issue_lsp_resolution_accepted',
  on_issue_lsp_resolved: 'on_issue_lsp_resolved',
  issue_close: 'issue_close',
  issue_lsp_close: 'issue_lsp_close',
}

export const RSF_v2_apiSequence = {
  settle: 'settle',
  on_settle: 'on_settle',
  settle1: 'settle1',
  on_settle1: 'on_settle1',
  report: 'report',
  on_report: 'on_report',
  recon: 'recon',
  on_recon: 'on_recon',
}

export  const ApiSequence = {
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
  ...igm2FlowCombinedSequence,
  ...RSF_v2_apiSequence
} as const;

export type ApiSequence =keyof typeof ApiSequence; 

export const mobilitySequence = {

  search: 'search',
  search_inc: 'search_inc',
  search_time: 'search_time',
  on_search: 'on_search',
  select: 'select',
  on_select: 'on_select',
  init: 'init',
  on_init: 'on_init',
  confirm: 'confirm',
  on_confirm: 'on_confirm',
  cancel: 'cancel',
  soft_cancel: 'soft_cancel',
  on_cancel: 'on_cancel',
  soft_on_cancel: 'soft_on_cancel',
  update: 'update',
  on_update: 'on_update',
  status: 'status',
  on_status: 'on_status',
  ...igm2FlowCombinedSequence
};

export type mobilitySequence =keyof typeof mobilitySequence; 

export const domainSequenceMap = {
  retail: ApiSequence,
  mobility: mobilitySequence,
} as const;

export type DomainType = keyof typeof domainSequenceMap;


export const FisApiSequence = {
  search: 'search',
  on_search: 'on_search',
  search_1: 'search_1',
  on_search_1: 'on_search_1',
  search_2: 'search_2',
  on_search_2: 'on_search_2',
  search_3: 'search_3',
  on_search_3: 'on_search_3',
  select_1: 'select_1',
  select_2: 'select_2',
  select_3: 'select_3',
  on_select_1: 'on_select_1',
  on_select_2: 'on_select_2',
  on_select_3: 'on_select_3',
  init_1: 'init_1',
  init_2: 'init_2',
  init_3: 'init_3',
  init_4: 'init_4',
  on_init_1: 'on_init_1',
  on_init_2: 'on_init_2',
  on_init_3: 'on_init_3',
  on_init_4: 'on_init_4',
  confirm: 'confirm',
  on_confirm: 'on_confirm',
  cancel: 'cancel',
  on_cancel: 'on_cancel',
  status: 'status',
  on_status: 'on_status',
  on_status_ekyc: 'on_status_ekyc',
  on_status_enach: 'on_status_enach',
  on_status_esign: 'on_status_esign',
  // on_status_emandate: 'on_status_emandate',
  // on_status_loan: 'on_status_loan',
  update: 'update',
  on_update: 'on_update',
  on_update_unsolicated: 'on_update_unsolicated',
}

export type FisApiSequence =keyof typeof FisApiSequence; 
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
