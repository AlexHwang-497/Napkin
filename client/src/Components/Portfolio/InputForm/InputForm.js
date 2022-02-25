import React, { useState, useEffect, Fragment } from 'react'
import { nanoid } from 'nanoid'
import {
  TextField,
  Divider,
  Button,
  Typography,
  Paper,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import { useHistory } from 'react-router-dom'
import useStyles from './styles'
import { createPost, updatePost } from '../../../actions/posts'
import Inputs from '../../../Auth/Input'
import { createPortfolio, updatePortfolio } from '../../../actions/portfolio'
import config from '../../../StockData/config'
import CreatePortfolioPaginationTable from './CreatePortfolioPaginationTable'

function InputForm({ currentId, setCurrentId }) {
  const apiKey = config.FMP_API_KEY_ID
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null,
  )
  const [symbol, setSymbol] = useState('')
  const [errorState, setErrorState] = useState('')
  const [ownership, setOwnership] = useState([])
  const [val, setVal] = useState(0)
  const [stockList, editStockList] = useState([])
  const [sector, setSector] = useState([])
  const [image, setImage] = useState([])
  const [pct, editPct] = useState([])
  const limit = 100
  const [portfolioName, setPortfolioName] = useState('')
  const user = JSON.parse(localStorage.getItem('profile'))
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const [description, setDescription] = useState([])

  const symbolLookup = () => {
    fetch(
      `https://financialmodelingprep.com/api/v3/profile/${symbol.toUpperCase()}?apikey=${apiKey}`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('this is the data from symbolLookup ', data)
        if (data[0] && data[0].symbol) {
          editStockList(stockList.concat([symbol]))
          editPct(pct.concat([parseInt(val)]))
          setSector(sector.concat(data[0].sector))
          setImage(image.concat(data[0].image))
          setSymbol('')
          setVal(0)
        } else {
          setErrorState('Please enter a valid stock symbol')
        }
      })
  }

  const currentAllowance = pct.reduce((acc, value) => acc + value, 0)
  console.log(
    'Current Allowance: ',
    pct.reduce((acc, value) => acc + value, 0),
  )
  const invalidInput = () => !symbol || !val || val > limit - currentAllowance

  const classes = useStyles() //!
  const history = useHistory() //!

  const [postData, setPostData] = useState({
    userId: '',
    Assets: [],
    Ownership: [],
    DateCreated: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!currentId) {
      dispatch(
        createPortfolio(
          {
            assets: stockList,
            ownership: pct,
            portfolioName,
            sector,
            image,
            description,
          },
          history,
        ),
      )
      setSymbol('')
      setVal('')
    } else {
      dispatch(
        updatePortfolio(currentId, { ...postData, name: user?.result?.name }),
      )
      setSymbol('')
      setVal('')
    }
    // clear()
  }

  const handleComment = async () => {
    setComment('')
  }

  const deleteEntry = (index) => {
    editStockList(stockList.filter((asset, i) => i !== index))
    editPct(pct.filter((o, i) => i !== index))
    setSector(sector.filter((s, i) => i !== index))
    setImage(image.filter((img, i) => i !== index))
  }

  return (
    <div className="App">
      <h1>Stock Portfolio Builder</h1>
      <TextField
        variant="outlined"
        placeholder="Please enter a portfolio name"
        label="Portfolio Name"
        required
        fullWidth
        onChange={(e) => setPortfolioName(e.target.value)}
        value={portfolioName}
      />
      <Divider style={{ margin: '20px 0' }} />
      <TextField
        fullWidth
        rows={4}
        variant="outlined"
        label="Portfolio Description"
        multiline
        onChange={(e) => setDescription(e.target.value)}
      />
      <Divider style={{ margin: '20px 0' }} />

      {stockList.length ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <h4>
              cash available: {limit - currentAllowance}% : $
              {100 * [limit - currentAllowance]}
            </h4>
          </li>
        </ul>
      ) : (
        <p>Portfolio is empty</p>
      )}
      <div>
        <TextField
          label="Enter Stock Symbol"
          variant="outlined"
          onChange={(e) => setSymbol(e.target.value)}
          onFocus={() => setErrorState('')}
          value={symbol}
        />
        <TextField
          label="% of portfolio"
          variant="outlined"
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setErrorState('')}
          min={1}
          value={val}
          type="number"
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
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="h6">
          <b>Please Note:</b> the portfolio you are creating is based on the
          growth of <strong>$10k.</strong> When adding securities to your
          portoflio, please base your inputs off of the{' '}
          <strong>% bifurcation</strong> you expect each security would be out
          of the <strong>$10k.</strong>{' '}
        </Typography>
        <Divider style={{ margin: '20px 0' }} />

        <p style={{ marginTop: 0, color: 'red' }}>
          {errorState ? errorState : ''}
        </p>
      </div>
      <form
        autoComplete="off"
        noValidate={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <CreatePortfolioPaginationTable
          stockList={stockList}
          pct={pct}
          sector={sector}
          image={image}
          deleteEntry={deleteEntry}
        />

        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="small"
          type="submit"
        >
          Create New Portfolio
        </Button>
      </form>
    </div>
  )
}

export default InputForm
