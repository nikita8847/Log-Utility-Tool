import { ApiSequence, mobilitySequence } from "../types";


// export const validDomains = [
//   "ONDC:RET10",
//   "ONDC:RET11",
//   "ONDC:RET12",
//   "ONDC:RET13",
//   "ONDC:RET14",
//   "ONDC:RET15",
//   "ONDC:RET16",
//   "ONDC:RET17",
//   "ONDC:RET18",
//   "ONDC:RET19",
//   "ONDC:AGR10",
//   "ONDC:RET1A",
//   "ONDC:TRV10",
//   "ONDC:TRV11",
//   "ONDC:TRV12",
//   "ONDC:TRV13",
//   "ONDC:TRV14",
//   "ONDC:FIS10",
//   "ONDC:FIS12",
//   "ONDC:FIS13",
//   "ONDC:FIS14",
// ];
export const retailDomains = [
  "ONDC:RET10",
  "ONDC:RET11",
  "ONDC:RET12",
  "ONDC:RET13",
  "ONDC:RET14",
  "ONDC:RET15",
  "ONDC:RET16",
  "ONDC:RET17",
  "ONDC:RET18",
  "ONDC:RET19",
  "ONDC:AGR10",
  "ONDC:RET1A",
  "ONDC:NTS10"
];
export const mobilityDomains = [
  "ONDC:TRV10",
  "ONDC:TRV11",
  "ONDC:TRV12",
  "ONDC:TRV13",
  "ONDC:TRV14",
];
// export const financeDomains = [
//   "ONDC:FIS10",
//   "ONDC:FIS12",
//   "ONDC:FIS13",
//   "ONDC:FIS14",
// ];
export const validDomains = [
  ...retailDomains,
  ...mobilityDomains,
  // ...financeDomains,
];

export function getDomainCategory(domain: string): "retail" | "mobility" | "finance" | "unknown" {
  if (retailDomains.includes(domain)) return "retail";
  if (mobilityDomains.includes(domain)) return "mobility";
  // if (financeDomains.includes(domain)) return "finance";
  return "unknown";
}

export const validVersions = ["1.2.0", "1.2.5", "2.0.0", "2.0.1","2.2.0", "2.3.0"];
export const retailVersions = ["1.2.0", "1.2.5","2.0.0"];
// export const fisVersions = ["2.0.0", "2.2.0", "2.3.0"];
export const trvVersions = ["2.0.0", "2.0.1","2.0.0"];

export const validFlows = [
  "1",
  "2",
  "012",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  // "020",
  // "01C",
  // "008",
  // "003",
  // "00F",
  // "011",
  // "017",
  // "00D",
  // "00E",
  // "016",
  // "01F",
  "IGM_flow_1",
  "IGM_flow_2",
  "IGM_flow_3",
  "RSF_Flow_1",
  "RSF_Flow_2",
  "RSF_Flow_3",
  "RSF_Flow_4",
  "RSF_Flow_5",
];
    export const IgmFlows = ["IGM_flow_1", "IGM_flow_2", "IGM_flow_3"];
    export const rsfFlows = [ "RSF_Flow_1", "RSF_Flow_2",  "RSF_Flow_3", "RSF_Flow_4", "RSF_Flow_5"];

export const onDemandFlows = {
  DRIVER_ON_CONFIRM: 'DRIVER_ON_CONFIRM',
  DRIVER_POST_CONFIRM: 'DRIVER_POST_CONFIRM',
  RIDER_CANCEL: 'RIDER_CANCEL',
  DRIVER_CANCEL: 'DRIVER_CANCEL',
  PRICE_UPDATE: 'PRICE_UPDATE',
  DRIVER_NOT_FOUND: 'DRIVER_NOT_FOUND',
  DRIVER_NOT_FOUND_POST_CONFIRM: 'DRIVER_NOT_FOUND_POST_CONFIRM',
}

export const driverOnConfirmSequence = [
  mobilitySequence.search,
  mobilitySequence.on_search,
  mobilitySequence.select,
  mobilitySequence.on_select,
  mobilitySequence.init,
  mobilitySequence.on_init,
  mobilitySequence.confirm,
  mobilitySequence.on_confirm,
  mobilitySequence.on_status,
  mobilitySequence.on_update,
];

export const driverPostConfirmSequence = [
  mobilitySequence.search,
  mobilitySequence.on_search,
  mobilitySequence.select,
  mobilitySequence.on_select,
  mobilitySequence.init,
  mobilitySequence.on_init,
  mobilitySequence.confirm,
  mobilitySequence.on_confirm,
  mobilitySequence.on_update,
  mobilitySequence.on_status,
];

export const rideCancellation = [
  mobilitySequence.on_confirm,
  mobilitySequence.soft_cancel,
  mobilitySequence.soft_on_cancel,
  mobilitySequence.cancel,
  mobilitySequence.on_cancel,
];

export const driverRideCancellation = [
  mobilitySequence.on_confirm,
  mobilitySequence.on_cancel,
];

export const driverNotFound = [
  mobilitySequence.confirm,
  mobilitySequence.on_confirm,
];

export const driverNotFoundPostConfirm = [
  mobilitySequence.confirm,
  mobilitySequence.on_confirm,
  mobilitySequence.on_cancel,
];
export const mobilityFlowMap: Record<string, string[]> = {
  [onDemandFlows.DRIVER_ON_CONFIRM]: driverOnConfirmSequence,
  [onDemandFlows.DRIVER_POST_CONFIRM]: driverPostConfirmSequence,
  [onDemandFlows.RIDER_CANCEL]: rideCancellation,
  [onDemandFlows.DRIVER_CANCEL]: driverRideCancellation,
  [onDemandFlows.PRICE_UPDATE]: [], // define if needed
  [onDemandFlows.DRIVER_NOT_FOUND]: driverNotFound,
  [onDemandFlows.DRIVER_NOT_FOUND_POST_CONFIRM]: driverNotFoundPostConfirm,
};

