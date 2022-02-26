import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deletePortfolio, likePortfolio } from "../../actions/portfolio";
import { useHistory } from "react-router-dom";
import {
  Card,
  Paper,
  Box,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Grid,
  CardActions,
  Divider,
  styled,
  CardContent,
  Collapse,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Avatar,
  CardHeader,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  TablePagination,
  ImageListItem,
  TextField,
} from "@material-ui/core/";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { red } from "@material-ui/core/colors";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import moment from "moment";
import config from "../../StockData/config";

import PortfolioPostTable from "./SharedCharts/PortfolioPostTable";
import useStyles from "./Styles";
import EditPortfolio from "./editPortfolio";
import { DEFAULT_GRID_PROPS_FROM_OPTIONS } from "@material-ui/data-grid";
import {
  OrganizeData,
  monthlyReturn,
  subSet,
  getStandardDeviation,
  totalPortfolioValue,
  calculateAnnualizedReturn,
  calcCovariance,
  totalPortfolioValueReturns,
} from "../../Utilities";
import { generateHistoricalDate } from "../../Utilities/DateRanges";
import PortfolioPostLineChart from "./PortfolioPostLineChart";
import PortfolioPostBarChart from "./portfolioPostBarChart";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PortfolioPost = ({ post, setCurrentId }) => {
  const startDate = "2009-11-01";
  const endDate = new Date().toISOString().slice(0, 10).toString();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [likes, setLikes] = useState(post?.likes);
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [openState, setOpenState] = useState(false);
  const [stockData, editStockData] = useState([]);
  const [pracData, setPracData] = useState([]);
  const [dateArr, setDateArr] = useState([]);
  const [lineGraphData, setLineGraphData] = useState("ttm");
  const [error, setError] = useState(false);
  const [postUserId, setPostUserId] = useState(post?.userId);
  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post?.likes?.find((like) => like === userId);
  const apiKey = config.FMP_API_KEY_ID;
  useEffect(() => {
    Promise.all(
      ["SPY", ...post.assets].map((stock) =>
        fetch(
          `https://financialmodelingprep.com/api/v4/historical-price-adjusted/${stock}/1/month/${startDate}/${endDate}?apikey=${apiKey}`
        )
      )
    ).then((results) =>
      Promise.all(results.map((res) => res.json()))
        .then((stocks) => {
          const portfolioData = OrganizeData(
            stocks,
            ["SPY", ...post.assets.map((e) => e.toUpperCase())],
            ["", ...post.ownership],
            ["", ...post.image],
            ["", ...post.sector]
          );
          setPracData(portfolioData);
          setDateArr(portfolioData[0].dates.map((el) => el.date));
        })
        .catch((err) => setError(err))
    );
  }, [post.assets]);

  let dateObj = {
    0: "ytd",
    1: "1yr",
    2: "2yr",
    3: "3yr",
    4: "4yr",
    5: "5yr",
    6: "6yr",
    7: "7yr",
    8: "8yr",
    9: "9yr",
    10: "10yr",
  };

  const ytdMonth = endDate.split("-")[1];
  const ytd = dateArr.slice(ytdMonth - 1, ytdMonth);
  const ttm = dateArr.slice(11, 12);
  const twoYear = dateArr.slice(23, 24);
  const threeYear = dateArr.slice(35, 36);
  const fourYear = dateArr.slice(47, 48);
  const fiveYear = dateArr.slice(59, 60);
  const sixYear = dateArr.slice(71, 72);
  const sevenYear = dateArr.slice(83, 84);
  const eightYear = dateArr.slice(95, 96);
  const nineYear = dateArr.slice(107, 108);
  const tenYear = dateArr.slice(119, 120);
  const combinedDatesArr = [
    ...ytd,
    ...ttm,
    ...twoYear,
    ...threeYear,
    ...fourYear,
    ...fiveYear,
    ...sixYear,
    ...sevenYear,
    ...eightYear,
    ...nineYear,
    ...tenYear,
  ];
  const SeasonalAnalysisYearArr = combinedDatesArr
    .map((el) => el.split("-")[0])
    .sort();

  const yearForSelection = (arr) => {
    let obj = {};
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      // obj[i] = dateObj[i]
      result.push(dateObj[i]);
    }
    // return obj
    return result;
  };

  let yearArr = yearForSelection(combinedDatesArr);

  const dateLabels = yearArr.slice(1);

  const dates = dateLabels.map((label) => {
    const yearNumber = parseInt(label.split("yr")[0]);
    return generateHistoricalDate(yearNumber);
  });

  const spxValue = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(pracData, date)));

    const data = monthlyReturn(range).map(
      (entry) => entry.securityGrowthValue
    )[0];

    return data;
  });

  const securityData = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(pracData, date)));
    const data = monthlyReturn(range).map((entry) => entry);
    return data;
  });

  const spxAnnuzlied = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(pracData, date)));
    const data = monthlyReturn(range).map((entry) => entry);
    return data;
  });

  const totalPortoflioValue = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(pracData, date)));
    const aggPortfolioValue = totalPortfolioValue(monthlyReturn(range));
    const portfolioAnnualizeReturn =
      calculateAnnualizedReturn(aggPortfolioValue);
    return aggPortfolioValue;
  });
  const arrPortfolioAnnualizedReturn = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(pracData, date)));
    const aggPortfolioValue = totalPortfolioValue(monthlyReturn(range));
    const portfolioAnnualizeReturn =
      calculateAnnualizedReturn(aggPortfolioValue);
    return portfolioAnnualizeReturn;
  });

  const arrPortfolioReturns = dates.map((date, index) => {
    const range = JSON.parse(JSON.stringify(subSet(pracData, date)));
    const aggPortfolioValueReturns = totalPortfolioValueReturns(
      monthlyReturn(range)
    );
    return aggPortfolioValueReturns;
  });

  const portfolioStdDev = getStandardDeviation(arrPortfolioReturns);

  const lineGraphDataHandler = (e) => {
    setLineGraphData(e.target.value);
  };

  let lineIndex = 0;
  let dateIndex = 0;
  let labelName = "";
  let firstLabel, secondLabel, thirdLabel, fourthLabel;
  if (yearArr.length <= 5) {
    fourthLabel = yearArr.length - 1;
    thirdLabel = fourthLabel - 1;
    secondLabel = thirdLabel - 1;
  } else {
    fourthLabel = yearArr.length - 1;
    thirdLabel = 5;
    secondLabel = 3;
  }

  if (yearArr.length <= 5) {
    if (lineGraphData === "ttm") {
      lineIndex = 0;
      dateIndex = 12;
    } else if (lineGraphData === "3yr") {
      lineIndex = yearArr.length - 2;
      dateIndex = 36;
    } else if (lineGraphData === "5yr") {
      lineIndex = yearArr.length - 3;
      dateIndex = 60;
    } else {
      lineIndex = yearArr.length - 2;
      dateIndex = (yearArr.length - 1) * 12;
    }
  } else {
    if (lineGraphData === "ttm") {
      lineIndex = 0;
      dateIndex = 12;
    } else if (lineGraphData === "3yr") {
      lineIndex = 2;
      dateIndex = 36;
    } else if (lineGraphData === "5yr") {
      lineIndex = 4;
      dateIndex = 60;
    } else {
      lineIndex = yearArr.length - 2;

      dateIndex = (yearArr.length - 1) * 12;
      fourthLabel = yearArr.length;
    }
  }

  let portfolioLineGraphNeeded = totalPortoflioValue[lineIndex];
  let spxLineGraphNeeded = spxValue[lineIndex];
  let datesLineGraphNeeded = dateArr.slice(0, dateIndex).reverse();

  const handleLike = async () => {
    dispatch(likePortfolio(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = (e) => {
    history.push(`/posts/${post._id}`);
  };
  const editPost = () => {
    setOpenState(true);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {}, [openState]);

  const handleDescriptionText = (post) => {
    return post.description;
  };

  return (
    <Card raised elevation={6} spacing={2} sx={{ maxWidth: 350 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"></Avatar>
        }
        action={
          postUserId === userId && (
            <IconButton
              aria-label="settings"
              onClick={() => setOpenState(true)}
            >
              <EditPortfolio
                size="small"
                currentId={post._id}
                post={post}
                openState={openState}
              />
            </IconButton>
          )
        }
        title={<Typography variant="h6">{post.portfolioName}</Typography>}
        subheader={moment(post.dateCreated).fromNow()}
      />
      <Divider style={{ margin: "20px 0" }} />
      <CardContent>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
          spacing={"80px"}
        >
          <InputLabel id="demo-simple-select-standard-label">Date</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={lineGraphData}
            onChange={lineGraphDataHandler}
            label="Date"
            full
            width
          >
            <Typography></Typography>
            <MenuItem value={"ttm"}>TTM</MenuItem>
            <MenuItem value={"3yr"}>{secondLabel}-Yr</MenuItem>
            <MenuItem value={"5yr"}>{thirdLabel}-Yr</MenuItem>
            <MenuItem value={"10yr"}>{fourthLabel}-Yr</MenuItem>
          </Select>
        </Box>
      </CardContent>

      <Divider style={{ margin: "20px 0" }} />

      <ButtonBase
        component="span"
        name="test"
        className={classes.cardActions}
        onClick={openPost}
      >
        <Grid container spacing={0}>
          <Grid xs={12}>
            <Grid item xs container direction="column" spacing={2}>
              <PortfolioPostLineChart
                securityData={stockData}
                spxData={spxLineGraphNeeded}
                lineGraphData={lineGraphData}
                portfolioData={portfolioLineGraphNeeded}
                datesData={datesLineGraphNeeded}
              />
            </Grid>
            <Grid item xs container direction="column" spacing={2}>
              <PortfolioPostBarChart
                portfolioAnnualizeReturn={arrPortfolioAnnualizedReturn}
                spxAnnualizedReturn={spxValue}
              />
            </Grid>
          </Grid>
        </Grid>
      </ButtonBase>

      <Divider style={{ margin: "20px 0" }} />

      <CardContent>
        <Box
          component="span"
          sx={{ display: "block", mx: "2px", transform: "scale(1)" }}
        >
          <Typography variant="h6">Portfolio Description</Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="h7" color="text.secondary">
            {post.description}
          </Typography>
        </Box>
      </CardContent>

      <Divider style={{ margin: "20px 0" }} />

      <CardActions disableSpacing>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likePortfolio(post._id))}
        >
          <Likes />
        </Button>
        {postUserId === userId && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePortfolio(post._id))}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Divider style={{ margin: "20px 0" }} />

          <PortfolioPostTable data={post} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PortfolioPost;
