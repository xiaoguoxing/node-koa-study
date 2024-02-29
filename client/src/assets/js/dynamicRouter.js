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
      "isKeepAlive": true
    }
  },
  {
    "path": "/expressManage/expressAdd",
    "name": "appCenter",
    "redirect": "/appCenter/inspectionMonitor/watchingMonitor",
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
        "name": "linkage",
        "component": "/appCenter/linkage/index",
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
        "name": "appCenterAlarm",
        "component": "/appCenter/alarm/index",
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
  }
]
