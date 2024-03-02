export default [
  {
    "path": "/home",
    "name": "home",
    "component":"/home/index",
    "meta": {
      "icon": "DataAnalysis",
      "title": "首页",
      "isLink": "",
      "isHide": false,
      "isFull": false,
      "isAffix": false,
      "isKeepAlive": true,
      isBread:true
    }
  },
  {
    "path": "/expressManage",
    "name": "expressManage",
    "redirect": "/expressManage/expressAdd",
    "meta": {
      "icon": "Briefcase",
      "title": "快递管理",
      "isLink": "",
      "isHide": false,
      "isFull": false,
      "isAffix": false,
      "isKeepAlive": true
    },
    "children": [
      {
        "path": "/expressManage/expressAdd",
        "name": "expressAdd",
        "component": "/expressManage/expressAdd/index",
        "meta": {
          "icon": "Edit",
          "title": "新增快递单",
          "isLink": "",
          "isHide": false,
          "isFull": false,
          "isAffix": false,
          "isKeepAlive": true
        }
      },
      {
        "path": "/expressManage/expressQuery",
        "name": "expressQuery",
        "component": "/expressManage/expressQuery/index",
        "meta": {
          "icon": "Search",
          "title": "快递查询",
          "isLink": "",
          "isHide": false,
          "isFull": false,
          "isAffix": false,
          "isKeepAlive": true
        }
      }
    ]
  },
  {
    "path": "/sys",
    "name": "sys",
    "redirect": "/sys/dict",
    "meta": {
      "icon": "Briefcase",
      "title": "系统管理",
      "isLink": "",
      "isHide": false,
      "isFull": false,
      "isAffix": false,
      "isKeepAlive": true
    },
    "children": [
      {
        "path": "/sys/dict",
        "name": "dict",
        "component": "/sys/dict/index",
        "meta": {
          "icon": "Edit",
          "title": "字典管理",
          "isLink": "",
          "isHide": false,
          "isFull": false,
          "isAffix": false,
          "isKeepAlive": true
        }
      },
    ]
  }
]
