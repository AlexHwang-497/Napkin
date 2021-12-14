export const generateHistoricalDate = (year) => {
    const current = new Date();
    return `${current.getFullYear()-year}-${current.getMonth()+1}-${current.getDate()}` 
}