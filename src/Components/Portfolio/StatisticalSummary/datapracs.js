const data =[
    {sector: 'Technology', ownership: 10, portfolioValue: 14266.5702373862},
    {sector: 'Technology', ownership: 10, portfolioValue: 13295.700934579438},
    {sector: 'Consumer Cyclical', ownership: 10, portfolioValue: 10335.06458258799},
    {sector: 'Consumer Cyclical', ownership: 10, portfolioValue: 14095.101253853049},
    {sector: 'Technology', ownership: 10, portfolioValue: 22840.897425486506},
    {sector: 'Communication Services', ownership: 10, portfolioValue: 15588.890627276016},
    {sector: 'Communication Services', ownership: 10, portfolioValue: 15727.656898435143},
    {sector: 'Communication Services', ownership: 10, portfolioValue: 13035.411528976576},
    {sector: 'Technology', ownership: 10, portfolioValue: 12257.722592368258},
    {sector: 'Communication Services', ownership: 10, portfolioValue: 11282.065612250602}
]


const mapped = data.map((el)=>el.sector)
const filtered = data.map((el)=>el.sector).filter((value, index, self) => self.indexOf(value) === index)
const reduced = data.map((el)=>el.sector).filter((value, index, self) => self.indexOf(value) === index).reduce((curr,acc)=>acc+=curr)

console.log(mapped)
console.log(filtered)
console.log(reduced)


var obj = {};

data.forEach((el) => {
  if (obj.hasOwnProperty(el.sector)) {
    obj[el.sector] = obj[el.sector] + el.portfolioValue;
  } else {
    obj[el.sector] = el.portfolioValue;
  }
});

console.log(obj)
console.log(Object.values(obj).reduce((a,b)=>a+b))
const portfolioTotal = Object.values(obj).reduce((a,b)=>a+b)

var obj2 = [];

for (var prop in obj) {
  obj2.push({ name: prop, value: (obj[prop]/portfolioTotal*100).toFixed(2)});
}

console.log(obj2);