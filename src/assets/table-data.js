import Mock from 'mockjs'

let result = [];

function initArea(data,level) {
  if(level === 1){
    for(let i=0;i<15;i++){
      let obj = {
        area: Mock.Random.province(),
        id: Mock.Random.increment(),
        level: level,
        show: false,
        children: []
      };
      initArea(obj.children, 2);
      data.push(obj);
    }
  }else if(level === 2){
    for(let i=0;i<15;i++){
      let obj = {
        area: Mock.Random.city(),
        id: Mock.Random.increment(),
        level: level,
        show: false,
        children: []
      };
      initArea(obj.children, 3);
      data.push(obj);
    }
  }else if(level === 3){
    for(let i=0;i<15;i++){
      let obj = {
        area: Mock.Random.county(),
        id: Mock.Random.increment(),
        level: level,
        show: false,
      };
      data.push(obj);
    }
  }
}

initArea(result, 1);

export default Mock.mock('http://api.a.com/area', result)
