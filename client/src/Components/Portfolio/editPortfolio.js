import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import DataTable from "./CreatePortfolioTable";
import { useDispatch } from "react-redux";
import PortfolioInputForm from "./CreatePortfolioInputForm";
import InputForm from "./InputForm/InputForm";
import PaginationTable from "./PaginationTable";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { updatePortfolio } from "../../actions/portfolio";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Avatar,
  IconButton,
  styled,
  DialogTitle,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./InputForm/styles";
import EditableTable from "./EditableTable";

// import IconButton from '@material-ui/icons/Icon';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function EditPortfolio({ currentId, post, openState }) {
  const [open, setOpen] = useState(openState || false);
  const [description, setDescription] = useState(post.description);
  const [portfolioName, setPortfolioName] = useState(post.portfolioName);
  const [assets, setAssets] = useState(post.assets || []);
  const [ownership, setOwnership] = useState(post.ownership || []);
  const [sector, setSector] = useState(post.sector || []);
  const [image, setImage] = useState(post.image || []);
  const dispatch = useDispatch();
  const history = useHistory();
  const [symbol, setSymbol] = useState("");
  const [errorState, setErrorState] = useState("");
  const [val, setVal] = useState(0);
  const [stockList, editStockList] = useState([]);
  const [pct, editPct] = useState([]);
  const limit = 100;
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const currentAllowance = ownership.reduce((acc, value) => acc + value, 0);

  const symbolLookup = () => {
    fetch(
      `https://financialmodelingprep.com/api/v3/profile/${symbol.toUpperCase()}?apikey=f69c6a774b0cfb6186868a361929fd36`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data[0] && data[0].symbol) {
          setAssets(assets.concat([symbol]));
          setOwnership(ownership.concat([parseInt(val)]));
          setSector(sector.concat(data[0].sector));
          setImage(image.concat(data[0].image));
          setSymbol("");
          setVal(0);
        } else {
          setErrorState("Please enter a valid stock symbol");
        }
      });
  };

  const invalidInput = () => !symbol || !val || val > limit - currentAllowance;

  const deleteEntry = (index) => {
    setAssets(assets.filter((asset, i) => i !== index));
    setOwnership(ownership.filter((o, i) => i !== index));
    setSector(sector.filter((s, i) => i !== index));
    setImage(image.filter((img, i) => i !== index));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdatePortfolio = () => {
    dispatch(
      updatePortfolio(currentId, {
        assets,
        ownership,
        sector,
        image,
        description,
        portfolioName,
      })
    );
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentId) {
    } else {
      dispatch(
        updatePortfolio(currentId, {
          assets,
          ownership,
          sector,
          image,
          description,
          portfolioName,
        })
      );
    }
  };

  const [postData, setPostData] = useState({
    userId: "",
    Assets: [],
    Ownership: [],
    DateCreated: "",
    Description: [],
  });

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <MoreVertIcon />
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title">
          Update/Edit Portfolio
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TextField
            variant="outlined"
            placeholder="Please enter a portfolio name"
            label="Portfolio Name"
            required
            fullWidth
            onChange={(e) => setPortfolioName(e.target.value)}
            value={portfolioName}
          />
          <Divider style={{ margin: "20px 0" }} />
          <TextField
            fullWidth
            rows={4}
            variant="outlined"
            label="Portfolio Description"
            multiline
            value={description}
            onChange={(e) => setDescription([e.target.value])}
          />
          <Divider style={{ margin: "20px 0" }} />

          <ul style={{ listStyle: "none", padding: 0 }}>
            {stockList.map((stock, i) => (
              <li key={i}>
                {stock}: {pct[i]}% : ${100 * pct[i]}
              </li>
            ))}
            <li>
              <h4>
                cash: {limit - currentAllowance}% : $
                {100 * [limit - currentAllowance]}
              </h4>
            </li>
          </ul>
          <div>
            <TextField
              label="Enter Stock Symbol"
              variant="outlined"
              onChange={(e) => setSymbol(e.target.value)}
              onFocus={() => setErrorState("")}
              value={symbol}
            />

            <TextField
              label="% of portfolio"
              variant="outlined"
              onChange={(e) => setVal(e.target.value)}
              onFocus={() => setErrorState("")}
              min={1}
              type="number"
              value={val}
              max={limit - currentAllowance}
            />

            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={symbolLookup}
              disabled={invalidInput()}
            >
              Add
            </Button>

            <p style={{ marginTop: 0, color: "red" }}>
              {errorState ? errorState : ""}
            </p>
          </div>
          <form
            autoComplete="off"
            noValidate={`${classes.root} ${classes.form}`}
            onSubmit={handleSubmit}
          ></form>

          <PaginationTable
            post={{ assets, ownership, sector, image, deleteEntry }}
            currentId={currentId}
          />
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            color="secondary"
            autoFocus
            onClick={handleUpdatePortfolio}
          >
            Edit Portfolio
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
export default EditPortfolio;
