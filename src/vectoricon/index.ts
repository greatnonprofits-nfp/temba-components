/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
// for cache busting we dynamically generate a fingerprint, use yarn svg to update
export const SVG_FINGERPRINT = 'e5bcaf1a10896e9b870da4b40474d67b';

// only icons below are included in the sprite sheet
export enum Icon {
  alert_warning = 'alert-square',
  account = 'user-01',
  active = 'play',
  add = 'plus',
  add_note = 'file-02',
  airtime = 'bank-note-01',
  analytics = 'bar-chart-01',
  archive = 'archive',
  arrow_up = 'chevron-up',
  arrow_down = 'chevron-down',
  arrow_left = 'chevron-left',
  arrow_right = 'chevron-right',
  attachment = 'paperclip',
  attachment_audio = 'volume-min',
  attachment_document = 'file-06',
  attachment_image = 'image-01',
  attachment_location = 'marker-pin-01',
  attachment_video = 'video-recorder',
  branding = 'brush-02',
  branding_hostname = 'server-05',
  branding_notifications = 'mail-01',
  branding_styling = 'palette',
  branding_raw = 'pencil-01',
  broadcast = 'announcement-01',
  call = 'phone-call-01',
  call_missed = 'phone-call-02',
  campaign = 'clock-refresh',
  campaign_active = 'play',
  campaign_archived = 'archive',
  campaigns = 'clock-refresh',
  channel = 'zap',
  children = 'git-branch-01',
  check = 'check',
  checkbox = 'square',
  checkbox_checked = 'check-square',
  checkbox_partial = 'stop-square',
  classifier_wit = 'classifier-wit',
  classifier_luis = 'classifier-luis',
  classifier_bothub = 'classifier-bothub',
  close = 'x',
  compose = 'send-01',
  contact = 'user-01',
  contact_archived = 'archive',
  contact_blocked = 'message-x-square',
  contact_export = 'download-cloud-01',
  contact_import = 'upload-cloud-01',
  contact_stopped = 'slash-octagon',
  contact_updated = 'user-edit',
  contacts = 'user-01',
  copy = 'copy-04',
  dashboard = 'pie-chart-01',
  definitions_export = 'download-cloud-01',
  delete = 'trash-03',
  delete_small = 'x',
  down = 'chevron-down',
  download = 'download-01',
  edit = 'edit-03',
  email = 'mail-01',
  error = 'alert-circle',
  event = 'zap',
  expressions = 'at-sign',
  fields = 'user-edit',
  filter = 'filter-funnel-01',
  flow = 'flow',
  flow_background = 'layers-two-01',
  flow_interrupted = 'x-close',
  flow_ivr = 'phone',
  flow_message = 'message-square-02',
  flow_surveyor = 'tablet-01',
  flow_user = 'hard-drive',
  flows = 'flow',
  global = 'at-sign',
  grid = 'dots-grid',
  group = 'users-01',
  group_exclude = 'users-x',
  group_include = 'users-check',
  group_smart = 'atom-01',
  help = 'help-circle',
  hide = 'eye-off',
  home = 'settings-02',
  image = 'image-01',
  inbox = 'inbox-01',
  incidents = 'alert-square',
  incoming_call = 'phone-incoming-01',
  integrations = 'layers-three-01',
  info = 'user-square',
  issue = 'alert-square',
  label = 'tag-01',
  language = 'translate-01',
  link = 'link-external-01',
  location = 'marker-pin-01',
  log = 'file-02',
  logout = 'log-out-04',
  menu = 'menu-01',
  menu_collapse = 'chevron-left-double',
  message = 'message-square-02',
  message_export = 'download-cloud-01',
  messages = 'message-square-02',
  missing = 'maximize-02',
  missed_call = 'phone-x',
  new = 'plus',
  next_schedule = 'alarm-clock',
  notification = 'bell-01',
  number = 'hash-01',
  optin_requested = 'message-notification-circle',
  optin = 'message-check-circle',
  optout = 'message-x-circle',
  org_active = 'credit-card-02',
  org_anonymous = 'glasses-01',
  org_bulk = 'credit-card-plus',
  org_flagged = 'flag-01',
  org_new = 'stars-02',
  org_suspended = 'slash-circle-01',
  org_verified = 'check-verified-02',
  overview = 'pie-chart-01',
  prometheus = 'prometheus',
  progress_spinner = 'refresh-cw-04',
  featured = 'star-01',
  quick_replies = 'dotpoints-01',
  recording = 'microphone-01',
  resend = 'refresh-cw-05',
  reset = 'flip-backward',
  resthooks = 'share-07',
  restore = 'play',
  results_export = 'download-cloud-01',
  retry = 'refresh-cw-05',
  revisions = 'clock-rewind',
  rocketchat = 'rocketchat',
  runs = 'rows-03',
  schedule = 'calendar',
  search = 'search-refraction',
  select_open = 'chevron-down',
  select_clear = 'x',
  send = 'send-03',
  service = 'magic-wand-01',
  service_end = 'log-out-04',
  settings = 'settings-02',
  show = 'eye',
  simulator = 'phone-02',
  sort = 'chevron-selector-vertical',
  sort_down = 'sort-arrow-down',
  sort_up = 'sort-arrow-up',
  staff = 'hard-drive',
  submit = 'check',
  success = 'check',
  template_approved = 'check-circle',
  template_pending = 'hourglass-01',
  template_rejected = 'alert-circle',
  template_unsupported = 'alert-circle',
  tickets = 'agent',
  tickets_all = 'archive',
  tickets_closed = 'check',
  tickets_mine = 'coffee',
  tickets_open = 'inbox-01',
  tickets_export = 'download-cloud-01',
  tickets_unassigned = 'inbox-01',
  topic = 'message-text-circle-02',
  two_factor_enabled = 'shield-02',
  two_factor_disabled = 'shield-01',
  trigger = 'signal-01',
  trigger_active = 'play',
  trigger_archived = 'archive',
  trigger_new = 'plus',
  trigger_keyword = 'message-check-square',
  trigger_catch_all = 'message-question-square',
  trigger_inbound_call = 'phone-incoming-01',
  trigger_missed_call = 'phone-hang-up',
  trigger_schedule = 'calendar',
  trigger_new_conversation = 'message-chat-square',
  trigger_referral = 'user-right-01',
  trigger_closed_ticket = 'agent',
  trigger_opt_in = 'message-check-circle',
  trigger_opt_out = 'message-x-circle',
  triggers = 'signal-01',
  updated = 'edit-02',
  up = 'chevron-up',
  upload = 'upload-cloud-01',
  upload_image = 'camera-01',
  usages = 'link-04',
  user = 'users-01',
  users = 'users-01',
  user_beta = 'shield-zap',
  webhook = 'link-external-01',
  wit = 'wit',
  workspace = 'folder',
  zapier = 'zapier',
  zendesk = 'zendesk',

