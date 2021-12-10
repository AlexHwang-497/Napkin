import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40
  },
  input: {
    width: 130,
    height: 40
  }
}));

const createData = (name, calories, fat, carbs, protein) => ({
  id: name.replace(" ", "_"),
  name,
  calories,
  fat,
  carbs,
  protein,
  isEditMode: false
});

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={e => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

function EditableTable({post}) {
    // console.log('this is the post in EditableTable',post)
  const [rows, setRows] = React.useState([
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0)
  ]);
  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  const onToggleEditMode = id => {
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = id => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious(state => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left">Symbol</TableCell>
            <TableCell align="left">Sector</TableCell>
            <TableCell align="left">Portfolio(%)</TableCell>
            <TableCell align="left">Portfolio($)</TableCell>
            <TableCell align="left" />
          </TableRow>
        </TableHead>
        <TableBody>
        {/* {post.assets && post.assets.map((asset,i)=>(
                <TableRow key={i}>

                        <TableCell>
                                < imgsrc={post.image[i]} style={{height:'30px',width:'30px'}}/>
                        </TableCell>
                        <TableCell className="px-0 capitalize" align="left">{asset}</TableCell>
                        <TableCell className="px-0 capitalize" align="left">{post.sector[i]}</TableCell>
                        <TableCell className="px-0 capitalize" align="left">{post.ownership[i]}%</TableCell>
                        <TableCell className="px-0 capitalize" align="left">${post.ownership[i]*100}</TableCell>
                        <TableCell className="px-0"> <IconButton onClick={()=>post.deleteEntry(i)}> <Icon color="error">X</Icon> </IconButton> </TableCell>      
                </TableRow>
            ))} */}
            {post.assets && post.assets.map((asset,i)=>(
            <TableRow key={i}>
              <TableCell className={classes.selectTableCell}>
                {asset.isEditMode ? (
                  <>
                    <IconButton
                      aria-label="done"
                      onClick={() => onToggleEditMode(i)}
                    >
                      <DoneIcon />
                    </IconButton>
                    <IconButton
                      aria-label="revert"
                      onClick={() => onRevert(i)}
                    >
                      <RevertIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => onToggleEditMode(i)}
                  >
                    <EditIcon />
                  </IconButton>
                )}
              </TableCell>
              <CustomTableCell {...{ asset, name: "Symbol", onChange }} />
              <CustomTableCell {...{ asset, name: "Sector", onChange }} />
              <CustomTableCell {...{ asset, name: "Portfolio(%)", onChange }} />
              <CustomTableCell {...{ asset, name: "Portfolio($)", onChange }} />
              {/* <CustomTableCell {...{ asset, name: "protein", onChange }} /> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default EditableTable

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
