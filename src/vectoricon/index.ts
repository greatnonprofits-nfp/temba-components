// for cache busting we dynamically generate a fingerprint, use yarn svg to update
export const SVG_FINGERPRINT = '1e5740261f551dff99c585302f592831';

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
  broadcast = 'announcement-01',
  call = 'phone-call-01',
  call_missed = 'phone-call-02',
  campaign = 'clock-refresh',
  campaign_active = 'play',
  campaign_archived = 'archive',
  campaigns = 'clock-refresh',
  channel = 'zap',
  channel_a = 'channel-android',
  channel_ct = 'channel-clickatell',
  channel_d3 = 'channel-whatsapp',
  channel_ds = 'channel-discord',
  channel_ex = 'zap',
  channel_fb = 'channel-facebook',
  channel_fba = 'channel-facebook',
  channel_fc = 'channel-freshchat',
  channel_fcm = 'channel-firebase',
  channel_ig = 'channel-instagram',
  channel_jc = 'channel-jiochat',
  channel_jn = 'channel-junebug',
  channel_kn = 'channel-kannel',
  channel_kwa = 'channel-whatsapp',
  channel_ln = 'channel-line',
  channel_mg = 'channel-mtarget',
  channel_pl = 'channel-plivo',
  channel_rc = 'channel-rocketchat',
  channel_sl = 'channel-slack',
  channel_sw = 'channel-signalwire',
  channel_tq = 'channel-thinq',
  channel_tg = 'channel-telegram',
  channel_t = 'channel-twilio',
  channel_twt = 'channel-twitter',
  channel_twa = 'channel-whatsapp',
  channel_vp = 'channel-viber',
  channel_vk = 'channel-vk',
  channel_nx = 'channel-vonage',
  channel_wc = 'channel-wechat',
  channel_wa = 'channel-whatsapp',
  channel_wac = 'channel-whatsapp',
  channel_zvw = 'channel-whatsapp',
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
  colors = 'palette',
  contact = 'user-01',
  contact_archived = 'archive',
  contact_blocked = 'message-x-square',
  contact_stopped = 'slash-octagon',
  contact_updated = 'user-edit',
  contacts = 'user-01',
  conversation = 'message-chat-square',
  copy = 'copy-04',
  dashboard = 'pie-chart-01',
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
  group_smart = 'atom-01',
  help = 'help-circle',
  hide = 'eye-off',
  home = 'settings-02',
  image = 'image-01',
  inbox = 'inbox-01',
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
  messages = 'message-square-02',
  missing = 'maximize-02',
  missed_call = 'phone-x',
  new = 'plus',
  next_schedule = 'alarm-clock',
  notification = 'bell-01',
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
  recording = 'microphone-01',
  referral = 'user-right-01',
  resend = 'refresh-cw-05',
  reset = 'flip-backward',
  resthooks = 'share-07',
  restore = 'play',
  retry = 'refresh-cw-05',
  revisions = 'clock-rewind',
  rocketchat = 'rocketchat',
  runs = 'rows-03',
  schedule = 'calendar',
  search = 'search-refraction',
  select_open = 'chevron-down',
  select_clear = 'x',
  service = 'magic-wand-01',
  service_end = 'log-out-04',
  settings = 'settings-02',
  show = 'eye',
  simulator = 'phone-02',
  sort = 'chevron-selector-vertical',
  sort_down = 'sort-arrow-down',
  sort_up = 'sort-arrow-up',
  staff = 'hard-drive',
  tickets = 'agent',
  tickets_all = 'archive',
  tickets_closed = 'check',
  tickets_mine = 'coffee',
  tickets_open = 'inbox-01',
  tickets_unassigned = 'inbox-01',
  topic = 'message-text-circle-02',
  two_factor_enabled = 'shield-02',
  two_factor_disabled = 'shield-01',
  trigger = 'signal-01',
  trigger_active = 'play',
  trigger_archived = 'archive',
  trigger_new = 'plus',
  triggers = 'signal-01',
  updated = 'edit-02',
  up = 'chevron-up',
  upload = 'upload-cloud-01',
  usages = 'link-04',
  user = 'users-01',
  users = 'users-01',
  user_beta = 'shield-zap',
  webhook = 'link-external-01',
  wit = 'wit',
  workspace = 'folder',
  zapier = 'zapier',
  zendesk = 'zendesk',

  ext = 'lightning-01',
  fcm = 'lightning-01',

  bothub = 'bothub',
  chatbase = 'chatbase',
  dtone = 'dtone',

  // demo
  default = 'list',
  datepicker = 'calendar',
  slider = 'sliders-02',
  select = 'browser',
  input = 'edit-05',
}