  // channel types
  channel_a = 'channel-android',
  channel_ac = 'zap', // TODO https://www.arabiacell.com/
  channel_at = 'zap', // TODO https://africastalking.com/
  channel_bs = 'zap', // TODO https://burstsms.com/
  channel_bw = 'zap', // TODO https://www.bandwidth.com/
  channel_cs = 'zap', // TODO https://www.clicksend.com/
  channel_ct = 'channel-clickatell',
  channel_d3 = 'channel-whatsapp',
  channel_d3c = 'channel-whatsapp',
  channel_da = 'zap', // TODO https://dartmedia.co.id/
  channel_ds = 'channel-discord',
  channel_ex = 'zap',
  channel_fb = 'channel-facebook',
  channel_fba = 'channel-facebook',
  channel_fc = 'channel-freshchat',
  channel_fcm = 'channel-firebase',
  channel_hm = 'zap', // TODO https://hormuud.com/
  channel_ib = 'zap', // TODO https://www.infobip.com/
  channel_ig = 'channel-instagram',
  channel_jc = 'channel-jiochat',
  channel_kn = 'channel-kannel',
  channel_kwa = 'channel-whatsapp',
  channel_ln = 'channel-line',
  channel_mt = 'channel-mtarget',
  channel_mtn = 'zap', // TODO https://mtn.com/
  channel_nx = 'channel-vonage',
  channel_pl = 'channel-plivo',
  channel_rc = 'channel-rocketchat',
  channel_sl = 'channel-slack',
  channel_sq = 'zap', // TODO https://shaqodoon.org/
  channel_st = 'zap', // TODO https://bulk.startmobile.ua
  channel_sw = 'channel-signalwire',
  channel_t = 'channel-twilio',
  channel_tg = 'channel-telegram',
  channel_tms = 'channel-twilio',
  channel_tq = 'channel-thinq',
  channel_tw = 'zap', // TODO https://www.somleng.org/
  channel_twa = 'channel-whatsapp',
  channel_twc = 'zap', // TODO
  channel_twt = 'channel-twitter',
  channel_vk = 'channel-vk',
  channel_vp = 'channel-viber',
  channel_wa = 'channel-whatsapp',
  channel_wac = 'channel-whatsapp',
  channel_wc = 'channel-wechat',
  channel_yo = 'zap', // TODO https://www.yo.co.ug/
  channel_zvw = 'channel-whatsapp',

  bothub = 'bothub',
  chatbase = 'chatbase',
  dtone = 'dtone',

  // demo
  default = 'list',
  datepicker = 'calendar',
  slider = 'sliders-02',
  select = 'browser',
  input = 'edit-05'
}
