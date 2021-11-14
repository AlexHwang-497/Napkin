import React from 'react'

import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Paper,
    CardMedia,
    ImageListItem
} from '@material-ui/core'

const subscribarList = [
    {
        name: 'john doe',
        date: '18 january, 2019',
        amount: 1000,
        status: 'close',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'kessy bryan',
        date: '10 january, 2019',
        amount: 9000,
        status: 'open',
        company: 'My Fintech LTD.',
    },
    {
        name: 'kessy bryan',
        date: '10 january, 2019',
        amount: 9000,
        status: 'open',
        company: 'My Fintech LTD.',
    },
    {
        name: 'james cassegne',
        date: '8 january, 2019',
        amount: 5000,
        status: 'close',
        company: 'Collboy Tech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
    {
        name: 'lucy brown',
        date: '1 january, 2019',
        amount: 89000,
        status: 'open',
        company: 'ABC Fintech LTD.',
    },
]

const PaginationTable = (post) => {
    console.log('this is the post in PaginationTable',post)
    console.log('this is the post.post in PaginationTable',post.post)
    console.log('this is the post.post.assets in PaginationTable',post.post.assets)
    
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    const handling =(event) =>{
        console.log('poop')
    }

    return (
        <div className="w-full overflow-auto">
            <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0"></TableCell>
                        <TableCell className="px-0">Symbol</TableCell>
                        <TableCell className="px-0">Sector</TableCell>
                        <TableCell className="px-0">Portfolio(%)</TableCell>
                        <TableCell className="px-0">Portfolio($)</TableCell>

                        <TableCell className="px-0">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {subscribarList.slice(page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((subscriber, index) => (
                            <TableRow key={index}>
                                <TableCell className="px-0 capitalize" align="left">{post.currentId}</TableCell>
                            <TableCell className="px-0"> <IconButton onclick={handling}> <Icon color="error">close</Icon> </IconButton> </TableCell>      
                            </TableRow>
                        ))} */}
                        {/* {post.post.assets[0]}
                        {post.post.assets[1]} */}
                        <TableRow >
                                <TableCell>
                                    <ImageListItem>
                                        <img src={post.post.image[0]}/>
                                    </ImageListItem>
                                </TableCell>
                                <TableCell className="px-0 capitalize" align="left">{post.post.assets[0]}</TableCell>
                                <TableCell className="px-0 capitalize" align="left">{post.post.sector[0]}</TableCell>
                                <TableCell className="px-0 capitalize" align="left">{post.post.ownership[0]}%</TableCell>
                                <TableCell className="px-0 capitalize" align="left">${post.post.ownership[0]*100}</TableCell>
                                <TableCell className="px-0"> <IconButton onclick={handling}> <Icon color="error">X</Icon> </IconButton> </TableCell>      
                        </TableRow>
                        
                </TableBody>
            </Table>

            <TablePagination
                className="px-4"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={subscribarList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default PaginationTable
