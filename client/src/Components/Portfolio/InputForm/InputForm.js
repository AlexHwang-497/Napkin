import React, { useState, Fragment } from "react";
import { nanoid } from 'nanoid'
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

function InputForm() {
    const [contacts, setContacts] = useState([]);
    const [addFormData, setAddFormData] = useState({
      symbol: "",
      portfolioBifurcation: "",
      
      
    });
  
    const [editFormData, setEditFormData] = useState({
      symbol: "",
      portfolioBifurcation: "",
      
      
    });
  
    const [editContactId, setEditContactId] = useState(null);
  
    const handleAddFormChange = (event) => {
      event.preventDefault();
  
      const fieldName = event.target.getAttribute("symbol");
      console.log('fieldName in InputForm.js',fieldName)
      const fieldValue = event.target.value;
  
      const newFormData = { ...addFormData };
      newFormData[fieldName] = fieldValue;
  
      setAddFormData(newFormData);
    };
  
    const handleEditFormChange = (event) => {
      event.preventDefault();
  
      const fieldName = event.target.getAttribute("symbol");
      const fieldValue = event.target.value;
  
      const newFormData = { ...editFormData };
      newFormData[fieldName] = fieldValue;
  
      setEditFormData(newFormData);
    };
  
    const handleAddFormSubmit = (event) => {
      event.preventDefault();
  
      const newContact = {
        id: nanoid(),
        Symbol: addFormData.symbol,
        PortfolioBifurcation: addFormData.portfolioBifurcation,
      };
  
      const newContacts = [...contacts, newContact];
      setContacts(newContacts);
    };
  
    const handleEditFormSubmit = (event) => {
      event.preventDefault();
  
      const editedContact = {
        id: editContactId,
        Symbol: editFormData.symbol,
        PortfolioBifurcation: editFormData.portfolioBifurcation,
      };
  
      const newContacts = [...contacts];
  
      const index = contacts.findIndex((contact) => contact.id === editContactId);
  
      newContacts[index] = editedContact;
  
      setContacts(newContacts);
      setEditContactId(null);
    };
  
    const handleEditClick = (event, contact) => {
      event.preventDefault();
      setEditContactId(contact.id);
  
      const formValues = {
        Symbol: contact.symbol,
        PortfolioBifurcation: contact.portfolioBifurcation,
      };
  
      setEditFormData(formValues);
    };
  
    const handleCancelClick = () => {
      setEditContactId(null);
    };
  
    const handleDeleteClick = (contactId) => {
      const newContacts = [...contacts];
  
      const index = contacts.findIndex((contact) => contact.id === contactId);
  
      newContacts.splice(index, 1);
  
      setContacts(newContacts);
    };
  
    return (
      <div className="app-container">
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>PortfolioBifurcation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <Fragment>
                  {editContactId === contact.id ? (
                    <EditableRow
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
  
        <h2>Add a Contact</h2>
        <form onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            name="Symbol"
            required="required"
            placeholder="Enter a Symbol..."
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="PortfolioBifurcation"
            required="required"
            placeholder="Enter the % of your portfolio"
            onChange={handleAddFormChange}
          />
          
          <button type="submit">Add</button>
        </form>
      </div>
    );
  };
export default InputForm
