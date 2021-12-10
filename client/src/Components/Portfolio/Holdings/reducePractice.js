const data =[
    {"x": "Technology","y": 1489.0351862670204},
    {"x": "Technology","y": 1115.8253445176747},
    {"x": "Consumer Cyclical","y": 1028.0733944954127},
    {"x": "Consumer Cyclical","y": 1591.4713813137628},
    {"x": "Technology","y": 1957.3039281149258},
    {"x": "Communication Services","y": 1686.049819634262},
    {"x": "Communication Services","y": 1682.3409090909083},
    {"x": "Communication Services","y": 1186.549239391513},
    {"x": "Technology","y": 1301.3192084749153},
    {"x": "Communication Services","y": 1278.4044526901666}
]
let result = [];
data.reduce(function(acc, curr) {
  if (!acc[curr.x]) {
    acc[curr.x] = { x: curr.x, y: 0 };
    result.push(acc[curr.x])
  }
  acc[curr.x].y += curr.y;
  return acc;
}, {});

console.log(result)

// console.log(data)
// console.log('obj:',Object.values(data).reduce((a,b)=>a+b))
const sumValues = data => Object.values(data).reduce((a, b) => {return a + b});
// console.log(sumValues)


// function sum(data) {
//     return Object.keys(data).reduce((sum,key)=>sum+parseFloat(data[key]||0),0);
//   }

//   console.log(data.reduce((previousValue, currentValue) => previousValue + currentValue.y, 0))

  const groupBy=(objectArray, property)=> {
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
    //   acc[key].push(obj)
      acc+=key.y
      return acc
    }, {})
  }

//   console.log('groupBy:',groupBy(data,'x'))

  var array = [
    { Id: "001", qty: 1 }, 
    { Id: "002", qty: 2 }, 
    { Id: "001", qty: 2 }, 
    { Id: "003", qty: 4 }
  ];
  
 
  
//   console.log('reslut:',result)


// var sum = {};

// const pracss =data.forEach(function(item) {
//   if(sum[item.x] === undefined) {
//     sum[item.x] = 0;
//   }

//   sum[item.x] += item.TOTAL  
// });

// console.log(pracss)

