import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function PortfolioOverviewTable({post}) {
    // const rows = [
    //   createData(<img>{post.image[0]}</img>, 159, 6.0, 24, 4.0),
    //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //   createData('Eclair', 262, 16.0, 24, 6.0),
    //   createData('Cupcake', 305, 3.7, 67, 4.3),
    //   createData('Gingerbread', 356, 16.0, 49, 3.9),
    // ];
    console.log('this is the post',post)
    console.log('this is the post.assets',post.assets)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Portfolio(%)</TableCell>
            <TableCell align="right">Cum Return</TableCell>
            <TableCell align="right">Ann. Return</TableCell>
            <TableCell align="right">StdDev</TableCell>
            <TableCell align="right">Sharpe</TableCell>
            <TableCell align="right">Alpha</TableCell>
            <TableCell align="right">Beta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {post.assets && post.assets.map((asset,i)=>(
                <TableRow key={i}>
                    <TableCell><img src={post.image[i]} style={{height:'30px',width:'30px'}}/></TableCell>
                    <TableCell className="px-0 capitalize" align="left">{asset}</TableCell>
                    <TableCell className="px-0 capitalize" align="left">{post.ownership[i]}%</TableCell>
                    <TableCell className="px-0 capitalize" align="left">{post.ownership[i]}%</TableCell>
                    <TableCell className="px-0 capitalize" align="left">{post.ownership[i]}%</TableCell>
                    <TableCell className="px-0 capitalize" align="left">{post.ownership[i]}</TableCell>
                    <TableCell className="px-0 capitalize" align="left">{post.ownership[i]}</TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}