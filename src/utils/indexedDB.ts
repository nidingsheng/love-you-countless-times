interface InCreateStoreList {
  name: string; // 表名
  options: {
    keyPath: string, // 主键
    autoIncrement: boolean, // 是否自增
  }
}

interface InOptions {
  databaseName: string; // 数据库名称
  databaseVersion: number; // 数据库版本
  createStoreList: InCreateStoreList[]; // 新增表配置
}

class MyIndexedDB {
  private request: any;
  private options: InOptions;

  constructor(options: InOptions) {
    this.options = options;
    this.request = null;

    this.init()
  }

  init() {
    const { databaseName, databaseVersion } = this.options;
    this.request = indexedDB.open(databaseName);
    this.request.addEventListener('success', (e: any) => {
      console.log("连接数据库成功", e);
    });
    this.request.addEventListener('error', (e: any) => {
      console.log("连接数据库失败", e);
    });
  }

  create() {

  }

  addEventListener() {
    this.request.addEventListener('upgradeneeded', e => {
      // 版本号更新触发
      const db = e.target.result;
      const  store = db.createObjectStore('Users', {keyPath: 'userId', autoIncrement: false});
      console.log('创建对象仓库成功');
    });
  }
}

export const connectIndexedDB = (options: InOptions) => {
  return new MyIndexedDB(options);
}
