// import React, {useState,useEffect,Fragment} from "react";
// import { nanoid } from 'nanoid'
// import ReadOnlyRow from "./ReadOnlyRow";
// import EditableRow from "./EditableRow";
// import { TextField, Button, Typography, Paper } from '@material-ui/core';
// import {useDispatch, useSelector} from 'react-redux'
// import FileBase from 'react-file-base64';
// import { useHistory } from 'react-router-dom';
// import useStyles from './styles'
// import { createPost,updatePost } from "../../../actions/posts";
// import Inputs from "../../../Auth/Input";
// import { createPortfolio,updatePortfolio } from "../../../actions/portfolio";
// import config from "../../../StockData/config";

// // !! you need to copy the funciton of form.js to get this to work.  
//   // * in  the original fomr.js sends it into post.js

// function InputForm({currentId,setCurrentId}) {
//   const apiKey=config.FMP_API_KEY_ID
//   const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null)); //!
  
//   const [contacts, setContacts] = useState([]);
//   const [stockList, setStockList] = useState([])
//   const [portfolioPercentage, setPortfolioPercentage] = useState([])
//   const [portfolioName, setPortfolioName] = useState('')
//   const [symbol,setSymbol] = useState([])
//   const [errorState, setErrorState] = useState("");
//   const [val, setVal] = useState(0);
//   // const [stockList, editStockList] = useState([]);
//   const [pct, editPct] = useState([]);
//   const limit = 100;
  
//   const [addFormData, setAddFormData] = useState({
//     symbol: '',
//     portfolioBifurcation: '',
//   });

//   const [editFormData, setEditFormData] = useState({
//     symbol: "",
//     portfolioBifurcation: "",
//   });

//   const [editContactId, setEditContactId] = useState(null);

//   const handleAddFormChange = (event) => {
//     event.preventDefault();

//     const fieldName = event.target.getAttribute("name");
//     const fieldValue = event.target.value;
//     console.log('fieldName in handleAddFormChange in inputform.js',fieldValue)

//     const newFormData = { ...addFormData };
//     newFormData[fieldName] = fieldValue;

//     console.log('this is the newFormData in handleAddFormChange:',newFormData)
//     setAddFormData(newFormData);
//   };

//   const handleEditFormChange = (event) => {
//     event.preventDefault();

//     const fieldName = event.target.getAttribute("name");
//     const fieldValue = event.target.value;
//     console.log('fieldName in handleEditFOrmChange in inputform.js',fieldValue)

//     const newFormData = { ...editFormData };
//     newFormData[fieldName] = fieldValue;

//     console.log('this is the newFormData in handleEditFormChange:',newFormData)
//     setEditFormData(newFormData);
//   };


//   const handleAddFormSubmit = (event) => {
//     event.preventDefault();
//     const newStockList = stockList.concat([addFormData.symbol])
//     const newPercentage = portfolioPercentage.concat([addFormData.portfolioBifurcation])
//     setStockList(newStockList)
//     setPortfolioPercentage(newPercentage)

//     const newContact = {
//       id: nanoid(),
//       symbol: addFormData.symbol,
//       portfolioBifurcation: addFormData.portfolioBifurcation,
//     };

//     const newContacts = [...contacts, newContact];
//     console.log('this is the newContacts in inputform.js',newContacts)
//     setContacts(newContacts);
//   };

//   const handleEditFormSubmit = (event) => {
//     event.preventDefault();

//     const editedContact = {
//       id: editContactId,
//       symbol: editFormData.symbol,
//       portfolioBifurcation: editFormData.portfolioBifurcation,
//     };
//     console.log('this is the editedContact in inputform.js',editedContact)

//     const newContacts = [...contacts];

//     const index = contacts.findIndex((contact) => contact.id === editContactId);

//     newContacts[index] = editedContact;

//     setContacts(newContacts);
//     setEditContactId(null);
//   };

//   const handleEditClick = (event, contact) => {
//     event.preventDefault();
//     setEditContactId(contact.id);

//     const formValues = {
//       symbol: contact.symbol,
//       portfolioBifurcation: contact.portfolioBifurcation,
//     };

//     setEditFormData(formValues);
//   };

//   const handleCancelClick = () => {
//     setEditContactId(null);
//   };

//   const handleDeleteClick = (contactId) => {
//     const newContacts = [...contacts];

//     const index = contacts.findIndex((contact) => contact.id === contactId);

//     newContacts.splice(index, 1);

//     setContacts(newContacts);
//   };
//   //! carlos code //////////////////////////////////////////////////////////////
//   const symbolLookup = () => {
//     fetch(
//       `https://financialmodelingprep.com/api/v3/quote/${symbol.toUpperCase()}?apikey=${'apiKey'}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         if (data[0] && data[0].symbol) {
//           // editStockList(stockList.concat([symbol]));
//           setStockList(stockList.concat([symbol]));
//           editPct(pct.concat([parseInt(val)]));
//           setSymbol("");
//           setVal(0);
//         } else {
//           setErrorState("Please enter a valid stock symbol");
//         }
//       });
//   };

