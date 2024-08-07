import axios from 'axios';
export const Types: ('Pull' | 'Push')[] = ['Pull', 'Push'];
export const Methods: ('OPUI' | 'WebService' | 'Scheduler' | 'DIS')[] = [
  'OPUI',
  'WebService',
  'Scheduler',
  'DIS',
];
export const Tags: ('钱' | '货' | '供方' | '库存')[] = ['钱', '货', '供方', '库存'];
interface IDto {
  /** 模块 */
  Module: string;
  /** 系统 */
  System: string;
  /** 提供方 */
  Provider: string;
  /** 请求方 */
  Requester: string;
  /** 类型 */
  Type: typeof Types extends (infer T)[] ? T : never;
  /** 承载方式 */
  Method: typeof Methods extends (infer T)[] ? T : never;
  /** 应用 */
  App: string;
  /** 描述 */
  Desc: string;
  /** 接口名称 */
  Interface: string;
  /** 配置路径 */
  ConfigPath: string;
  /** 标签 */
  Tags: typeof Tags;
  /** 数据源编号列表 */
  Sources: string[];
  /** 获取呆滞数据SQL */
  GetExpired: string;
  /** Cron表达式 */
  Cron: string;
  // /** 扩展字段 */
  // Extend: Record<string, any>;
  /** 是否启用 */
  Enabled: boolean;
  /** Cron运行时ID */
  EntryID: number;
  /** 运行次数 */
  Count: number;
  /** 上次运行耗时(ms) */
  PrevDuration: number;
  /** 运行平均耗时(ms) */
  DurationAvg: number;
}
// interface ICreate extends Omit<IDto, 'EntryID'> {}
// interface IUpdate extends Omit<IDto, 'App' | 'EntryID'> {}
/** 监控状态Dto */
interface IEntryDto {
  /** 应用 */
  App: string;
  /** 调度Id */
  ID: number;
  /** 上次运行时间 */
  Prev: string;
  /** 下次运行时间 */
  Next: string;
}
export class Watcher implements IDto, Omit<IEntryDto, 'ID'> {
  Module: string = '';
  System: string = '';
  Provider: string = '';
  Requester: string = '';
  Type: typeof Types extends (infer T)[] ? T : never = 'Pull';
  Method: typeof Methods extends (infer T)[] ? T : never = 'Scheduler';
  App: string = '';
  Desc: string = '';
  Interface: string = '';
  ConfigPath: string = '';
  Tags: typeof Tags = [];
  Sources: string[] = [];
  GetExpired: string = '';
  Cron: string = '';
  // Extend: Record<string, any> = {};
  Enabled: boolean = true;
  EntryID: number = 0;
  Count: number = 0;
  PrevDuration: number = 0;
  DurationAvg: number = 0;
  Prev: string = '';
  Next: string = '';
  get Status() {
    return this.EntryID === 0 ? 'Exited' : 'Running';
  }
  constructor(dto?: IDto) {
    if (!dto) return;
    this.Module = dto.Module;
    this.System = dto.System;
    this.Provider = dto.Provider;
    this.Requester = dto.Requester;
    this.Type = dto.Type;
    this.Method = dto.Method;
    this.App = dto.App;
    this.Desc = dto.Desc;
    this.Interface = dto.Interface;
    this.ConfigPath = dto.ConfigPath;
    this.Tags = dto.Tags || [];
    this.Sources = dto.Sources || [];
    this.GetExpired = dto.GetExpired;
    this.Cron = dto.Cron;
    this.Enabled = dto.Enabled;
    this.EntryID = dto.EntryID || 0;
    this.Count = dto.Count || 0;
    this.PrevDuration = dto.PrevDuration || 0;
    this.DurationAvg = dto.DurationAvg || 0;
  }
  static async list() {
    const res = await axios.get<IDto[]>('api/watchers');
    if (res && res.data instanceof Array) return res.data.map((i) => new Watcher(i));
    return [];
  }
  static async get(app: string) {
    if (!app) return;
    const res = await axios.get<IDto>(`api/watchers/${app}`);
    if (res && res.data) return new Watcher(res.data);
  }
  async create() {
    if (!this.App) return false;
    const res = await axios.post<string>(`api/watchers/${this.App}`, this);
    return res.data === this.App;
  }
  async update() {
    if (!this.App) return false;
    const res = await axios.put<string>(`api/watchers/${this.App}`, this);
    return res.data === this.App;
  }
  async delete() {
    if (!this.App) return false;
    const res = await axios.delete<string>(`api/watchers/${this.App}`);
    return res.data === this.App;
  }
  async enable() {
    if (!this.App) return false;
    const res = await axios.patch<string>(`api/watchers/${this.App}/enable`);
    if (res.data === this.App) {
      this.Enabled = true;
    }
    return res.data === this.App;
  }
  async disable() {
    if (!this.App) return false;
    const res = await axios.patch<string>(`api/watchers/${this.App}/disable`);
    if (res.data === this.App) {
      this.EntryID = 0;
      this.Enabled = false;
    }
    return res.data === this.App;
  }
  async start() {
    if (!this.App) return 0;
    const res = await axios.patch<number | string>(`api/watchers/${this.App}/start`);
    if (typeof res.data === 'number') {
      this.EntryID = res.data;
    }
    return this.EntryID;
  }
  async stop() {
    if (!this.App) return false;
    const res = await axios.patch<string>(`api/watchers/${this.App}/stop`);
    if (res.data === this.App) {
      this.EntryID = 0;
    }
    return res.data === this.App;
  }
  static async entries(apps: string[] = []) {
    const res = await axios.get<IEntryDto[]>(`api/watchers/entries`, {
      params: {
        apps: apps.join(','),
      },
    });
    if (res && res.data instanceof Array) return res.data;
    return [];
  }
}
