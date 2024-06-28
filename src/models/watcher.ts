import axios from 'axios';
export type Methods = 'OPUI' | 'WebService' | 'Scheduler' | 'DIS';

interface IDto {
  /** 模块 */
  Module: string;
  /** 提供方 */
  Provider: string;
  /** 请求方 */
  Requester: string;
  /** 应用 */
  App: string;
  /** 描述 */
  Desc: string;
  /** 承载方式 */
  Method: Methods;
  /** 标签 */
  Tags: string[];
  /** 连接串 */
  DSN: string;
  /** 查询语句模板 */
  SQLTemplate: string;
  /** 扩展字段 */
  Extend: Record<string, any>;
  Enabled: boolean;
}
interface ICreate extends IDto {}
interface IUpdate extends Omit<IDto, 'App'> {}

export class Watcher implements ICreate {
  Module: string = '';
  Provider: string = '';
  Requester: string = '';
  App: string = '';
  Desc: string = '';
  Method: Methods = 'Scheduler';
  Tags: string[] = [];
  DSN: string = '';
  SQLTemplate: string = '';
  Extend: Record<string, any> = {};
  Enabled: boolean = true;

  constructor(dto?: IDto) {
    if (!dto) return;
    this.Module = dto.Module;
    this.Provider = dto.Provider;
    this.Requester = dto.Requester;
    this.App = dto.App;
    this.Desc = dto.Desc;
    this.Method = dto.Method;
    this.Tags = dto.Tags;
    this.DSN = dto.DSN;
    this.SQLTemplate = dto.SQLTemplate;
    this.Extend = dto.Extend;
    this.Enabled = dto.Enabled;
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
    const res = await axios.post<string>(`api/watchers/${this.App}`, this.App);
    return res.data === this.App;
  }
  async update() {
    if (!this.App) return false;
    const res = await axios.put<string>(`api/watchers/${this.App}`, this.App);
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
    return res.data === this.App;
  }
  async disable() {
    if (!this.App) return false;
    const res = await axios.patch<string>(`api/watchers/${this.App}/disable`);
    return res.data === this.App;
  }
}