//   const currentAllowance = pct.reduce((acc, value) => acc + value, 0);
//   console.log(
//     "Current Allowance: ",
//     pct.reduce((acc, value) => acc + value, 0)
//   );
//   const invalidInput = () => !symbol || !val || val > limit - currentAllowance;

//   //!  /// /////////////// taken from portfolioInput          ////////////////////////
//   const classes = useStyles() //!
//   const history = useHistory(); //!
//   const dispatch = useDispatch() //!
//   const user = JSON.parse(localStorage.getItem('profile')); //!


//   const [postData, setPostData] = useState({
//     userId: '',
//     Assets:[],
//     Ownership:[],
//     DateCreated:''
// });
//   const clear = () =>{
//     setCurrentId(null)
//     setPostData({ userId: '',assets:[],ownership:[],dateCreated:''});
// }



// const handleSubmit = async(e) =>{
//   e.preventDefault()
//   console.log('this is the currentID in handlesubmit', currentId)
//   if (!currentId) {
//       console.log('this is the createPortfolio in inputForm.js',{assets:stockList,ownership:portfolioPercentage,portfolioName})
//       dispatch(createPortfolio({assets:stockList,ownership:portfolioPercentage,portfolioName}, history));
      
//   } else {
//       dispatch(updatePortfolio(currentId, { ...postData, name: user?.result?.name }));
//   }
//   clear()
// }



//   return (
//     <div className="app-container">
//     <TextField
//       variant='outlined'
//       placeholder='Please enter a portfolio name'
//       required
//       fullWidth
//       onChange={(e)=>setPortfolioName(e.target.value)}
//       value ={portfolioName}
//     />
    
//       {stockList.length ? (
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {stockList.map((stock, i) => (
//             <li key={i}>
//               {stock}: {pct[i]}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Portfolio is empty</p>
//       )}

//       <h2>Current Maximum Allowance: {limit - currentAllowance}%</h2>

//       <input
//           type="text"
//           placeholder="Enter Stock Symbol"
//           value={symbol}
//           onChange={(e) => setSymbol(e.target.value)}
//           onFocus={() => setErrorState("")}
//         />
//         <input
//           type="number"
//           placeholder="Enter percentage amount"
//           value={val}
//           onChange={(e) => setVal(e.target.value)}
//           min={1}
//           max={limit - currentAllowance}
//         />
//         <button disabled={invalidInput()} onClick={symbolLookup}>
//           Submit
//         </button>
//         <p style={{ marginTop: 0, color: "red" }}>
//           {errorState ? errorState : ""}
//         </p>


//       <form onSubmit={handleEditFormSubmit}>
//         <table>
//           <thead>
//             <tr>
//               <th>Symbol</th>
//               <th>Portfolio Bifurcation</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stockList.map((stock,index) => (
//               <Fragment key={index}>
//                 <tr key={index}>
//                   <td>{stock}</td>
//                   <td>{portfolioPercentage[index]}</td>
//                   <td>{portfolioPercentage[index]}</td>
//                 </tr>
                
//                 {/* {editContactId === stock.id ? (
//                   <EditableRow
//                     editFormData={editFormData}
//                     handleEditFormChange={handleEditFormChange}
//                     handleCancelClick={handleCancelClick}
//                   />
//                 ) : (
//                   <ReadOnlyRow
//                     contact={contact}
//                     handleEditClick={handleEditClick}
//                     handleDeleteClick={handleDeleteClick}
//                   />
//                 )} */}
//               </Fragment>
//             ))}
//           </tbody>
//         </table>
//       </form>

      
//       <form onSubmit={handleAddFormSubmit}>
//         {/* <input
//           type="text"
//           name="symbol"
//           // required="required"
//           placeholder="Enter a Symbol..."
//           onChange={handleAddFormChange}
          
//         />
//         <input
//           type="text"
//           name="portfolioBifurcation"
//           // required="required"
//           placeholder="Enter a %..."
//           onChange={handleAddFormChange}
//         /> */}

        
//         <TextField name="symbol" required="required" placeholder="Enter a Symbol..." variant="outlined" label="symbol"  onFocus={() => setErrorState("")} value ={postData.symbol} onChange={handleAddFormChange}/>
//         <TextField name="portfolioBifurcation" required="required" placeholder="Enter a %..." variant="outlined" label="% of Portfolio"  value={postData.ownership} onChange={handleAddFormChange} />
        

//           <Button className={classes.buttonSubmit} variant='contained' color='info' size='small' type='submit' >add</Button>
//       </form>
//       <form autoComplete='off' noValidate={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
//         <Paper>
//           <Button className={classes.buttonSubmit} variant='contained' color='primary' size='small' type='submit' >Complete Portfolio</Button>
//           {/* <Button className={classes.buttonSubmit} variant = 'contained' color='secondary' size ='small' onClick={clear} >Clear Portfolio</Button> */}
//         </Paper>
//       </form>
//     </div>
//   );
// };


// export default InputForm