// Used to populate Select options for Flow
export const validMobilityFlows = Object.keys(mobilityFlowMap);



export const IGM2FlowSequence:  Record<string, string[]>= {
  
  "IGM_flow_1": [
    'issue_open',
    'on_issue_processing_1',
    'on_issue_info_required',
    'issue_info_provided',
    'on_issue_processing_2',
    'on_issue_resolution_proposed',
    'issue_resolution_accepted',
    'on_issue_resolved',
    'issue_closed',
  ],
 
  "IGM_flow_2": [
    'issue_open',
    'on_issue_processing',
    'on_issue_resolution_proposed',
    'issue_resolution_accepted',
    'on_issue_resolved',
    'issue_esclated',
    'on_issue_gro_processing',
    'on_issue_gro_resolution_proposed',
    'issue_gro_resolution_accepted',
    'on_issue_gro_resolved',
    'issue_gro_close',
  ],

  "IGM_flow_3": [
    'issue_open',
    'on_issue_processing',
    'issue_lsp_open',
    'on_issue_lsp_processing',
    'on_issue_lsp_info_required',
    'on_issue_info_required',
    'issue_info_provided',
    'issue_info_lsp_info_provided',
    'on_issue_lsp_resolution_proposed',
    'on_issue_resolution_proposed',
    'issue_resolution_accepted',
    'issue_lsp_resolution_accepted',
    'on_issue_lsp_resolved',
    'on_issue_resolved',
    'issue_close',
    'issue_lsp_close',
  ],
}

export const RSFFlows: Record<string , string[]>={
  "RSF_Flow_1":["settle","on_settle","report","on_report"],
  "RSF_Flow_2":["settle","on_settle","report","on_report","recon","on_recon","settle1","on_settle1",],
  "RSF_Flow_3":["settle","on_settle","report","on_report","recon","on_recon"],
  "RSF_Flow_4":["settle","on_settle",],
  "RSF_Flow_5":["settle","on_settle",],
  



}

export const flowSequences: Record<string, ApiSequence[]> = {
  "1": ["search", "on_search", "inc_search", "inc_onsearch"],
  "2": [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
    "on_status_pending",
    "on_status_packed",
    "on_status_picked",
    "on_status_out_for_delivery",
    "on_status_delivered",
  ],
  "3": [
    "search",
    "on_search",
    "select_out_of_stock",
    "on_select_out_of_stock",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
    "on_status_pending",
    "on_status_packed",
    "on_status_picked",
    "on_status_out_for_delivery",
    "on_status_delivered",
  ],
  "4": [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
    "cancel",
    "on_cancel",
  ],
  "5": [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
    "on_update_part_cancel",
    "update_settlement_part_cancel",
    "on_status_pending",
    "on_status_packed",
    "on_status_picked",
    "on_status_out_for_delivery",
    "on_cancel",
    "on_status_rto_delivered",
  ],
  "6": [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
    "on_status_pending",
    "on_status_packed",
    "on_status_picked",
    "on_status_out_for_delivery",
    "on_status_delivered",
    "update_liquidated",
    "on_update_interim_liquidated",
    "on_update_liquidated",
    "update_settlement_liquidated",
  ],
  "7": ["search", "on_search", "catalog_rejection"],
  "8": ["search", "on_search"],
  "9": ["inc_search", "inc_onsearch", "catalog_rejection"],
  "020": [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
    "on_status_pending",
    "on_status_packed",
    "on_status_picked",
    "on_status_out_for_delivery",
    "on_status_delivered",
  ],
  "01C": [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
    "on_status_pending",
    "on_status_packed",
    "on_status_picked",
    "on_status_out_for_delivery",
    "on_status_delivered",
  ],
  "008": ["search", "on_search", "select", "on_select", "init", "on_init"],
  "003": [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
    "on_status_pending",
    "on_status_packed",
    "on_status_picked",
  ],
  "00F": [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
    "update_address",
    "on_update_address",
  ],
  "011": [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
    "update_instructions",
    "on_update_instructions",
  ],
  "017": [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
    "on_status_pending",
    "on_status_packed",
    "on_status_picked",
    "on_status_out_for_delivery",
    "on_status_delivered",
    "on_update",
    "on_cancel",
  ],
  "00D": [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
    "on_status_pending",
    "on_status_packed",
    "on_status_picked",
    "on_status_out_for_delivery",
    "on_status_delivered",
    "cancel",
    "on_cancel",
  ],
  "00E": [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
    "on_status_pending",
    "on_status_packed",
    "on_status_picked",
    "update",
  ],
  "012": [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
    "on_status_pending",
    "on_status_packed",
    "on_status_picked",
    "on_status_out_for_delivery",
    "on_status_delivered",
  ],
  "016": [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
  ],
  "01F": [
    "search",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
  ],
  "flow_1": [
    "issue_open",
    "on_search",
    "select",
    "on_select",
    "init",
    "on_init",
    "confirm",
    "on_confirm",
  ],
  
  ///trv flows//
  ...mobilityFlowMap,
///IGM2///
  ...IGM2FlowSequence,
  ...RSFFlows

};


